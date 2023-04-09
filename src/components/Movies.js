import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Movies.css";
import { Link } from "react-router-dom";

class Movies extends React.Component {
  render() {
    // const id = `${this.props.id}`;
    return (
      <>
        <div className="card style_1 movie">
          <Link
            className="image"
            to={{
              pathname: `/movie/${this.props.id}`,
            }}
            title={`${this.props.title}`}
          >
            <div className="image_h">
              <div className="wrapper">
                <img
                  className="movie__poster"
                  loading="lazy"
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${this.props.poster}`}
                  alt=""
                />
              </div>
              <div className="content">
                <p key={`${this.props.id}`}>{this.props.average} 점</p>
                <h2 className="movie__title">{this.props.title}</h2>
                <p
                  key={`${this.props.release_date}`}
                  className="movie__release_date"
                >
                  {this.props.release_date}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

Movies.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  average: PropTypes.number,
  poster: PropTypes.string,
};

export default Movies;
