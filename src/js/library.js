import movieMarkup from '../templates/library-movie-card.hbs';

const libraryLink = document.querySelector('.library-js');
const listOfHeaderBtns = document.querySelector('.buttons.list');
const gallery = document.querySelector('.movie-list-js');
const titleNoMovie = document.querySelector('.no-movie');

console.log(gallery);

libraryLink.addEventListener('click', onLibraryLinkCLick);
listOfHeaderBtns.addEventListener('click', onListOfHeadersBtns);

function onLibraryLinkCLick(event) {
  event.preventDefault();

  listOfHeaderBtns.classList.remove('visually-hidden');

  renderMarkupFromLocalStorage('watched');
  widthForGallery();
}

function onListOfHeadersBtns(event) {
  event.preventDefault();
  if (event.target.classList.contains('watched-js')) {
    renderMarkupFromLocalStorage('watched');
    widthForGallery();
  }
  if (event.target.classList.contains('queue-js')) {
    renderMarkupFromLocalStorage('queue');
    widthForGallery();
  }
}

function renderMarkupFromLocalStorage(key) {
  gallery.innerHTML = '';
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem(key));
  gallery.insertAdjacentHTML('beforeend', movieMarkup(moviesFromLocalStorage));
}

function widthForGallery() {
  const arrOfCards = gallery.querySelectorAll('.movie-card-js');
  if (arrOfCards.length === 0) {
    gallery.classList.add('galleryEmptySpace');
    titleNoMovie.classList.remove('visually-hidden');
  } else {
    gallery.classList.remove('galleryEmptySpace');
    titleNoMovie.classList.add('visually-hidden');
  }
}
