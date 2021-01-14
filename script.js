let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear any timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes} : ${remainderSeconds < 10 ? '0'+remainderSeconds : remainderSeconds }`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const min = end.getMinutes();
    const sec = end.getSeconds();

    endTime.textContent = `Be Back At ${hour < 10 ? '0'+ hour : hour}: ${min < 10 ? '0' + min : min}: ${sec < 10 ? '0'+sec : sec}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time));
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})