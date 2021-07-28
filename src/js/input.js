import refs from './refs';
import movieMarkup from '../templates/movie-card';
import genreMarkup from '../templates/movie-genre.hbs';
import ApiServise from './api-service';

const apiServise = new ApiServise();

// let GENRES = [];
// apiServise.fetchGenres().then(arr => {
//   console.log(arr);
// });
// console.log(GENRES);

apiServise
  .fetchPopularMovies()
  .then(results => {
    renderMarkup(results);
    // const movieId = document.querySelector('.movie-id');
    // movieId.insertAdjacentHTML(
    //   'beforeend',
    //   genreMarkup(results.map(result => findGenreById(result.genre_ids))),
    // );
    console.log(results);
    // console.log(
    //   ...results.map(r => {
    //     return (r.genre_ids = findGenreById(r.genre_ids));
    //   }),
    // );
    console.log(match(results));
  })
  .catch(error => console.log(error));

refs.searchForm.addEventListener('submit', onSearchForm);

function match(arr) {
  return arr.map(el => {
    for (let i = 0; i < el.genre_ids.length; i++) {
      el.genre_ids[i] = findGenre(el.genre_ids[i]);
    }
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
      renderMarkup(results);
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

  if (genres.length > 2) {
    genres.splice(2, 5, 'other');
  }

  return genres;
}
