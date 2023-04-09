import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./JoinForm.css";

function JoinForm() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    inputChangeHandler();
  }, [isPasswordConfirm]);

  const inputChangeHandler = () => {
    if (isName && isEmail && isPassword && isPasswordConfirm) {
      const btnDisplay = document.getElementById("sign_up_button");
      btnDisplay.classList.remove("k-button-off");
      btnDisplay.classList.add("k-button");
    }
  };

  const doSignUp = useCallback(
    async (e) => {
      //console.log({ email });
      const apiUrl = "http://localhost:8000/users";
      try {
        const response = await axios.get(`${apiUrl}?email=${inputValue.email}`);

        if (response.data.length === 0 && inputValue.email !== "") {
          const { data } = await axios.post(apiUrl, inputValue);
          setCookie("accessToken", data["accessToken"], { path: "/" });
          navigate("/"); //navigate('/posts')
        } else {
          alert("동일한 계정이 있습니다.");
          const em = document.getElementById("email");
          em.focus();

          return Error;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [inputValue]
  );

  // 이름
  const onChangeName = useCallback(
    (e) => {
      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
        setIsName(false);
      } else {
        setNameMessage("올바른 이름 형식 입니다.");
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
        setIsName(true);
      }
    },
    [inputValue]
  );
  //이메일
  const onChangeEmail = useCallback(
    (e) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸습니다. 다시 확인해 주세요");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식 입니다.");
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
        setIsEmail(true);
      }
    },
    [inputValue]
  );
  // 비밀번호
  const onChagnePassword = useCallback(
    (e) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요 : )");
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]: value,
        });
        setIsPassword(true);
      }
    },
    [inputValue]
  );

  //비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);
      if (inputValue.password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [inputValue]
  );

  return (
    <div className="container">
      <section className="content">
        <div className="column_content">
          <h2>회원가입</h2>
          <div className="error_status errcard">
            <div className="carton">
              <a href="#" className="open no_click">
                <h2 className="background_color red">
                  <span>
                    <span className="glyphicons_v2 circle-alert svg invert"></span>
                    &nbsp; There was an error processing your signup
                  </span>
                </h2>
              </a>
              <div className="content"></div>
            </div>{" "}
            {/* error_status */}
          </div>
          {/*error_status*/}
          <form>
            <div className="formbox">
              <label className="k-form-field" htmlFor="username">
                <span>이름</span>
                <input
                  id="username"
                  className="k-textbox"
                  type="text"
                  name="name"
                  onChange={onChangeName}
                />
                {inputValue.name.length > 0 && (
                  <span className={`message ${isName ? "success" : "error"}`}>
                    {nameMessage}
                  </span>
                )}
              </label>
              <label className="k-form-field" htmlFor="email">
                <span>이메일</span>
                <input
                  id="email"
                  className="k-textbox"
                  type="text"
                  name="email"
                  onChange={onChangeEmail}
                />
                {inputValue.email.length > 0 && (
                  <span className={`message ${isEmail ? "success" : "error"}`}>
                    {emailMessage}
                  </span>
                )}
              </label>
              <label className="k-form-field" htmlFor="password">
                <span>비밀번호</span>
                <input
                  id="password"
                  className="k-textbox"
                  type="password"
                  name="password"
                  onChange={onChagnePassword}
                  placeholder="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                  title="비밀번호"
                />
              </label>
              {inputValue.password.length > 0 && (
                <span className={`message ${isPassword ? "success" : "error"}`}>
                  {passwordMessage}
                </span>
              )}
              <label className="k-form-field" htmlFor="password_confirm">
                <span> 비밀번호 확인 </span>
                <input
                  id="passwordConfirm"
                  className="k-textbox"
                  type="password"
                  name="passwordConfirm"
                  onChange={onChangePasswordConfirm}
                  title="passwordConfirm"
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmMessage}
                  </span>
                )}
              </label>
              <div className="flex">
                <input
                  id="sign_up_button"
                  type="button"
                  onClick={doSignUp}
                  className="k-button-off k-primary"
                  value="회원가입"
                />
                <p className="return">
                  <a href="/" className="cancel-button">
                    취소
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
        {/*column_content*/}
      </section>
    </div>
  );
}
export default JoinForm;
