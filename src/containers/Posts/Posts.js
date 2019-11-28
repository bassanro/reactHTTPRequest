import React, { Component } from "react";
import axiosInstance from "../../axios";
import Post from "../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "./../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: []
  };

  // For every request and response we can set global functions. Also helpful to handler errors.
  // These are called interceptors.
  // Note that axios returns a promise that can be captured via then command.
  componentDidMount() {
    //console.log(this.props);
    axiosInstance
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPost = posts.map((post) => {
          return {
            ...post,
            author: "Max"
          };
        });

        this.setState({ posts: updatedPost });
        //console.log(response);
      })
      .catch((error) => {
        //this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    // Takes string or object. same as router link "to" property.
    this.props.history.push({ pathname: "/posts/" + id });
    //this.props.history.push("/posts/" + id);
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong</p>;

    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={"/posts/" + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }

    // <Route path="/posts/:PostId" component={FullPost} />
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path="/posts/:PostId" component={FullPost} />
      </div>
    );
  }
}

export default Posts;
