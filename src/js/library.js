import movieMarkup from '../templates/library-movie-card.hbs';

//Получаю доступ к элементам
const libraryLink = document.querySelector('.library-js');
const listOfHeaderBtns = document.querySelector('.buttons.list');
const gallery = document.querySelector('.movie-list-js');
const titleNoMovie = document.querySelector('.no-movie');
const plaginationEl = document.querySelector('.pagination');
const section = document.querySelector('.gall-js');
//yarik
const searchForm = document.querySelector('.search-form-js');
const homePageLink = document.querySelector('.home-js');
const header = document.querySelector('.header-js');
const sentinel = document.getElementById('sentinel');

let watchedQueueFlag = true;
let visualNumberOfItems = 6;
let startIndex = 6;

//Вешаю слушателей на кнопки и мою библиотеку
libraryLink.addEventListener('click', onLibraryLinkCLick);
listOfHeaderBtns.addEventListener('click', onListOfHeadersBtns);

//функция на ссылке моя библиотека при нажатии скрывает плагинацию открывает кнопки на хедере
//добавляет класс чтобы футер был внизу

function onLibraryLinkCLick(event) {
  event.preventDefault();
  plaginationEl.style.display = 'none';
  listOfHeaderBtns.classList.remove('visually-hidden');
  section.classList.add('section-library-height');
  sentinel.classList.remove('display-none');
  watchedQueueFlag = true;
  // изменяет хедер визуально
  //yarik
  searchForm.classList.add('visually-hidden');
  homePageLink.classList.remove('current-page');
  libraryLink.classList.add('current-page');
  header.classList.remove('header-home');
  header.classList.add('header-library');
  //
  // вызывает функцию которая рендерит карточки из локалсторедж (renderMarkupFromLocalStorage)
  // вызывает функцию проверку, если локалсторедж пуст, то на галерею вешается фоновый рисунок и надпись No movies (heightForGalleryBackgroundImg)
  renewParam(6);
  firstSixMovies('watched movies');
}

//функция обрабатвает события на кнопках
function onListOfHeadersBtns(event) {
  event.preventDefault();
  //если кнопка вотчед, то тогда рендерятся карточки из локалсторедж под ключом вотчед
  // если нет информации в соответствующем ключе, то вещается фоновый рисунок
  if (event.target.classList.contains('watched-js')) {
    watchedQueueFlag = true;
    renewParam(6);

    firstSixMovies('watched movies');
  }
  //если кнопка кьюю то тогда рендерятся карточки из ключа кьюю
  // если нет информации в соответствующем ключе, то вещается фоновый рисунок
  if (event.target.classList.contains('queue-js')) {
    watchedQueueFlag = false;

    renewParam(6);
    firstSixMovies('In queue');
  }
}

//функция для обрезки жанров до 2х и обрезки дат фильмов до года
function sliceGanresDate(arr) {
  if (arr === null) {
    return;
  }
  return arr.map(item => {
    if (item.genres.length > 2) {
      item.genres.splice(2, 5);
      item.genres.splice(1, 0, { name: `, ` });
    } else if (item.genres.length === 2) {
      item.genres.splice(1, 0, { name: `, ` });
    }
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
}
//============================================= infinity scroll==================

const loadMore = function (key) {
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem(key));
  let numberOfItems = 6;
  visualNumberOfItems += numberOfItems;
  if (moviesFromLocalStorage === null) {
    return;
  }
  const visualItems = moviesFromLocalStorage.slice(startIndex, visualNumberOfItems);

  console.log('visualItems', visualItems);

  gallery.insertAdjacentHTML('beforeend', movieMarkup(sliceGanresDate(visualItems)));
  startIndex += numberOfItems;
};

function onEntry(entries) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
      if (watchedQueueFlag) {
        loadMore('watched movies');
      } else {
        loadMore('In queue');
      }
    }
  });
}
const options = {
  threshold: 0.8,
  rootMargin: '0px 0px 50px 0px',
};

const interObserv = new IntersectionObserver(onEntry, options);

interObserv.observe(sentinel);

function firstSixMovies(key) {
  gallery.innerHTML = '';
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem(key));

 if (moviesFromLocalStorage === null) {
    gallery.classList.add('galleryEmptySpace');
    titleNoMovie.classList.remove('display-none');
    return;
  } else if (moviesFromLocalStorage.length === 0) {
    gallery.classList.add('galleryEmptySpace');
    titleNoMovie.classList.remove('display-none');
    return;
  } else {
    gallery.classList.remove('galleryEmptySpace');
    titleNoMovie.classList.add('display-none');
  }
  const updateInfoFroLocalStarage = sliceGanresDate(moviesFromLocalStorage);
  const firstSix = updateInfoFroLocalStarage.slice(0, 6);
  gallery.insertAdjacentHTML('beforeend', movieMarkup(firstSix));
}
function renewParam(num) {
  visualNumberOfItems = num;
  startIndex = num;
}
