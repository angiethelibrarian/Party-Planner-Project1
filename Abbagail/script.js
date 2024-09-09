const ePI = document.querySelector('#EPI');
const reset = document.querySelector('#reset')
const addGuest = document.querySelector('#addGuest')
const addBtn = document.querySelector('#addBtn')

const mCloseBtn = document.querySelector('.reset-modal .btn-secondary')
const mAllCloseBtn = document.querySelectorAll('.modal .btn-secondary, .modal .btn-dark')
const mReset = document.querySelector('.reset-modal')
const modalClose = document.querySelector('.reset-modal .btn-secondary')
const mEPI = document.querySelector('.edit-party-modal')
const mAddGuest = document.querySelector('.add-person-modal')
const cAddBtn = document.querySelector('.btn-success')

const personName = document.querySelector('#person');
const assignments = document.querySelector('#assign');
let people = [];

const showModal = function(modalEl) {
    modalEl.style.display = "inline";
}

const hideModal = function(modalCl) {
    modalCl.style.display = "none";
    // console.log(modalCl);
}

function resetLocalStorageItem(){
    localStorage.clear()
}

reset.addEventListener('click', function() {
    showModal(mReset);
}); 

ePI.addEventListener('click', function() {
    showModal(mEPI);
}); 

addGuest.addEventListener('click', function() {
    showModal(mAddGuest);
});



addBtn.addEventListener('click', function storePersonInfo(event) {
    event.preventDefault();

    let personInfo = {
        personName: personName.value.trim(),
        assignments: assignments.value.trim(),
    }

    localStorage.setItem('personInfo', JSON.stringify(personInfo));

    getPersonInfo();

});


function getPersonInfo() {
    const storedPersonInfo = JSON.parse(localStorage.getItem('personInfo'));
    
    if (storedPersonInfo !== null) {
        people = storedPersonInfo;
    }
    
    console.log(`Person Name: ${storedPersonInfo.personName}` + `  Assignments: ${storedPersonInfo.assignments}`);
    
};
// function getPersonInfo() {
//     const info = JSON.parse(localStorage.getItem('personInfo'));
// }


// function renderPersonInfo() {
// const info = JSON.parse(localStorage.getItem('personInfo'));

// if (info !== null) {
// console.log(`Person Name: ${info.person_name}` + `  Assignments: ${info.assignments}`);
// }

// }

for (let i = 0; i < mAllCloseBtn.length; i++){
    mAllCloseBtn[i].addEventListener('click', function() {
        hideModal(mAllCloseBtn[i].parentElement.parentElement.parentElement.parentElement);
})};

// init();