const EPI = document.querySelector('#EPI');
const reset = document.querySelector('#reset')

const mReset = document.querySelector('.reset-modal')

const showModal = function(modalEl) {
    modalEl.style.display = "inline";
}

EPI.addEventListener('click', function() {
    if (EPI < 1) {
        EPI++;

    }
    let EPI = localStorage.getItem('EPI')
}); 

function resetLocalStorageItem(){
    localStorage.removeItem('reset')
}

reset.addEventListener('click', function() {
    showModal(mReset);
}); 

console.log(EPI)