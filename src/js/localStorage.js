import ApiService from "./api-service";

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
const modal = document.querySelector('.modal');

const API = new ApiService()

const watchedList = JSON.parse(localStorage.getItem('watchedList') || '[]');
const queueList = JSON.parse(localStorage.getItem('queue') || '[]');


modal.addEventListener('click', onModalButtons);

function onModalButtons(e) {
  e.preventDefault();

  console.log(e.target.tagName)

  const id = JSON.parse(e.target.dataset.id);
  const repeatedIndexWatched = watchedList.findIndex(elem => elem.id === id)
  const repeatedIndexQueue = queueList.findIndex(elem => elem.id === id)

  if (e.target.hasAttribute('data-dir')) {
    if (e.target.classList.contains('watched') && repeatedIndexWatched !== -1) {
      watchedList.splice(repeatedIndexWatched, 1)
      localStorage.setItem('watched movies', JSON.stringify(watchedList))
    } else {
      API.fetchMovieDetails(id).then(data => {
        insertToStorage(data, watchedList, 'watched movies')
      });
    }
  } else if (e.target.hasAttribute('data-source')) {
    if (e.target.classList.contains('queue') && repeatedIndexQueue !== -1) {
      queueList.splice(repeatedIndexQueue, 1)
      localStorage.setItem('In queue', JSON.stringify(queueList))
    } else {
      API.fetchMovieDetails(id).then(data => {
        insertToStorage(data, queueList, 'In queue')
      });
    };
  };
};


function insertToStorage(data, list, state) {
  const destr = destructObj(data)
  list.push(destr)
  localStorage.setItem(state, JSON.stringify(list))
}

function destructObj({ id, overview, backdrop_path, original_title, poster_path, release_date, popularity, genres }) {
  return { id, overview, backdrop_path, original_title, poster_path, release_date, popularity, genres }
}


localStorage.clear()
  