const url = "http://localhost:3001";

async function getTasks() {
  const response = await fetch("/api/tasks");
  const tasks = await response.json();
  return tasks;
}

async function getFilteredTasks(filter) {
  const response = await fetch("/api/tasks/?filter=" + filter);
  const tasks = await response.json();
  return tasks;
}

async function addNewTask(task) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task }),
  });

  if (response.ok) return null;
  else return { err: "post error" };
}

async function deleteTask(id) {
  const response = await fetch("/api/tasks/" + id, {
    method: "DELETE",
  });

  if (response.ok) return null;
  else return { err: "delete error" };
}

async function updateTask(task) {
  const response = await fetch("/api/tasks/" + task.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (response.ok) return null;
  else return { err: "update error" };
}

async function getUserInfo() {
  const response = await fetch("/api/sessions/current");
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo; // an object with the error coming from the server
  }
}

async function logIn(credentials) {
  let response = await fetch("/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user.name;
  } else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch("/api/sessions/current", { method: "DELETE" });
}

const API = {
  getTasks,
  addNewTask,
  deleteTask,
  updateTask,
  getFilteredTasks,
  getUserInfo,
  logIn,
  logOut,
};
export default API;
