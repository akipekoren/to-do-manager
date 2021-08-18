import "./App.css";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import { LoginForm } from "./components/login/Login";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import API from "./API";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        // TODO: store them somewhere and use them, if needed
        await API.getUserInfo();
        setLoggedIn(true);
      } catch (err) {}
    };
    checkAuth();
  }, []);

  const doLogIn = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user}!`, type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    //setCourses([]);
    //setExams([]);
  };

  return (
    <Router>
      <Nav />

      <Switch>
        <Route
          path="/login"
          render={() => (
            <>
              {loggedIn ? (
                <Redirect to="/list/all" />
              ) : (
                <div className="container mt-5 pt-5">
                  <LoginForm login={doLogIn} />
                </div>
              )}
            </>
          )}
        />
        <Route path={["/list/:filter"]}>
          {" "}
          <div className="App">
            <Home welcomeMsg={message} loggedIn={loggedIn} logout={doLogOut} />
          </div>
        </Route>
        <Redirect to="/list/all" />
      </Switch>
    </Router>
  );
}

export default App;
