import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function Movie_Comment({ children, UserInfo, MovieId, commentApiUrl }) {
  const [mcount, setMcount] = useState(0);
  const apiUrl = commentApiUrl;
  const movieId = MovieId;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  async function getCountData() {
    const response = await axios.get(`${apiUrl}?no=${movieId}`);
    setMcount(response.data.length);
  }

  async function getListData() {
    const response = await axios.get(`${apiUrl}?no=${movieId}`);
    setList(response.data);
    setLoading(false);
  }

  const chagneLoading = (st) => {
    setLoading(st);
  };

  useEffect(() => {
    if (loading) {
      getListData();
      getCountData();
    }
  }, [list, loading]);

  return (
    <>
      <h2>Comment</h2>
      <h2>댓글 {mcount} 개</h2>
      <CommentForm
        key={movieId + "cf"}
        MovieId={movieId}
        UserInfo={UserInfo}
        commentApiUrl={commentApiUrl}
        loading={setLoading}
      />
      <CommentList
        key={movieId + "cl"}
        MovieId={movieId}
        commentApiUrl={commentApiUrl}
        UserInfo={UserInfo}
        commentList={list}
        loading={setLoading}
      />
    </>
  );
}

export default Movie_Comment;
