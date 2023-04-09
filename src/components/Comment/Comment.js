import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "../CommnentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import "./Comment.css";

function Movie_Comment({ UserInfo, MovieId, commentApiUrl }) {
  const [mcount, setMcount] = useState(0);
  const apiUrl = commentApiUrl;
  const movieId = MovieId;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  async function getData() {
    const response = await axios.get(`${apiUrl}?no=${movieId}`);
    setMcount(response.data.length);
    setList(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [loading]);

  return (
    <div className="movie_panel">
      <div className="review">
        <h3> - 사용자 리뷰 - </h3>
        <h3>댓글 {mcount}개</h3>
      </div>
      <div className="review_form">
        <CommentForm
          key={movieId + "cf"}
          MovieId={movieId}
          UserInfo={UserInfo}
          commentApiUrl={commentApiUrl}
          loading={setLoading}
          actionType="input"
          inputValue=""
          movieNo="0"
        />
      </div>
      <div className="content">
        <CommentList
          key={movieId + "cl"}
          MovieId={movieId}
          commentApiUrl={commentApiUrl}
          UserInfo={UserInfo}
          commentList={list}
          loading={setLoading}
        />
      </div>
    </div>
  );
}

export default Movie_Comment;
