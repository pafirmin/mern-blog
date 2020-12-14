import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "../App";
import Login from "./Login";
import NewPost from "./NewPost";
import PostList from "./PostList";
import EditPost from "./EditPost";
import Nav from "./Nav";

const Home = () => {
  const { state } = useContext(AuthContext);
  return (
    <Router>
      {state.isAuthenticated && <Nav />}
      <Switch>
        <Route
          exact
          path="/newpost"
          component={state.isAuthenticated ? NewPost : Login}
        ></Route>
        <Route
          exact
          path="/posts/:id"
          component={state.isAuthenticated ? EditPost : Login}
        ></Route>
        <Route
          exact
          path="/"
          component={state.isAuthenticated ? PostList : Login}
        ></Route>
      </Switch>
    </Router>
  );
};

export default Home;
