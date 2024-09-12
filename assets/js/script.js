const partyNameEl = document.querySelector("main > h2");
const partyDateEl = document.querySelector("#time-set");

let listOfPeopleContainerEl = document.querySelector(".list-of-people");
let listOfPeople = document.querySelectorAll(".list-of-people > li");

const listOfPeopleEditBtn = document.querySelectorAll(".list-of-people > li > button:first-of-type");
const listOfPeopleRemoveBtn = document.querySelectorAll(".list-of-people > li > button.remove-person");

const resetModal = document.querySelector(".reset-modal");


const partyDateInput = document.querySelectorAll('.edit-party-modal .modal-body div')[1];
const editPartySaveBtn = document.querySelector('.edit-party-modal .modal-footer .btn-primary');
const partyNameModalEl = document.querySelectorAll('.edit-party-modal .modal-body div')[0];
const addGuestButton = document.querySelector('main > button')
//const modalAssignmentsInput = addPersonModal.querySelector();






const ePI = document.querySelector('#EPI');
const reset = document.querySelector('#reset')
const addGuest = document.querySelector('#addGuest')
const addBtn = document.querySelector('.add-person-modal .modal-body .btn-success')

const mCloseBtn = document.querySelector('.reset-modal .btn-secondary')
const mAllCloseBtn = document.querySelectorAll('.modal .btn-secondary, .modal .btn-dark')

const modalClose = document.querySelector('.reset-modal .btn-secondary')
const mEPI = document.querySelector('.edit-party-modal')
const mAddGuest = document.querySelector('.add-person-modal')
const cAddBtn = document.querySelector('.btn-success')

const personName = document.querySelector('#person');
const assignments = document.querySelector('#assign');
let people = [];






// for use of editing a guest info. the same modal will be used for a new guest and editing one so this is to help keep track which one is happening so the proper funcitons can be called
let editingGuestInfo = false;


// sets data to default data
function resetSPI () {
    localStorage.setItem("partyPlannerData", JSON.stringify({
        partyName: "Party Name",
        partyDate: "MM/DD/YY",
        guestList: [],
    }));
};

// edit localtStorage party name and date
function editMainSPI(pName, pDate) {
    const partyInfo = JSON.parse(localStorage.getItem("partyPlannerData"));
    partyInfo.partyName = pName;
    partyInfo.partyDate = pDate;
    localStorage.setItem("partyPlannerData", JSON.stringify(partyInfo));
};

// add a guest to the localStorage
function addGuestSPI(newGuestName, newGuestAssignments) {
    const partyInfo = JSON.parse(localStorage.getItem("partyPlannerData"));
    partyInfo.guestList.push({guestName: newGuestName, assignments: newGuestAssignments,});
    localStorage.setItem("partyPlannerData", JSON.stringify(partyInfo));
};

// edit a selected guest data in localtStorage using the index
function editGuestSPI(guestIndex, editedGuestName, editedGuestAssignments) {
    const partyInfo = JSON.parse(localStorage.getItem("partyPlannerData"));
    partyInfo.guestList[guestIndex] = ({guestName: editedGuestName, assignments: editedGuestAssignments,});
    localStorage.setItem("partyPlannerData", JSON.stringify(partyInfo));
};

// remove selected guest from localStorage using index
function removeGuestSPI(guestIndex) {
    const partyInfo = JSON.parse(localStorage.getItem("partyPlannerData"));
    partyInfo.guestList.splice(guestIndex, 1);
    localStorage.setItem("partyPlannerData", JSON.stringify(partyInfo));
};



// ^^^ LocalStorage Funtions ^^^
// --------------------------------
// vvv Modal Functions vvv 
  
function resetAllPartyInfo() {
    partyNameEl.textContent = "Party Name";
    partyDateEl.textContent = "MM/DD/YY";
    listOfPeopleContainerEl.innerHTML = "";
    // hide modal
    resetSPI();
};








//Open Add Guest Model
addGuestButton.onclick = function() {
    editGuestInfo =false; //reset to adding a new guest
    modalGuestNameInput.value = ''; //clear modal input fields
    addPersonModal.style.display = 'block';
}

