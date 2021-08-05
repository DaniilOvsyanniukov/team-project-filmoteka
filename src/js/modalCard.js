import ApiService from './api-service';
import galRefs from './refs';

import movieDetails from '../templates/modal-movie-card.hbs';
import { watchedQueueFlag, renewParam, firstSixMovies } from './library';
const headerScroll = document.querySelector('.header');

const apiService = new ApiService();
let visualNumberOfItems = 6; // индекс для конца обрезки массива из локал
let startIndex = 6;
const home = document.querySelector('.home-js');
const library = document.querySelector('.library-js');

const refs = {
  backdrop: document.querySelector('.backdrop'),
  movieCardContainer: document.querySelector('.modal-card-container'),
  closeBtn: document.querySelector('.close-btn'),
};

let watchedLocalLength = 0;
let queueLocalLength = 0;

galRefs.gallery.addEventListener('click', onGallery);
galRefs.vidoCloseBtn.addEventListener('click', clearSpaceFromVideo);
refs.closeBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdrop);

function onGallery(e) {
  e.preventDefault();

  // console.log('watchedLocalLength', watchedLocalLength);
  // console.log('queueLocalLength', queueLocalLength);
  if (e.target.classList.contains('modal')) {
    return;
  } else {
    // Переменные которые нужны для корректного закрытия окна ,если ы открыли и ничего не удалили то просто сверяются длины локал сторедж
    watchedLocalLength = JSON.parse(localStorage.getItem('watched movies')).length;
    queueLocalLength = JSON.parse(localStorage.getItem('In queue')).length;
    const id = JSON.parse(e.target.dataset.action);
    const watchedList = JSON.parse(localStorage.getItem('watched movies') || '[]');
    const queueList = JSON.parse(localStorage.getItem('In queue') || '[]');
    const repeatInWatch = watchedList.some(elem => elem.id === id);
    const repeatInQueue = queueList.some(elem => elem.id === id);

    if (e.target.tagName.toLowerCase() !== 'img') return;

    if (repeatInWatch === true && repeatInQueue === true) {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Remove from watched';
        data.qbuttonText = 'Remove from queue';
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
      refs.backdrop.classList.remove('is-hidden');
      window.addEventListener('keyup', onKeyClose);
    } else if (repeatInWatch === true && repeatInQueue !== true) {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Remove from watched';
        data.qbuttonText = 'Add to queue';
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
      refs.backdrop.classList.remove('is-hidden');
      window.addEventListener('keyup', onKeyClose);
    } else if (repeatInWatch !== true && repeatInQueue === true) {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Add to watched';
        data.qbuttonText = 'Remove from queue';
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
      refs.backdrop.classList.remove('is-hidden');
      window.addEventListener('keyup', onKeyClose);
    } else {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Add to watched';
        data.qbuttonText = 'Add to queue';
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
      refs.backdrop.classList.remove('is-hidden');
      window.addEventListener('keyup', onKeyClose);
    }
  }
}

function appendInModalCard(data) {
  refs.movieCardContainer.insertAdjacentHTML('beforeend', movieDetails(data));
}

function clearModalMovieCardContainer() {
  refs.movieCardContainer.innerHTML = '';
  galRefs.videoContainer.innerHTML = '';
  galRefs.youTubeModal.classList.add('is-hidden');
}

function onCloseBtn(e) {
  refs.backdrop.classList.add('is-hidden');
  
  galRefs.videoContainer.innerHTML = '';
  galRefs.youTubeModal.classList.add('is-hidden');
  galRefs.vidoCloseBtn.removeEventListener('click', onKeyClose);

  if (home.classList.contains('current-page')) {
    return;
  } else if (library.classList.contains('current-page')) {
    if (watchedQueueFlag) {
      if (matchLoaclStrage('watched movies')) {
        return;
      } else {
        renewParam(6);
        firstSixMovies('watched movies');
        scrollContent();
      }
    } else {
      if (matchLoaclStrage('In queue')) {
        return;
      } else {
        renewParam(6);
        firstSixMovies('In queue');
        scrollContent();
      }
    }
  }

  // обновление карточек в разделах билиотеки при закрытии модалки
  // if (renderLib.libraryLink.classList.contains('current-page')) {
  //   const watchedB = document.querySelector('.watched-js')
  //   const queueB = document.querySelector('.queue-js')

  //   if (watchedB.classList.contains('enabled-btn')) {
  //     renderLib.firstSixMovies('watched movies');
  //   } else {
  //     if (queueB.classList.contains('enabled-btn')) {
  //       renderLib.firstSixMovies('In queue');
  //     };
  //   };
  // };

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

function scrollContent() {
  headerScroll.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function matchLoaclStrage(key) {
  const lengthLocal = JSON.parse(localStorage.getItem(key)).length;
  if (lengthLocal === watchedLocalLength || lengthLocal === queueLocalLength) {
    return true;
  } else {
    return false;
  }
}

function clearSpaceFromVideo() {
  galRefs.videoContainer.innerHTML = '';
  galRefs.youTubeModal.classList.add('is-hidden');
  galRefs.vidoCloseBtn.removeEventListener('click', onKeyClose);
};

