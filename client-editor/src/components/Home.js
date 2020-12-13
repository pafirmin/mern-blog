import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "../App";
import Login from "./Login";
import NewPost from "./NewPost";
import PostList from "./PostList";
import Nav from "./Nav";

const Home = () => {
  const { state } = useContext(AuthContext);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route
          exact
          path="/newpost"
          component={state.isAuthenticated ? NewPost : Login}
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
