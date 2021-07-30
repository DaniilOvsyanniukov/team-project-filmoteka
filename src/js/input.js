import refs from './refs';
import movieMarkup from '../templates/movie-card';
import ApiServise from './api-service';

const apiServise = new ApiServise();

apiServise
  .fetchPopularMovies()
  .then(results => {
    renderMarkup(match(dectructArray(results)));
  })
  .catch(error => console.log(error));

refs.searchForm.addEventListener('submit', onSearchForm);

function dectructArray(arr) {
  return arr.map(({ id, backdrop_path, original_title, genre_ids, poster_path, release_date }) => ({
    id,
    backdrop_path,
    original_title,
    genre_ids,
    poster_path,
    release_date,
    dataMovie: JSON.stringify({
      id,
      backdrop_path,
      original_title,
      genre_ids,
      poster_path,
      release_date,
    }),
  }));
}

function match(arr) {
  const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
  return arr.map(el => {
    for (let i = 0; i < el.genre_ids.length; i++) {
      el.genre_ids[i] = findGenre(el.genre_ids[i]);
      if (el.genre_ids.length > 2) {
        el.genre_ids.splice(2, 5, 'other');
      }
    }
    if (el.release_date) {
      el.release_date = el.release_date.slice(0, 4);
    }
    if (el.poster_path) {
      el.poster_path = IMG_PATH + el.poster_path;
    } else {
      el.poster_path = 'https://w.zhinka.tv/templates/Default/dleimages/no_image.jpg';
    }
    return el;
  });
}

function findGenre(el) {
  const genresBD = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  let result;

  genresBD.forEach(genre => {
    if (el == genre.id) {
      result = genre.name;
    }
  });

  return result;
}

function onSearchForm(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.query.value;

  if (apiServise.query.trim() === '') {
    return alert('Пожалуйста, введите ваш запрос');
  }

  clearGallery();
  clearInput(e);
  apiServise.resetPage();
  apiServise
    .fetchMoviesByRequest()
    .then(results => {
      renderMarkup(match(dectructArray(results)));
    })
    .catch(error => console.log(error));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function clearInput(e) {
  e.currentTarget.elements.query.value = '';
}

function renderMarkup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(results));
}
