import ApiService from './api-service';
import galRefs from './refs';

import movieDetails from '../templates/modal-movie-card.hbs';

const apiService = new ApiService();

// console.log(apiService.fetchMovieDetails(456934))

const refs = {
  backdrop: document.querySelector('.backdrop'),
  movieCardContainer: document.querySelector('.modal-card-container'),
  closeBtn: document.querySelector('.close-btn'),
};

galRefs.gallery.addEventListener('click', onCollection);
refs.closeBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdrop);

function onCollection(e) {
  e.preventDefault();

  if (e.target.tagName.toLowerCase() !== 'img') {
    return;
  }

  apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
    clearModalMovieCardContainer();
    appendInModalCard(data);
  });

  refs.backdrop.classList.remove('is-hidden');

  window.addEventListener('keyup', onKeyClose);
}

// function destructObj({ id, title, backdrop_path, original_title, poster_path, genre_ids, release_date, vote_average, vote_count, popularity, genres }) {
//   return { id, title, backdrop_path, original_title, poster_path, genre_ids, release_date, vote_average, vote_count, popularity, genres, dataMovie: JSON.stringify({
//       id,
//       title,
//       backdrop_path,
//       original_title,
//       poster_path,
//       genre_ids,
//       release_date,
//       vote_average,
//       vote_count,
//       popularity,
//       genres,
//     }) }
// }

function appendInModalCard(data) {
  // const destrData = destructObj(data)
  refs.movieCardContainer.insertAdjacentHTML('beforeend', movieDetails(data));
}

function clearModalMovieCardContainer() {
  refs.movieCardContainer.innerHTML = '';
}

function onCloseBtn(e) {
  refs.backdrop.classList.add('is-hidden');

  window.removeEventListener('keyup', onKeyClose);
}

function onBackdrop(e) {
  if (e.target === e.currentTarget) {
    onCloseBtn();
  }
}

function onKeyClose(e) {
  if (e.code === 'Escape') {
    onCloseBtn();
  }
}