// // Open the modal to edit a guest's information
// function openEditGuestModal(guestIndex, guestName, guestAssignments) {
//     editingGuestInfo = true;
//     modalGuestNameInput.value = guestName;  // Prefill guest name
//     modalAssignmentsInput.innerHTML = guestAssignments.map(item => `<li>${item}</li>`).join('');
//     addPersonModal.style.display = 'block';

//       // Save changes
//       addPersonModal.querySelector().onclick = function() {
//         const updatedName = modalGuestNameInput.value;
//         const updatedAssignments = Array.from(modalAssignmentsInput.querySelectorAll('li')).map(li => li.textContent);
//         editGuestSPI(guestIndex, updatedName, updatedAssignments);
//         addPersonModal.style.display = 'none';
//         //local storage function;
//     };
// }

//Reset the Party modal
function resetEditPartyModal() {
    partyNameModalEl.querySelector('input').value = '';
    partyDateInput.querySelector('input').value = '';

}







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
    showModal(resetModal);
}); 

ePI.addEventListener('click', function() {
    showModal(mEPI);
}); 

addGuest.addEventListener('click', function() {
    showModal(mAddGuest);
});


// function getPersonInfo() {
//     const storedPersonInfo = JSON.parse(localStorage.getItem('personInfo'));
    
//     if (storedPersonInfo !== null) {
//         people = storedPersonInfo;
//     }
    
//     console.log(`Person Name: ${storedPersonInfo.personName}` + `  Assignments: ${storedPersonInfo.assignments}`);
    
// };



function storePersonInfo(event) {
    // event.preventDefault();

    editMainSPI(personName.value.trim(), assignments.value.trim());


    // getPersonInfo();

}




// function getPersonInfo() {
//     const info = JSON.parse(localStorage.getItem('personInfo'));
// }


// function renderPersonInfo() {
// const info = JSON.parse(localStorage.getItem('personInfo'));

// if (info !== null) {
// console.log(`Person Name: ${info.person_name}` + `  Assignments: ${info.assignments}`);
// }

// }







// ^^^ Modal Functions ^^^
// --------------------------------
// vvv page functionality vvv 



// if there is no data stored then setsup default data, (unfinished) but if there is data then update the html with the stored data
if(localStorage.getItem("partyPlannerData") === null) {
    resetSPI();
}else {

};





//Open Edit Party Info Modal
editPartySaveBtn.addEventListener("click", function() {
    const newPartyName = partyNameModalEl.querySelector('input').value;
    const [mm, dd, yy] = partyDateInput.querySelector('input').value.split('/');
    partyNameEL.textContent = newPartyName;
    partyDateEl.textContent = mm + '/' + dd + '/' + yy;
    //Edit localstorage function goes here
    //Hide Modal function goes here
    resetEditPartyModal();
})





// unfinished
for(let i = 0; i < listOfPeopleEditBtn.length; i++){
    listOfPeopleEditBtn[i].addEventListener("click", function(e) {
        editingGuestInfo = true;
        const parentLiElement = e.target.parentElement;
        const liElementIndex = Array.from(listOfPeople).indexOf(parentLiElement);


        console.log(parentLiElement);
        console.log(liElementIndex);
    });
}


// remove the selected li element from the .list-of-people ul
for(let i = 0; i < listOfPeopleRemoveBtn.length; i++){
    listOfPeopleRemoveBtn[i].addEventListener("click", function(e) {
        const parentLiElement = e.target.parentElement;
        const liElementIndex = Array.from(listOfPeople).indexOf(parentLiElement);

        removeGuestSPI(liElementIndex);
        parentLiElement.remove();
        listOfPeople = document.querySelectorAll(".list-of-people > li");
    });
}

resetModal.querySelector(".modal-footer .btn-danger").addEventListener("click", resetAllPartyInfo);;




addBtn.addEventListener('click', storePersonInfo);




for (let i = 0; i < mAllCloseBtn.length; i++){
    mAllCloseBtn[i].addEventListener('click', function() {
        hideModal(mAllCloseBtn[i].parentElement.parentElement.parentElement.parentElement);
})};

