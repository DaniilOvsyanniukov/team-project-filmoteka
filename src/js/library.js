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

libraryLink.addEventListener('click', onLibraryLinkCLick);
listOfHeaderBtns.addEventListener('click', onListOfHeadersBtns);

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
  renderMarkupFromLocalStorage('watched movies');
  heightForGalleryBackgroundImg();
}

function onListOfHeadersBtns(event) {
  event.preventDefault();
  if (event.target.classList.contains('watched-js')) {
    renderMarkupFromLocalStorage('watched movies');
    heightForGalleryBackgroundImg();
  }
  if (event.target.classList.contains('queue-js')) {
    renderMarkupFromLocalStorage('In queue');
    heightForGalleryBackgroundImg();
  }
}

function renderMarkupFromLocalStorage(key) {
  gallery.innerHTML = '';
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem(key));
  const updateInfoFroLocalStarage = sliceGanresDate(moviesFromLocalStorage);
  console.log(updateInfoFroLocalStarage);
  gallery.insertAdjacentHTML('beforeend', movieMarkup(updateInfoFroLocalStarage));
}

function heightForGalleryBackgroundImg() {
  const arrOfCards = gallery.querySelectorAll('.movie-card-js');
  if (arrOfCards.length === 0) {
    gallery.classList.add('galleryEmptySpace');
    titleNoMovie.classList.remove('display-none');
  } else {
    gallery.classList.remove('galleryEmptySpace');
    titleNoMovie.classList.add('display-none');
  }
}

function sliceGanresDate(arr) {
  if (arr === null) {
    return;
  }
  return arr.map(item => {
    if (item.genres.length > 2) {
      item.genres.splice(2, 5);
      item.genres.splice(1, 0, { name: `, ` });
    }
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
}
