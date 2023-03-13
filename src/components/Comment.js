import React, { useEffect, useState } from "react";
import axios from "axios";

function Movie_Comment({ children, title, userInfo, movieId, commentApiUrl }) {
  const [mcount, setMcount] = useState("");
  const apiUrl = commentApiUrl;

  useEffect(async () => {
    const response = await axios.get(`${apiUrl}?no=${movieId}`);
    setMcount({
      ...mcount,
      mcount: response.length,
    });
  }, []);

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
