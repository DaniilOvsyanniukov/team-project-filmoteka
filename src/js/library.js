import movieMarkup from '../templates/library-movie-card.hbs';

const libraryLink = document.querySelector('.library-js');
const listOfHeaderBtns = document.querySelector('.buttons.list');
const gallery = document.querySelector('.movie-list-js');
const titleNoMovie = document.querySelector('.no-movie');
//yarik
const searchForm = document.querySelector('.search-form-js');
const homePageLink = document.querySelector('.home-js');
const header = document.querySelector('.header-js');
//

console.log(gallery);

libraryLink.addEventListener('click', onLibraryLinkCLick);
listOfHeaderBtns.addEventListener('click', onListOfHeadersBtns);
//yarik
watchedBtn.addEventListener('click', onWatchedBtnClick);
queueBtn.addEventListener('click', onQueueBtnClick);
//

function onLibraryLinkCLick(event) {
  event.preventDefault();

  listOfHeaderBtns.classList.remove('visually-hidden');
  //yarik
  searchForm.classList.add('visually-hidden');
  homePageLink.classList.remove('current-page');
  libraryLink.classList.add('current-page');
  header.classList.remove('header-home');
  header.classList.add('header-library');
  //
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
