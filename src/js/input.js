import refs from './refs';
import movieMarkup from '../templates/movie-card';
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
    renderMarkup(match(results));
    // console.log(results);
  })
  .catch(error => console.log(error));

refs.searchForm.addEventListener('submit', onSearchForm);

function match(arr) {
  return arr.map(el => {
    for (let i = 0; i < el.genre_ids.length; i++) {
      el.genre_ids[i] = findGenre(el.genre_ids[i]);
      if (el.genre_ids.length > 2) {
        el.genre_ids.splice(2, 5, 'other');
      }
    }
    // el.release_date = el.release_date.slice(0, 4);
    // console.log(el.genre_ids);
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
      renderMarkup(match(results));
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
  const destrResults = destructArray(results)
  refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(destrResults));
}

function destructArray(arr) {
  return arr.map(({ id, backdrop_path, original_title, poster_path, genre_ids, release_date }) => ({
    id,
    backdrop_path,
    original_title,
    poster_path,
    genre_ids,
    release_date,
    dataMovie: JSON.stringify({
      id,
      backdrop_path,
      original_title,
      poster_path,
      genre_ids,
      release_date,
    }),
  }));
};

function destructObj({ id, backdrop_path, original_title, poster_path, genre_ids, release_date }) {
  return { id, backdrop_path, original_title, poster_path, genre_ids, release_date, dataMovie: JSON.stringify({
      id,
      backdrop_path,
      original_title,
      poster_path,
      genre_ids,
      release_date,
    }) }
}
