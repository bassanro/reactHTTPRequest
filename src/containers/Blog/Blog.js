import React, { Component, Suspense } from "react";

import "./Blog.css";
import Posts from "../Posts/Posts";
import { Route, NavLink, Switch } from "react-router-dom";

import asyncComponent from "../../hoc/asyncComponent";
// dynamic import syntax.
const AsyncPost = asyncComponent(() => {
  return import("..//NewPost/NewPost");
});

// here names exports are not support for lazy
const Post = React.lazy(() => import("../NewPost/NewPost"));

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}>
                  Posts
                </NavLink>
              </li>
              <li>
                {/* hash is like id to jump back */}
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}>
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* "/" will take care of /posts/id as well. */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncPost} />
          ) : null}
          <Route
            path="/posts"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <Post />{" "}
              </Suspense>
            )}
          />
          <Route path="/" component={Posts} />
          <Route render={() => <h1>Page not Found</h1>} />
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
