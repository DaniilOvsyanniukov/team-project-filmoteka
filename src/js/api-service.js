const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'cf7103a04560136cfec7834a7d0f8600';

export default class ApiServise {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }

  fetchMoviesByRequest() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        this.incrementPage();
        return results;
      });
  }

  fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(({ genres }) => {
        return genres;
      });
  }

  fetchMovieDetails() {
    const url = `${BASE_URL}/movie/${this.movieId}?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        return data;
      })
      // .then(data => ({
      //   data
      // })).then(({ data }) => {
      //   return data
      // })
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  clearInput() {
    this.searchQuery.innerHTML = '';
  }
}