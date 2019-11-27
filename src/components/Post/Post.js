import React from "react";
import "./Post.css";
import { withRouter } from "react-router-dom";

const post = (props) => {
  console.log(props);
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

// This helps with router history properties.
// It makes it route aware of nearest loaded route.
export default withRouter(post);
