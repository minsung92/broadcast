import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserInfo, setUserInfo] = useState({
    email: "",
    name: "",
  });
  const navigate = useNavigate();
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = async (e) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    e.preventDefault();

    if (Email === "" || Password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    }

    const apiUrl = "http://localhost:8000/users";
    const response = await axios.get(
      `${apiUrl}?email=${Email}&password=${Password}`
    );
    if (response.data.length === 0) {
      alert("계정을 확인하세요");
    } else {
      response.data.forEach((userinfo) => {
        setUserInfo({
          email: userinfo.email,
          name: userinfo.name,
        });
        localStorage.setItem(
          "userinfo",
          JSON.stringify({
            email: userinfo.email,
            name: userinfo.name,
          })
        );
      });
      navigate("/");
    }
  };

  useEffect(() => {}, [UserInfo]);
  //console.log(UserInfo);
  return (
    <div className="loginform">
      <h2 className="login_title">LOGIN</h2>
      <form className="login_form" onSubmit={onSubmitHandler}>
        <label className="login_info">Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label className="login_info">Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button className="login_btn" formAction="">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
