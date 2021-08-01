import refs from './refs';

let currentPage = 1;
let totalPages;
const pageRange = 2;

// const galleryList = document.querySelector('.gallery')
const paginationList = document.querySelector('.pagination-mid');
const pageList = document.querySelector('.pages');
const lastBtn = document.getElementById('last-page');
const prevBtn = document.getElementById('button-prev');
const nextBtn = document.getElementById('button-next');
const firstPage = document.querySelector('.first');
const lastPage = document.querySelector('.last');


function fetchGall() {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=203f8b0b3061edeb4224dec7e35e9b80&page=${currentPage}`)
    .then(response => response.json()).then((data) => {
      totalPages = data.total_pages;
    lastBtn.textContent = totalPages;
      data.results.forEach((item) => {
        refs.gallery.innerHTML += '<div>' + item.title + '</div>';
      })
      init()
    })
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
  currentPage = Number (evt.target.textContent)
  
  fetchGall()
  
  
  // imageApiService.pagination(num)
  // imageApiService.fetchGallery().then(images => {
  //     appendImagesMarkup(images);
  // });
}

function onPrevBtnClick(evt) {
    evt.preventDefault();
    
  if (currentPage > 1) {
    currentPage -= 1
  }
  refs.gallery.innerHTML = '';
  pageList.innerHTML = '';
  fetchGall()
  console.log(currentPage)
}


function onNextBtnClick(evt) {
    evt.preventDefault();

  if (currentPage !== totalPages) {
    currentPage += 1;
  }
  refs.gallery.innerHTML = '';
  pageList.innerHTML = '';
  fetchGall()
  console.log(currentPage)
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
    console.log(i)
  }
}
}

function init() {
  
  checkBtnOpacity();
  hideFirstLastBtn();
  renderPagesList();
  makeActiveBtn();
}



// console.log(pagesMenu)
console.log(currentPage)

fetchGall()
init()