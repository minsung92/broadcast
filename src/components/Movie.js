import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesApi } from "../api";
import "../Movie.css";
import Comment from "./Comment";

function Movie(props) {
  const params = useParams();
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    overview: "",
    backdrop_img: "",
    genres: [],
    vote_average: "",
    original_title: "",
    runtime: "",
    release_date: "",
  });

  const commentApiUrl = "http://localhost:8000/comment";
  // useEffect( async () => {
  //   const posts = await moviesApi.movieDetail(params.id);
  //   console.log(posts.data);
  //   setMovie( {id: posts.data.id , title: posts.data.title, overview: posts.data.overview , backdrop_img: posts.data.backdrop_path});
  // }, []);

  async function fetchData() {
    try {
      const posts = await moviesApi.movieDetail(params.id);
      if (posts) {
        setMovie({
          id: posts.data.id,
          title: posts.data.title,
          overview: posts.data.overview,
          backdrop_img: posts.data.backdrop_path,
          genres: posts.data.genres,
          vote_average: posts.data.vote_average,
          original_title: posts.data.original_title,
          runtime: posts.data.runtime,
          release_date: posts.data.release_date,
        });
      }
    } catch (e) {
      console.log(e);
    }
    // console.log(posts.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  const average = Math.round(movie.vote_average * 10) / 10;
  const movieTime = Math.round((movie.runtime / 60) * 10) / 10;

  return (
    <>
      <div className="header large border first">
        <div className="keyboard_s custom_bg">
          <div className="single_column">
            <section id="original_header" className="images inner">
              <div className="poster_wraper true">
                <div className="poster">
                  <div className="image_content backdrop">
                    <img
                      className="poster lazyload lazyloaded"
                      loading="lazy"
                      src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.backdrop_img}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>{" "}
              {/* 왼쪽 포스터 */}
              <div className="header_poster_wrapper true">
                <section className="header poster">
                  <div className="title ott_true" dir="auto">
                    <h2 className="poster_m_title">
                      <a href="" className="poster_m_title_d">
                        {movie.title}
                      </a>
                      <span className="tag release_date">(2022)</span>
                    </h2>
                    <div className="facts">
                      <span className="certification">
                        {movie.release_date} (KR)
                      </span>
                      <span className="genres">
                        {movie.genres.map((item) => {
                          return item ? (
                            <span> . {item.name} </span>
                          ) : (
                            <span></span>
                          );
                        })}
                      </span>
                      <span className="runtime">{movieTime} h</span>
                    </div>
                  </div>
                  {/* classname = title */}
                  <div className="auto actions">
                    <div className="text">
                      <div className="points">
                        <p className="movie_points">{average}</p>
                      </div>
                      <div className="points_text">
                        <p className="movie_points_text">
                          회원
                          <br />
                          점수
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* classname = actions / ul */}
                  <div className="header_info">
                    <h3 className="tagline" dir="auto">
                      {movie.original_title}
                    </h3>
                    <h3 dir="auto">개요</h3>
                    <div className="overview" dir="auto">
                      <p className="movie_overview">{movie.overview}</p>
                    </div>
                    <ol className="people no_image">
                      <li key={movie.id + 1} className="profile">
                        <p>
                          <a href="/person/1276959-john-d-payne">
                            John D. Payne
                          </a>
                        </p>
                        <p className="character">창작자</p>
                      </li>
                      <li key={movie.id + 2} className="profile">
                        <p>
                          <a href="/person/1276960-patrick-mckay">
                            Patrick McKay
                          </a>
                        </p>
                        <p className="character">창작자</p>
                      </li>
                    </ol>
                  </div>
                  {/*classname = header_info */}
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Comment
        key={movie.id + "c"}
        MovieId={movie.id}
        UserInfo={props.UserInfo}
        commentApiUrl={commentApiUrl}
      />
    </>
  );
}

export default Movie;
