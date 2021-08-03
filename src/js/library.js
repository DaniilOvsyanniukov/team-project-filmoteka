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
  renderMarkupFromLocalStorage('watched movies');
  heightForGalleryBackgroundImg();
}

//функция обрабатвает события на кнопках
function onListOfHeadersBtns(event) {
  event.preventDefault();
  //если кнопка вотчед, то тогда рендерятся карточки из локалсторедж под ключом вотчед
  // если нет информации в соответствующем ключе, то вещается фоновый рисунок
  if (event.target.classList.contains('watched-js')) {
    renderMarkupFromLocalStorage('watched movies');
    heightForGalleryBackgroundImg();
  }
  //если кнопка кьюю то тогда рендерятся карточки из ключа кьюю
  // если нет информации в соответствующем ключе, то вещается фоновый рисунок
  if (event.target.classList.contains('queue-js')) {
    renderMarkupFromLocalStorage('In queue');
    heightForGalleryBackgroundImg();
  }
}

// функция рендеринга карточек,
function renderMarkupFromLocalStorage(key) {
  // очищаем галерею
  gallery.innerHTML = '';
  // обращаемся в локал сторедж с нужнм для нас ключем
  const moviesFromLocalStorage = JSON.parse(localStorage.getItem(key));
  // обрезаем жанры до двух, согласно макету
  const updateInfoFroLocalStarage = sliceGanresDate(moviesFromLocalStorage);
  // добавляем информацию в шаблон и закидываем все в галерею
  gallery.insertAdjacentHTML('beforeend', movieMarkup(updateInfoFroLocalStarage));
}

// функция для проверки есть ли под заданнм ключем информация в локал сторедж
function heightForGalleryBackgroundImg() {
  // создаем коллекцию карточек после рендеринга
  const arrOfCards = gallery.querySelectorAll('.movie-card-js');
  // если такой коллекции нет, то есть ее длина равна 0, то добавляем класс galleryEmptySpace и показываем заголовок
  // в любом другом случае убираем класс и прячем заголовок
  if (arrOfCards.length === 0) {
    gallery.classList.add('galleryEmptySpace');
    titleNoMovie.classList.remove('display-none');
  } else {
    gallery.classList.remove('galleryEmptySpace');
    titleNoMovie.classList.add('display-none');
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
    }
    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    }
    return item;
  });
}
