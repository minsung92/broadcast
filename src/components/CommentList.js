import React, { useState, useEffect } from "react";
import axios from "axios";

function CommentList(props) {
  const apiUrl = props.commentApiUrl;
  const movieId = props.MovieId;
  const list = props.commentList;

  function onClickDeleteButton(movieId) {
    console.log(typeof movieId);
    axios.delete(`${apiUrl}?id=${movieId}`);
    props.loading(true);
  }

  if (list.length === 0 || list === undefined || list === "") {
    return (
      <>
        <h2>Comment_List</h2>
        <span>데이터 없음</span>
      </>
    );
  } else {
    return (
      <>
        <h2>Comment_List</h2>
        <ul>
          {list.map((item) => {
            return item ? (
              <li>
                {item.comment}
                <input
                  type="button"
                  value="수정"
                  onClick={onClickDeleteButton}
                />
                <input
                  key={item.id}
                  type="button"
                  value="삭제"
                  onClick={() => onClickDeleteButton(item.id)}
                />
              </li>
            ) : (
              <span></span>
            );
          })}
        </ul>
      </>
    );
  }
}

export default CommentList;
