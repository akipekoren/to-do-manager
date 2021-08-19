"use strict";

const sqlite = require("sqlite3");
const moment = require("moment");
const bcrypt = require("bcrypt");
const db = new sqlite.Database("tasks.db", (err) => {
  if (err) throw err;
});

const isToday = function (date) {
  return moment(date).isSame(moment(), "day");
};

const isNextWeek = function (date) {
  const nextWeek = moment().add(1, "weeks");
  const tomorrow = moment().add(1, "days");
  return moment(date).isAfter(tomorrow) && moment(date).isBefore(nextWeek);
};

// retrieve all tasks

exports.retrieveTasks = (filter) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tasks";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      var tasks = rows.map((e) => ({
        id: e.id,
        description: e.description,
        important: e.important,
        private: e.private,
        deadline: e.deadline,
        completed: e.completed,
        user: e.user,
      }));
      if (filter) {
        switch (filter) {
          case "important":
            tasks = tasks.filter((el) => {
              return el.important === 1;
            });
            break;
          case "private":
            tasks = tasks.filter((el) => {
              return el.private === 1;
            });
            break;
          case "today":
            tasks = tasks.filter((el) => {
              if (el.deadline) return isToday(el.deadline);
              else return false;
            });
            break;
          case "week":
            tasks = tasks.filter((el) => {
              if (el.deadline) return isNextWeek(el.deadline);
              else return false;
            });
            break;
          default:
        }
      }

      resolve(tasks);
    });
  });
};

// retrieve one task by id

exports.retrieveTask = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM tasks WHERE id=?";

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: "Task not found." });
      } else {
        const task = {
          id: row.id,
          description: row.description,
          important: row.important,
          private: row.private,
          deadline: row.deadline,
          completed: row.completed,
          user: row.user,
        };
        resolve(task);
      }
    });
  });
};

exports.createTask = (task) => {
  return new Promise((resolve, reject) => {
    console.log(task);
    const sql =
      "INSERT INTO tasks(description,important, private, deadline, completed,user) VALUES(?,?,?,?,?, ?)";
    db.run(
      sql,
      [
        task.description,
        task.important,
        task.private,
        task.deadline,
        task.completed,
        task.user,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

exports.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE tasks SET description=?, important=?, private=?, deadline=?,completed=?, user=?  WHERE id = ?";

    db.run(
      sql,
      [
        task.description,
        task.important,
        task.private,
        task.deadline,
        task.completed,
        task.user,
        task.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

exports.deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
        return;
      } else resolve(null);
    });
  });
};

exports.getPublicTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE private = 0";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const tasks = rows.map((e) => ({
        id: e.id,
        description: e.description,
        important: e.important,
        private: e.private,
        deadline: e.deadline,
        completed: e.completed,
        user: e.user,
      }));
      resolve(tasks);
    });
  });
};

// DAO operations for validating users

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) reject(err);
      // DB error
      else if (row === undefined) resolve(false);
      // user not found
      else {
        bcrypt.compare(password, row.hash).then((result) => {
          if (result)
            // password matches
            resolve({ id: row.id, username: row.email, name: row.name });
          else resolve(false); // password not matching
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) resolve({ error: "User not found." });
      else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = { id: row.id, username: row.email, name: row.name };
        resolve(user);
      }
    });
  });
};
