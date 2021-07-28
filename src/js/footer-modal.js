
const refs = {
 
    openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
    closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
    lightboxFooterModal: document.querySelector('.js-lightbox'),
    backdropClick: document.querySelector('.modal-background'),
};

//================================открыть модалку ========================================

refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
   
    refs.lightboxFooterModal.classList.remove('visually-hidden');
}

//========================закрыть модалку через иконку ========================================

refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
   window.removeEventListener('keydown', onEscClick); //для закрытия по ESС
    refs.lightboxFooterModal.classList.add('visually-hidden');
     
}

// ==============================закрыть по backdrop====================

refs.backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick() {
    onCloseModal();

    console.log('кликнули по backdrop');
}

// ===========================закрыть по ESС==========================

function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
}