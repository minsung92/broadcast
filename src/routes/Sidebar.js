import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Sidebar(props) {
  // const [userOut, setUserOut] = useState("true");
  const info = props.UserInfo;
  const userOut = props.UserOut;
  const logout = props.LogOut;
  // useEffect(() => {
  //   logout();
  // }, [userOut]);

  // const logout = () => {
  //   localStorage.removeItem("userinfo");
  //   info.setState = [];
  //   setUserOut("false");
  // };

  return (
    <>
      <ul className="main_sidbar">
        <li>
          <Link to="/">
            <input type="button" value="MAIN" />
          </Link>
        </li>
        {info.length === 0 ? (
          <>
            <li>
              <Link to="/Joinform">
                <p>
                  <input type="button" value="회원가입" />
                </p>
              </Link>
            </li>
            <li>
              <Link to="/Loginform">
                <p>
                  <input type="button" value="로그인" />
                </p>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <p className="main_userinfo">
                {info && userOut ? info.name : ""}
              </p>
            </li>
            <li>
              <p>
                <input type="button" value="로그아웃" onClick={logout} />
              </p>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Sidebar;
