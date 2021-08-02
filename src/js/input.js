import refs from './refs';
import movieMarkup from '../templates/movie-card';
import ApiServise from './api-service';

const apiServise = new ApiServise();

let currentPage = 1;
let totalPages;
const pageRange = 2;

const paginationList = document.querySelector('.pagination-mid');
const pageList = document.querySelector('.pages');
const lastBtn = document.getElementById('last-page');
const prevBtn = document.getElementById('button-prev');
const nextBtn = document.getElementById('button-next');
const firstPage = document.querySelector('.first');
const lastPage = document.querySelector('.last');

init()

// apiServise
//   .fetchPopularMovies()
//   .then(results => {
//     renderMarkup(match(destructArray(results)));
//     setTimeout(preloader, 200);
//   })
//   .catch(error => console.log(error));

refs.searchForm.addEventListener('submit', onSearchForm);

function match(arr) {
  const IMG_PATH = 'https://image.tmdb.org/t/p/original/';
  return arr.map(el => {
    for (let i = 0; i < el.genre_ids.length; i++) {
      if (findGenre(el.genre_ids[i])) {
        el.genre_ids[i] = ` ${findGenre(el.genre_ids[i])}`;
        if (el.genre_ids.length > 2) {
          el.genre_ids.splice(2, 5, ' Other');
        }
      } else {
        el.genre_ids[i] = ' Other genre';
        if (el.genre_ids.length > 2) {
          el.genre_ids.splice(2, 5, ' Other');
        }
      }
    }
    if (el.release_date) {
      el.release_date = el.release_date.slice(0, 4);
    } else if (el.first_air_date) {
      el.release_date = el.first_air_date.slice(0, 4);
    }
    if (!el.original_title) {
      el.original_title = el.name;
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

// function onSearchForm(e) {
//   e.preventDefault();
//   apiServise.query = e.currentTarget.elements.query.value;

//   if (apiServise.query.trim() === '') {
//     return alert('Пожалуйста, введите ваш запрос');
//   }

//   clearGallery();
//   clearInput(e);
//   refs.preloader.classList.remove('done');
//   apiServise.resetPage();
//   apiServise
//     .fetchMoviesByRequest()
//     .then(results => {
//       renderMarkup(match(destructArray(results)));
//       setTimeout(preloader, 200);
//     })
//     .catch(error => console.log(error));
// }

function onSearchForm(e) {
  e.preventDefault();
  apiServise.query = e.currentTarget.elements.query.value;

  if (apiServise.query.trim() === '') {
    return alert('Пожалуйста, введите ваш запрос');
  }

  clearGallery();
  clearInput(e);
  pageList.innerHTML = '';
  
  refs.preloader.classList.remove('done');
  apiServise.resetPage();
  currentPage = 1;
  searchFetch()
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function clearInput(e) {
  e.currentTarget.elements.query.value = '';
}

function renderMarkup(results) {
  const destrResults = destructArray(results);
  refs.gallery.insertAdjacentHTML('beforeend', movieMarkup(destrResults));
}

function destructArray(arr) {
  return arr.map(
    ({
      first_air_date,
      id,
      name,
      backdrop_path,
      original_title,
      genre_ids,
      poster_path,
      release_date,
    }) => ({
      first_air_date,
      id,
      name,
      backdrop_path,
      original_title,
      genre_ids,
      poster_path,
      release_date,
      dataMovie: JSON.stringify({
        first_air_date,
        id,
        name,
        backdrop_path,
        original_title,
        genre_ids,
        poster_path,
        release_date,
      }),
    }),
  );
}

function destructObj({ id, backdrop_path, original_title, poster_path, genre_ids, release_date }) {
  return {
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
  };
}

function preloader() {
  if (!refs.preloader.classList.contains('done')) {
    refs.preloader.classList.add('done');
  }
}

//                                Код пагинации

function searchFetch() {
  apiServise
    .fetchMoviesByRequest()
    .then(data => {
      totalPages = data.total_pages;
      lastBtn.textContent = totalPages;
      // console.log(data)
      init()
      return data.results;
    }).then(results => {
      renderMarkup(match(destructArray(results)));
      setTimeout(preloader, 200);
    })
    
    .catch(error => console.log(error));
}

function fetchGall() {
    apiServise
    .fetchPopularMovies()
    .then(data => {
      totalPages = data.total_pages;
      lastBtn.textContent = totalPages;
      // console.log(data)
      init()
      return data.results;
    }).then(results => {
      renderMarkup(match(destructArray(results)));
    setTimeout(preloader, 200);
    })
    
  .catch(error => console.log(error));
}


paginationList.addEventListener('click', onBtnClick);
prevBtn.addEventListener('click', onPrevBtnClick);
nextBtn.addEventListener('click', onNextBtnClick);

function onBtnClick(evt) {
    evt.preventDefault();

  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  
  refs.gallery.innerHTML = '';
  pageList.innerHTML = '';
  
  currentPage =  Number (evt.target.textContent)
  apiServise.pagination(currentPage);
  
  if (apiServise.query) {
    searchFetch()
  } else {
    fetchGall()
  }
  
}

function onPrevBtnClick(evt) {
    evt.preventDefault();
    
  if (currentPage > 1) {
    currentPage -= 1
  }
  refs.gallery.innerHTML = '';
  pageList.innerHTML = '';
  apiServise.pagination(currentPage);
  
  if (apiServise.query) {
    searchFetch()
  } else {
    fetchGall()
  }
  
}


function onNextBtnClick(evt) {
    evt.preventDefault();

  if (currentPage !== totalPages) {
    currentPage += 1;
  }
  refs.gallery.innerHTML = '';
  pageList.innerHTML = '';
  apiServise.pagination(currentPage)
  
  if (apiServise.query) {
    searchFetch()
  } else {
    fetchGall()
  }
  
}

function renderPagesList() {
  const start = currentPage - pageRange;
  const end = currentPage + pageRange;

  for (let i = start; i <= end; i += 1){
    if (i > 0 && i <= totalPages) {
      pageList.insertAdjacentHTML('beforeend', `<li class="item"><button type="button">${i}</button></li>`);
    }
  }
}

function hideFirstLastBtn() {
  currentPage < 4
    ? firstPage.hidden = true
    : firstPage.hidden = false;
  currentPage > totalPages - 3
    ? lastPage.hidden = true
    : lastPage.hidden = false;
}

function checkBtnOpacity() {
  currentPage === 1
    ? prevBtn.disabled = true
    : prevBtn.disabled = false;
  currentPage === totalPages
    ? nextBtn.disabled = true
    : nextBtn.disabled = false;   
}

function makeActiveBtn() {
  let pagesMenu = pageList.querySelectorAll('button')
  for (let i = 0; i < pagesMenu.length; i += 1){
  if (Number(pagesMenu[i].textContent) === currentPage) {
    pagesMenu[i].classList.add('active')
  }
}
}

function init() {
  
  checkBtnOpacity();
  hideFirstLastBtn();
  renderPagesList();
  makeActiveBtn();
}

// console.log(currentPage)
apiServise.pagination(currentPage)
fetchGall()
