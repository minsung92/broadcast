import axios from 'axios';

const TMDB_KEY = '4b741dffc1c375412a9792e30107e3ed';
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';


const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: TMDB_KEY,
    language: "ko"
  }
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id => 
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
    search: term =>
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export default api;