// init();
































const partyDateInput = document.querySelectorAll('.edit-party-modal .modal-body div')[1];
const partyNameEL = document.querySelector('main > h2');
const partyDateEl = document.querySelector("#time-set");
const editPartySaveBtn = document.querySelector('.edit-party-modal .modal-footer .btn-primary');
const partyNameModalEl = document.querySelectorAll('.edit-party-modal .modal-body div')[0];
const addGuestButton = document.querySelector('main > button')
const addTaskButton = document.querySelector('.add-task-btn'); // Add Task button reference
const taskListEl = document.querySelector('.task-list'); // Task list container
//const modalAssignmentsInput = addPersonModal.querySelector();

let editGuestInfo = true;
const modalGuestNameInput = document.querySelector('.guest-modal input[name="guest-name"]');
const modalAssignmentsInput = document.querySelector('.guest-modal ul');
const addPersonModal = document.querySelector('.guest-modal');



//Open Add Guest Model
addGuestButton.onclick = function() {
    editGuestInfo =false; //reset to adding a new guest
    modalGuestNameInput.value = ''; //clear modal input fields
    addPersonModal.style.display = 'block';


}
// Open Edit Guest Modal
addPersonModal.querySelector('.modal-footer .btn-success').onclick = function() {
    const updatedName = modalGuestNameInput.value;
    const updatedAssignments = Array.from(modalAssignmentsInput.querySelectorAll('li')).map(li => li.textContent);
    editGuestSPI(guestIndex, updatedName, updatedAssignments);
    hideModal(addPersonModal);


    // Local storage function would go here
}

    // Reset the Party modal
function resetEditPartyModal() {
    partyNameModalEl.querySelector('input').value = '';
    partyDateInput.querySelector('input').value = '';
    taskListEl.innerHTML = ''; // Clear task list when resetting
}

    // Add task to the task list
addTaskButton.addEventListener('click', function() {
const taskInput = document.querySelector('.task-input'); // Task input field
const task = taskInput.value;
if (task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task;
    taskListEl.appendChild(taskItem);
    taskInput.value = ''; // Clear input after adding
}
});

// // Open the modal to edit a guest's information
// function openEditGuestModal(guestIndex, guestName, guestAssignments) {
//     editingGuestInfo = true;
//     modalGuestNameInput.value = guestName;  // Prefill guest name
//     modalAssignmentsInput.innerHTML = guestAssignments.map(item => `<li>${item}</li>`).join('');
//     addPersonModal.style.display = 'block';

//       // Save changes
//       addPersonModal.querySelector().onclick = function() {
//         const updatedName = modalGuestNameInput.value;
//         const updatedAssignments = Array.from(modalAssignmentsInput.querySelectorAll('li')).map(li => li.textContent);
//         editGuestSPI(guestIndex, updatedName, updatedAssignments);
//         addPersonModal.style.display = 'none';
//         //local storage function;
//     };


      // AM: updated from above Save changes
      addPersonModal.querySelector('.modal-footer .btn-success').onclick = function() {
        const updatedName = modalGuestNameInput.value;
        const updatedAssignments = Array.from(modalAssignmentsInput.querySelectorAll('li')).map(li => li.textContent);
        editGuestSPI(guestIndex, updatedName, updatedAssignments);
        addPersonModal.style.display = 'none';
        //local storage function would go here
    };



//Reset the Party modal
function resetEditPartyModal() {
    partyNameModalEl.querySelector('input').value = '';
    partyDateInput.querySelector('input').value = '';

}

//Open Edit Party Info Modal
editPartySaveBtn.addEventListener("click", function() {
    const newPartyName = partyNameModalEl.querySelector('input').value;
    const [mm, dd, yy] = partyDateInput.querySelector('input').value.split('/');
    partyNameEL.textContent = newPartyName;
    partyDateEl.textContent = mm + '/' + dd + '/' + yy;
    //Edit localstorage function goes here
    //Hide Modal function goes here
    resetEditPartyModal();
})

console.log(partyDateInput);