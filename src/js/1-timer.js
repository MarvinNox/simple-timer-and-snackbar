import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;

const startBttn = document.querySelector("div.timer-box>button");
const inputDate = document.querySelector('#datetime-picker');
const daysSn = document.querySelector('[data-days]');
const hoursSn = document.querySelector('[data-hours]');
const minsSn = document.querySelector('[data-minutes]');
const secsSn = document.querySelector('[data-seconds]');

startBttn.addEventListener('click', handleTimer);
startBttn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            iziToast.error({
                timeout: 4000,
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageSize: '16px',
                messageColor: 'rgb(255, 255, 255)',
            });
        } else {
            userSelectedDate = selectedDates[0] - Date.now();
            startBttn.disabled = false;
        };
        
  },
};

flatpickr("#datetime-picker", options);

function handleTimer() {
    startBttn.disabled = true;
    inputDate.disabled = true;

    const timerIntervID = setInterval(() => {
        if (userSelectedDate > 1000) {
            userSelectedDate -= 1000;
            const { days, hours, minutes, seconds } = convertMs(userSelectedDate);
            daysSn.textContent = addLeadingZero(days);
            hoursSn.textContent = addLeadingZero(hours);
            minsSn.textContent = addLeadingZero(minutes);
            secsSn.textContent = addLeadingZero(seconds);
            
        } else if (userSelectedDate <= 1000) {
            clearInterval(timerIntervID);
            inputDate.disabled = false;
        }
    }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}
