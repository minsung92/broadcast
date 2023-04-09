import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./CommentForm.css";

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

  const [firstFocus, setFirstFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isInput, setIsInput] = useState(false);

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

  const onChange = (e) => {
    const { name, value } = e.target;

    if (e.target.value) {
      setIsInput(true);
    } else {
      setIsInput(false);
    }

    setCommentArray({
      ...commentArray,
      [name]: value,
    });
  };

  return (
    <div className="commentContainer">
      {/* <div className="commnentUser">
        {actionType === "input" ? (
          <p className="commnent_userName">김민성</p>
        ) : (
          ""
        )}
      </div> */}
      <div className="commentWrap Comment_input_box">
        {isFocus === false ? (
          <div className="Comment_line"></div>
        ) : (
          <div className="Comment_line_inAni"></div>
        )}
        <input
          name="comment"
          type="text"
          placeholder="댓글달기..."
          value={comment}
          onChange={onChange}
          onKeyUp={(e) => {
            e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
          }}
          onFocus={() => {
            setIsFocus(true);
            setFirstFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
        />
        <input
          type="hidden"
          value={props.MovieId}
          onChange={onChange}
          name="no"
        />
        <div>
          {firstFocus ? (
            <>
              <div
                onClick={() => setFirstFocus(false)}
                id="Comment_btn1"
                className="Comment_buttons"
              >
                취소
              </div>
              {!isInput ? (
                <div id="Comment_btn2" className="Comment_buttons">
                  {actionType === "input" ? "댓글" : "댓글수정"}
                </div>
              ) : (
                <div
                  id="Comment_btn2_active"
                  className="Comment_buttons"
                  onClick={onComment}
                >
                  {actionType === "input" ? "댓글" : "댓글수정"}
                </div>
              )}
            </>
          ) : (
            <div className="Comment_buttons"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
