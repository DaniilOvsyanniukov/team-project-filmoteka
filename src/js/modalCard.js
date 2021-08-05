import ApiService from './api-service';
import galRefs from './refs';

import movieDetails from '../templates/modal-movie-card.hbs';

const apiService = new ApiService();


const refs = {
  backdrop: document.querySelector('.backdrop'),
  movieCardContainer: document.querySelector('.modal-card-container'),
  closeBtn: document.querySelector('.close-btn'),
};

galRefs.gallery.addEventListener('click', onGallery);
refs.closeBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdrop);


function onGallery(e) {
  e.preventDefault();

  const id = JSON.parse(e.target.dataset.action);
  const watchedList = JSON.parse(localStorage.getItem('watched movies') || '[]');
  const queueList = JSON.parse(localStorage.getItem('In queue') || '[]');
  const repeatInWatch = watchedList.some(elem => elem.id === id);
  const repeatInQueue = queueList.some(elem => elem.id === id);

  if (e.target.tagName.toLowerCase() !== 'img') return;

  if (repeatInWatch === true && repeatInQueue === true) {
    
    apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
      data.wbuttonText = 'Remove from watched'
      data.qbuttonText = 'Remove from queue'
      clearModalMovieCardContainer();
      appendInModalCard(data);
    });
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keyup', onKeyClose);
  }
  
  else if (repeatInWatch === true && repeatInQueue !== true) {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Remove from watched'
        data.qbuttonText = 'Add to queue'
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keyup', onKeyClose);
  }
  
  else if (repeatInWatch !== true && repeatInQueue === true) {
      apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
        data.wbuttonText = 'Add to watched'
        data.qbuttonText = 'Remove from queue'
        clearModalMovieCardContainer();
        appendInModalCard(data);
      });
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keyup', onKeyClose);
  }
  
  else {
    apiService.fetchMovieDetails(e.target.dataset.action).then(data => {
      data.wbuttonText = 'Add to watched'
      data.qbuttonText = 'Add to queue'
      clearModalMovieCardContainer();
      appendInModalCard(data);
    });
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keyup', onKeyClose);
  }
}


function appendInModalCard(data) {
  refs.movieCardContainer.insertAdjacentHTML('beforeend', movieDetails(data));
};


function clearModalMovieCardContainer() {
  refs.movieCardContainer.innerHTML = '';
};


function onCloseBtn(e) {
  refs.backdrop.classList.add('is-hidden');


  // обновление карточек в разделах билиотеки при закрытии модалки
  if (renderLib.libraryLink.classList.contains('current-page')) {
    const watchedB = document.querySelector('.watched-js')
    const queueB = document.querySelector('.queue-js')
    
    if (watchedB.classList.contains('enabled-btn')) {
      renderLib.firstSixMovies('watched movies');
    } else {
      if (queueB.classList.contains('enabled-btn')) {
        renderLib.firstSixMovies('In queue');
      };
    };
  };

  window.removeEventListener('keyup', onKeyClose);
};


function onBackdrop(e) {
  if (e.target === e.currentTarget) {
    onCloseBtn();
  };
};


function onKeyClose(e) {
  if (e.code === 'Escape') {
    onCloseBtn();
  };
};
