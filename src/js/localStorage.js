const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
const modalMovieCard = document.querySelector('.modal-movie-card');

const watchedList = [];
const queueList = [];


modalMovieCard.addEventListener('click', onModalMovieCard);
// queueBtn.addEventListener('click', onQueueBtn);
// watchedBtn.addEventListener('click', onWatchedBtn)


function onModalMovieCard(e) {
    e.preventDefault();

    let id = e.currentTarget.dataset.id;
    let repeatedId = watchedList.some(el => el.id === id);

    if (e.target.classList.contains('watched')) {
        if (repeatedId) return;

        watchedList.push({
            id: id
        });
        insertToStorageWatched();
        console.log(watchedList)
    };
    
    if (e.target.classList.contains('queue')) {
        if (repeatedId) return;

        queueList.push({
            id: id
        });
        insertToStorageQueue();
        console.log(queueList)
    }

};






function insertToStorageWatched() {
    localStorage.setItem('watched movie', JSON.stringify(watchedList));
};

function insertToStorageQueue() {
    localStorage.setItem('added to queue', JSON.stringify(queueList));
};



// localStorage.clear()


