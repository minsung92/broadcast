import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

function CommentList(props) {
  const apiUrl = props.commentApiUrl;
  const movieId = props.MovieId;
  const list = props.commentList;
  const userInfo = props.UserInfo;
  const [isEdits, setIsEdits] = useState(0);
  const [isUpdate, setIsUpdate] = useState(true);

  function onClickDeleteButton(movieId) {
    axios.delete(`${apiUrl}/${movieId}`);
    props.loading(true);
  }

  function onClickModeButton(listId) {
    setIsEdits(listId);
  }

  useEffect(() => {
    props.loading(true);
    setIsEdits(0);
  }, [isUpdate]);

  if (list.length === 0 || list === undefined || list === "") {
    return (
      <>
        <span>데이터 없음</span>
      </>
    );
  }
  return (
    <>
      <h2>Comment_List</h2>
      <ul>
        {list.map((item) => {
          return item && isEdits !== item.id ? (
            <li>
              {item.comment}
              <input
                type="button"
                value="수정"
                onClick={() => onClickModeButton(item.id)}
              />
              <input
                key={item.id}
                type="button"
                value="삭제"
                onClick={() => onClickDeleteButton(item.id)}
              />
            </li>
          ) : isEdits === item.id ? (
            <li>
              <CommentForm
                key={movieId + "cf"}
                MovieId={movieId}
                UserInfo={userInfo}
                commentApiUrl={apiUrl}
                actionType="change"
                updateState={setIsUpdate}
                inputValue={item.comment}
                movieNo={item.id}
              />
            </li>
          ) : (
            <span>데이터 없음</span>
          );
        })}
      </ul>
    </>
  );
}

export default CommentList;
