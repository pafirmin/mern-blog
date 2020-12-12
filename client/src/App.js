import React, { Fragment } from "react";
import Header from "./components/Header";
import PostList from "./components/posts/PostList";
import PostPage from "./components/posts/PostPage";
import TagPage from "./components/tags/TagPage";
import TagList from "./components/tags/TagList";
import Loader from "./components/Loader";
import { LoadingProvider } from "./components/LoadingContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <LoadingProvider>
        <Router>
          <Loader />
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route path="/posts/:id" component={PostPage} />
              <Route exact path="/tags" component={TagList} />
              <Route path="/tags/:tag" component={TagPage} />
            </Switch>
          </div>
        </Router>
      </LoadingProvider>
    </Fragment>
  );
};

export default App;
