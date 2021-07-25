const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'cf7103a04560136cfec7834a7d0f8600';

export default class ApiServise {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
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
