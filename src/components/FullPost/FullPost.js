import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPosts: null
  };

  // NOTE: This is recursive loop, since updating state inside this method will rerender the component,
  // hence going into infiite loop. Can be checked from network console tab.
  componentDidUpdate() {
    if (this.props.id) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
        .then((response) => {
          this.setState({ loadedPosts: response.data });
        });
    }
  }

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading!!!</p>;
    }

    if (this.state.loadedPosts) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPosts.title}</h1>
          <p>{this.state.loadedPosts.content}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
