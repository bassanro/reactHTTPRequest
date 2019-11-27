import React, { Component } from "react";
import axiosInstance from "../../axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPosts: null
  };

  // Safely fetching data to update state when component updates.
  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedPosts ||
        (this.state.loadedPosts && this.state.loadedPosts.id !== this.props.id)
      ) {
        axiosInstance
          .get("/posts/" + this.props.id)
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
    axiosInstance.delete("/posts/" + this.props.id).then((response) => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
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