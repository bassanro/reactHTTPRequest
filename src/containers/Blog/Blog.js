import React, { Component } from "react";

import "./Blog.css";
import Posts from "../Posts/Posts";
import { Route, NavLink } from "react-router-dom";
import NewPost from "../NewPost/NewPost";
import FullPost from "../FullPost/FullPost";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}>
                  Home
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
        {/* 
          <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/" render={() => <h2>Home 2</h2>} />
        */}
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/:postId" exact component={FullPost} />
      </div>
    );
  }
}

export default Blog;
