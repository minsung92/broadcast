import React from "react";

function Movie_Comment({ children, title }) {
  return (
    <>
      <h2>
        {title} <br /> Comment
      </h2>
      <h2>댓글 222개</h2>
      {children}
    </>
  );
}

export default Movie_Comment;
