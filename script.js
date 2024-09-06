const EPI = document.querySelector('#EPI');
const reset = 0

const mReset = document.querySelector('.reset-modal')

const modal = function(modalEl) {
    modalEl.style.display = "inline";
}

modal(mReset);

EPI.addEventListener('click', function() {
    if (EPI < 1) {
        EPI++;

    }
    let EPI = localStorage.getItem('EPI')
}); 

function resetLocalStorageItem(){
    localStorage.removeItem('reset')
    reset = 1
}
reset.addEventListener('click', function() {
    if (reset < 1) {
        resetLocalStorageItem()
        return reset;
    }
    let reset = localStorage.clear('reset')
}); 

console.log(reset)
console.log(EPI)