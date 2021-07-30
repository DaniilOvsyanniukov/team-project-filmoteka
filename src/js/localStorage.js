const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
const modal = document.querySelector('.modal');

const watchedList = [];
const queueList = [];

modal.addEventListener('click', onModalButtons);
// // queueBtn.addEventListener('click', onQueueBtn);
// // watchedBtn.addEventListener('click', onWatchedBtn);

function onModalButtons(e) {
  e.preventDefault();

  let targetData = e.target.dataset;
  let id = targetData.id;
  let backdrop_path = targetData.backdrop;
  let original_title = targetData.title;
  let poster_path = targetData.poster;
  let genre_ids = targetData.genres;
  let release_date = targetData.release;

  let repeatedIdWatched = watchedList.some(el => el.id === id);

  if (e.target.classList.contains('watched')) {
    if (repeatedIdWatched) return;

    watchedList.push({
      id,
      backdrop_path,
      original_title,
      poster_path,
      genre_ids,
      release_date,
    });
    insertToStorageWatched();
    console.log(watchedList);
  }

  let repeatedIdQueue = queueList.some(el => el.id === id);

  if (e.target.classList.contains('queue')) {
    if (repeatedIdQueue) return;

    queueList.push({
      id,
      backdrop_path,
      original_title,
      poster_path,
      genre_ids,
      release_date,
    });

    insertToStorageQueue();
    console.log(queueList);
  }
}

// function onModalButtons(e) {
//     e.preventDefault();

//     let id = e.target.dataset.id;
//     // let repeatedIdWatched = watchedList.find(el => el.id === id);
//     // let repeatedIdWatched = 3;
//     let repeatedIdQueue = queueList.some(el => el.id === id);
//     // let watchedIn = localStorage.setItem('watched', JSON.stringify(watchedList))
//     let watchedOut = JSON.parse(localStorage.getItem('watched'))
//     // let repeat = watchedOut.find(i => i.id === id)

//     if (e.target.classList.contains('watched'))

// if (repeatedIdWatched === id) {

//     watchedList.push({
//         id: id
//     });
//     localStorage.setItem('watched list', JSON.stringify(watchedList))

//     let watchedMovieStorage = JSON.parse(localStorage.getItem('watched list'));
//     console.log(watchedMovieStorage)
//     let renewedArr = watchedMovieStorage.splice(id, 1);
//     localStorage.setItem('watched', JSON.stringify(renewedArr))
//      }
//      else {
//         localStorage.setItem('watched', JSON.stringify(watchedList));
//     }

// watchedList.push({
//     id: id
// });

// localStorage.setItem('watched', JSON.stringify(watchedList));

// if (e.target.classList.contains('queue')) {
//     if (repeatedIdQueue) return;

//     queueList.push({
//         id: id
//     });
//     insertToStorageQueue();
// }

function insertToStorageWatched() {
  localStorage.setItem('watched', JSON.stringify(watchedList));
}

function insertToStorageQueue() {
  localStorage.setItem('queue', JSON.stringify(queueList));
}

// localStorage.clear()

// function removeFromStorage() {

//     let watchedMovies = JSON.parse(localStorage.getItem('watched movie'))
//     console.log(watchedMovies)

//     for (let i = 0; i < watchedMovies.length; i++) {
//         if (watchedMovies[i].id == id) {
//             watchedMovies.splice(i, 1);
//             break;
//        }
//     }

//     let items = JSON.stringify(watchedMovies);
//     localStorage.setItem('watched movie', items);
// }

// function onModalMovieCard(e) {
//     e.preventDefault();

//     let id = e.currentTarget.dataset.id;
//     let repeatedId = watchedList.some(el => el.id === id);

//     if (e.target.classList.contains('watched')) {
//         if (repeatedId) return;

//         watchedList.push({
//             id: id
//         });
//         insertToStorageWatched();
//         console.log(watchedList)
//     };

//     if (e.target.classList.contains('queue')) {
//         if (repeatedId) return;

//         queueList.push({
//             id: id
//         });
//         insertToStorageQueue();
//         console.log(queueList)
//     }

// };

// function insertToStorageWatched() {
//     localStorage.setItem('watched movie', JSON.stringify(watchedList));
// };

// function insertToStorageQueue() {
//     localStorage.setItem('added to queue', JSON.stringify(queueList));
// };

// localStorage.clear()
