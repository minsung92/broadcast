import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function CommentForm(props) {
  const [isValid, setIsValid] = useState(false);
  const ndate = new Date();
  const year = ndate.getFullYear();
  const month = ("0" + (ndate.getMonth() + 1)).slice(-2);
  const day = ("0" + ndate.getDate()).slice(-2);
  const dateStr = year + "-" + month + "-" + day;
  const movieId = props.MovieId;
  const actionType = props.actionType;
  const movieNo = props.movieNo;

  const [commentArray, setCommentArray] = useState({
    comment: props.inputValue,
    email: props.UserInfo.email,
    name: props.UserInfo.name,
    date: dateStr,
    no: 0,
  });

  const { comment } = commentArray;

  const onComment = useCallback(
    async (e) => {
      e.preventDefault();

      if (comment === "") {
        return;
      }
      const apiUrl = props.commentApiUrl;
      try {
        if (actionType === "change") {
          await axios.put(`${apiUrl}/${movieNo}`, {
            ...commentArray,
            no: movieId,
          });
          props.updateState(false);
        } else {
          await axios.post(apiUrl, {
            ...commentArray,
            no: movieId,
          });
          props.loading(true);
        }
        //console.log(data);
        setCommentArray({
          comment: "",
        });
      } catch (e) {
        console.log(e);
      }
    },
    [commentArray]
  );

  const onClose = (e) => {};

  const onChange = (e) => {
    const { name, value } = e.target;
    setCommentArray({
      ...commentArray,
      [name]: value,
    });
  };

  return (
    <div className="commentContainer">
      <div className="commnentUser">
        {actionType === "input" ? (
          <p className="commnent_userName">김민성</p>
        ) : (
          ""
        )}
      </div>
      <form className="commentWrap">
        <input
          name="comment"
          type="text"
          placeholder="댓글달기..."
          value={comment}
          onChange={onChange}
          onKeyUp={(e) => {
            e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
          }}
        />
        <input
          type="hidden"
          value={props.MovieId}
          onChange={onChange}
          name="no"
        />
        <input
          type="button"
          className="closeBtn"
          onClick={onClose}
          value="취소"
        />
        <input
          type="button"
          className={
            comment.length > 0 ? "submitCommnetActive" : "submitCommnetInactive"
          }
          onClick={onComment}
          value={actionType === "input" ? "댓글" : "댓글수정"}
        />
      </form>
    </div>
  );
}

export default CommentForm;
