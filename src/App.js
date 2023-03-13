import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Movie from "./components/Movie";
import JoinForm from "./components/JoinForm";
import LoginForm from "./components/LoginForm";
import Sidebar from "./routes/Sidebar";
import "./App.css";

const AboutPage = () => {
  return <>ABOUT</>;
};

const NotFound = () => {
  return <Link to="..">되돌아가기!!</Link>;
};

class App extends React.Component {
  state = {
    movies: [],
    userInfo: [],
    userOut: true,
  };

  InputData = (data) => {
    const { movies } = this.state;
    //console.log("inputData >>>>> :" + JSON.stringify(movies));
    const newMovies = movies.concat(data);
    this.setState({
      movies: newMovies,
    });
  };

  logOut = () => {
    localStorage.removeItem("userinfo");
    this.setState({ userInfo: "" });
    this.setState({ userOut: false });
  };

  // 첫 로딩일때 사용
  componentDidMount() {}

  // 업데이트가 있을때 사용
  componentDidUpdate() {
    const userInfo = this.state.userInfo;
    const localInfo = JSON.parse(localStorage.getItem("userinfo"));
    //console.log(this.state.userInfo.length);
    //console.log(localInfo);
    if (userInfo.length === 0 && localInfo) {
      this.setState({ userInfo: localInfo });
      this.setState({ userOut: true });
    }
  }
  componentWillUnmount() {
    this.logOut();
  }
  render() {
    const UserInfo = this.state.userInfo;
    const UserOut = this.state.userOut;
    return (
      <>
        <BrowserRouter>
          <header className="main_h">
            <h1 className="main_title">
              <a className="title_a" href="/">
                - M'Movie VIEW -
              </a>
            </h1>
            <Sidebar
              UserInfo={UserInfo}
              UserOut={UserOut}
              LogOut={this.logOut}
            />
          </header>
          <Routes>
            <Route
              path="/"
              exact={true}
              element={
                <Home InputData={this.InputData} movies={this.state.movies} />
              }
            />
            <Route path="/movie/:id" element={<Movie UserInfo={UserInfo} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/Joinform" element={<JoinForm />} />
            <Route path="/Loginform" element={<LoginForm />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
export default App;
