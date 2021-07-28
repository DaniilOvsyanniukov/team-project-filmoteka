import ApiService from './api-service';

import movieDetails from '../templates/modal-movie-card.hbs';

const apiService = new ApiService();

// console.log(apiService.fetchMovieDetails())

const refs = {
    backdrop: document.querySelector('.backdrop'),
    movieCardContainer: document.querySelector('.modal-card-container'),
    closeBtn: document.querySelector('.close-btn'),
    // gallery: document.querySelector('.gallery')
};

// refs.gallery.addEventListener('click', onGallery);
refs.closeBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdrop)

function onGallery(e) {
    e.preventDefault();

    if (e.target.tagName.toLowerCase() !== 'li') {
        return;
    };
    
    apiService.movieId = e.target.dataset.action;

    apiService.fetchMovieDetails.then(data => {
        appendModalCard(data)
    });
    
    refs.backdrop.classList.remove('is-hidden');

    // window.addEventListener('keyup', onKeyClose);
}

function appendModalCard(data) {
    refs.movieCardContainer.insertAdjacentHTML('beforeend', movieDetails(data))
}

function onCloseBtn(e) {
    refs.backdrop.classList.add('is-hidden');

    // window.removeEventListener('keyup', onKeyClose)
}

function onBackdrop(e) {
    if (e.target === e.currentTarget) {
        onCloseBtn();
    }
}

// function onKeyClose(e) {
//     if (e.code === 'Escape') {
//         onCloseBtn()
//     }
// }