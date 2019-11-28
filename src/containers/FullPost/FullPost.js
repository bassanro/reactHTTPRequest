import React, { Component } from "react";
import axiosInstance from "../../axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPosts: null
  };

  componentDidUpdate() {
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.PostId) {
      if (
        !this.state.loadedPosts ||
        (this.state.loadedPosts &&
          this.state.loadedPosts.id !== +this.props.match.params.PostId)
      ) {
        axiosInstance
          .get("/posts/" + this.props.match.params.PostId)
          .then((response) => {
            this.setState({ loadedPosts: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  deletePostHandler = (id) => {
    axiosInstance
      .delete("/posts/" + this.props.match.params.PostId)
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    console.log("[FullPost.js: Re-redering");
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.PostId) {
      post = <p style={{ textAlign: "center" }}>Loading!!!</p>;
    }

    if (this.state.loadedPosts) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPosts.title}</h1>
          <p>{this.state.loadedPosts.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
