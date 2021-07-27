import './sass/main.scss';


const refs = {
 // openFooterModal: document.querySelector('.footer-open-modal'),
    openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
  closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
  lightboxFooterModal: document.querySelector('.js-lightbox'),
};

//================================открыть модалку ========================================
console.log(refs.openFooterModal);
refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
   
    refs.lightboxFooterModal.classList.remove('visually-hidden');
}
//================================закрыть модалку ========================================

// refs.closeFooterModal.addEventListener('click', closeModal);

// function closeModal() {
   
//     refs.lightboxFooterModal.classList.add('visually-hidden');
// }