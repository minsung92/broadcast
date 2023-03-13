import "./Home.css";
import Movies from "../components/Movies";
import { moviesApi } from "../api";
import React, { Component } from "react";

class Home extends React.Component {
  // state = {
  //   movies: [],
  // };
  // InputData = (data) => {
  //   const { movies } = this.state;
  //   //console.log("inputData >>>>> :" + JSON.stringify(movies));
  //   const newMovies = movies.concat(data);
  //   this.setState({
  //     movies: newMovies,
  //   });
  // };

  getNowplay = async () => {
    const nowPlaying = await moviesApi.nowPlaying();
    this.props.InputData({
      type: "nowPlaying",
      title: "nowPlaying",
      list: nowPlaying.data.results,
      isLoading: false,
    });
    const upcoming = await moviesApi.upcoming();
    this.props.InputData({
      type: "upcoming",
      title: "upcoming",
      list: upcoming.data.results,
      isLoading: false,
    });
    const popular = await moviesApi.popular();
    this.props.InputData({
      type: "popular",
      title: "popular",
      list: popular.data.results,
      isLoading: false,
    });
    //this.setState({nowPlaying:{type:"nowPlaying",title:"nowPlaying",list: nowPlaying.data.results, isLoading: false }});
  };

  componentDidMount() {
    this.getNowplay();
  }

  render() {
    const movies = this.props.movies;
    return (
      <section className="container">
        {movies.map((movie, index) => {
          return movie.loading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="movie_h">
              <div className="movie_h_title">
                <h2>{movie.title}</h2>
              </div>
              <div className="movies">
                {movie.list &&
                  movie.list.map((m, i) => {
                    return (
                      <Movies
                        key={i}
                        id={m.id}
                        title={m.title}
                        overview={m.overview}
                        poster={m.poster_path}
                        release_date={m.release_date}
                        average={m.vote_average}
                      />
                    );
                  })}
              </div>
            </div>
          ); //retrun
        })}
      </section>
    );
  }
}
export default Home;
