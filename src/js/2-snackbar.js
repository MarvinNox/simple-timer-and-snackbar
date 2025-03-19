import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

    iziToast.settings({
        timeout: 3000,
        position: 'topRight',
        icon: '',
    });

form.addEventListener('submit', formSubmit);


function formSubmit(event) {

    event.preventDefault();
    const checkedBttn = form.querySelector('input[name="state"]:checked');
    const delay = event.target.elements.delay.value;
    
    function makePromise ({ delay, shouldResolve }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
			    if(shouldResolve.value === 'fulfilled') {
                    resolve(`✅ Fulfilled promise in ${delay}ms`)
			    } else {
                    reject(`❌ Rejected promise in ${delay}ms`)
			    }
		    }, delay);
        });
    };

    makePromise({ delay: delay, shouldResolve: checkedBttn })
        .then(
            value => {
                iziToast.success({
                    message: value,
            });
            }
        )
        .catch(error => {
            iziToast.error({
                message: error,
            });
            }
        );
};