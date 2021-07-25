import './sass/main.scss';

import refs from './js/refs';
import movieMarkup from './templates/movie-card.hbs';
import genreMarkup from './templates/movie-genre.hbs';
import ApiServise from './js/api-service';

const apiServise = new ApiServise();

refs.searchForm.addEventListener('submit', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.query.value;

  if (apiServise.query.trim() === '') {
    return alert('Пожалуйста, введите ваш запрос');
  }

  clearGallery();
  clearInput(e);
  apiServise.resetPage();
  apiServise.fetchMoviesByRequest().then(results => {
    renderMarkup(results);
  });
}

// function fetchGenres() {
//   apiServise.fetchMovies().then(results => {
//     results.map(result => genreMarkup(findGenreById(result.genre_ids)));
//   });
// }

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function clearInput(e) {
  e.currentTarget.elements.query.value = '';
}

function renderMarkup(results) {
  refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(results));
  //   refs.gallery.insertAdjacentHTML(
  //     'beforeend',
  //     genreMarkup(results.map(result => genreMarkup(findGenreById(result.genre_ids)))),
  //   );
}

function findGenreById(arr) {
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
  const genres = [];

  arr.forEach(el => {
    genresBD.forEach(genre => {
      if (el === genre.id) {
        genres.push(genre.name);
      }
    });
  });

  return genres;
}
