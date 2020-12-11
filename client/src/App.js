import React, { Fragment } from "react";
import Header from "./components/Header";
import PostList from "./components/PostList";
import Post from "./components/Post";
import TagPage from "./components/TagPage";
import TagList from "./components/TagList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/tags" component={TagList} />
          <Route path="/tags/:tag" component={TagPage} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
