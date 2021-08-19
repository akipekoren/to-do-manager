const express = require("express");
const db = require("./data.js");

const session = require("express-session"); // session middleware
const morgan = require("morgan"); // logging middleware

const passport = require("passport");
const passportLocal = require("passport-local");

const PORT = 3001;

// initialize and configure passport
passport.use(
  new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication

    db.getUser(username, password)
      .then((user) => {
        if (user) done(null, user);
        else done(null, false, { message: "Username or password wrong" });
      })
      .catch((err) => {
        done(err);
      });
  })
);

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((user) => {
      done(null, user); // this will be available in req.user
    })
    .catch((err) => {
      done(err, null);
    });
});
const cors = require("cors");
app = new express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "not authenticated" });
};

// initialize and configure HTTP sessions
app.use(
  session({
    secret: "this and that and other",
    resave: false,
    saveUninitialized: false,
  })
);

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

//APIs

// GET /api/tasks/public

app.get("/api/tasks/public", (req, res) => {
  db.getPublicTasks()
    .then((tasks) => res.json(tasks))
    .catch(() => res.status(500).end());
});

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  db.retrieveTasks(req.query.filter)
    .then((tasks) => res.json(tasks))
    .catch(() => res.status(500).end());
});

// GET /api/tasks/:id

app.get("/api/tasks/:id", (req, res) => {
  db.retrieveTask(req.params.id)
    .then((task) => res.json(task))
    .catch(() => res.status(500).end());
});

// POST /api/tasks

app.post("/api/tasks", async (req, res) => {
  let description = req.body.description;
  let important = req.body.important;
  let private = req.body.private;

  let deadline = req.body.deadline;
  let completed = req.body.completed;
  let user = req.body.user;

  try {
    await db.createTask({
      description: description,
      important: important,
      private: private,
      deadline: deadline,
      completed: completed,
      user: user,
    });
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT /api/tasks/:id

app.put("/api/tasks/:id", async (req, res) => {
  let id = req.params.id;
  let description = req.body.description;
  let important = req.body.important;
  let private = req.body.private;

  let deadline = req.body.deadline;
  let completed = req.body.completed;
  let user = req.body.user;

  try {
    await db.updateTask({
      id: id,
      description: description,
      important: important,
      private: private,
      deadline: deadline,
      completed: completed,
      user: user,
    });
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", async (req, res) => {
  let id = req.params.id;
  db.deleteTask(id)
    .then((result) => res.status(204).end())
    .catch((err) =>
      res.status(500).json({
        errors: [{ param: "Server", msg: err }],
      })
    );
});

// POST /sessions
// login

app.post("/api/sessions", function (req, res, next) {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);

      // req.user contains the authenticated user, we send all the user info back

      return res.json(req.user);
    });
  })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete("/api/sessions/current", (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get("/api/sessions/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Unauthenticated user!" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/`)
);
