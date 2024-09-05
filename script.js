const EPI = document.querySelector('#EPI');
const reset = 0

EPI.addEventListener('click', function() {
    if (EditPartyInfo < 1) {
        EditPartyInfo++;

    }
    let EditPartyInfo = localStorage.getItem('EditPartyInfo')
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