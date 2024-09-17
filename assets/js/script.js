// Main Party Info Elements
const partyNameEl = document.querySelector("main > h2");
const partyDateEl = document.querySelector("#time-set");


// Main Party Buttons
const EPIBtn = document.querySelector('#EPI');
const resetBtn = document.querySelector('#reset');
const addGuestBtn = document.querySelector('#addGuest');


// List Of People Elements
const listOfPeopleContainerEl = document.querySelector(".list-of-people");
let listOfPeople = document.querySelectorAll(".list-of-people > li");
let listOfPeopleEditBtn = document.querySelectorAll(".list-of-people > li > button:first-of-type");
let listOfPeopleRemoveBtn = document.querySelectorAll(".list-of-people > li > button.remove-person");


// Modals
const resetModal = document.querySelector(".reset-modal");
const EPIModal = document.querySelector('.edit-party-modal');
const addGuestModal = document.querySelector('.add-person-modal');


// All Modal Close Buttons
const resetModalCloseBtns = document.querySelectorAll('.reset-modal .btn-secondary, .modal .btn-dark');
const EPIModalCloseBtns = document.querySelectorAll('.edit-party-modal .btn-secondary, .modal .btn-dark');
const addGuestModalCloseBtns = document.querySelectorAll('.add-person-modal .btn-secondary, .modal .btn-dark');


// Reset Modal Elements
const resetModalBtn = document.querySelector(".reset-modal .modal-footer .btn-danger");


// Edit Party Info (EPI) Modal Elements
const EPIPartyNameInput = document.querySelectorAll('.edit-party-modal .modal-body div')[0].querySelector("input");
const EPIPartyDateInputs = document.querySelectorAll('.edit-party-modal .modal-body div')[1].querySelectorAll("div > input");
const EPISaveChangesBtn = document.querySelector('.edit-party-modal .modal-footer .btn-primary');


// Add Guest Modal Elements
const addGuestPersonNameInput = document.querySelectorAll('.add-person-modal .modal-body div')[0].querySelector("input");
const addGuestPartyTaskInput = document.querySelectorAll('.add-person-modal .modal-body div')[1].querySelector("input");
const addGuestPartyTaskAddBtn = document.querySelectorAll('.add-person-modal .modal-body div')[1].querySelector("* > button");
const addGuestPartyTaskList = document.querySelectorAll('.add-person-modal .modal-body div')[1].querySelector("ul");
const addGuestSaveChangesBtn = document.querySelector('.add-person-modal .modal-footer .btn-primary');



// for use of editing a guest info. the same modal will be used for a new guest and editing one so this is to help keep track which one is happening so the proper funcitons can be called
let editingGuestInfo = [false, 0];



// ^^^ Elements and Variables ^^^
// --------------------------------
// vvv LocalStorage Funtions vvv 



// sets data to default data
function resetSPI() {
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
// vvv List Of Guest Functions vvv 
  


// add new guest list element
function addGuestLiEl(gName, assignments) {
    let totalGuestAssignments = "";
    for(let i = 0; i < assignments.length; i++) {
            totalGuestAssignments += `
            <li>${assignments[i]}</li>
        `;
    }
    
    const newLiEl = document.createElement("li");
    newLiEl.classList = "row m-0 px-0";
    newLiEl.innerHTML = `
                <div class="col-10">
                    <p class="person-name">${gName}</p>
                    <p class="assignment-toggle text-left">Party Tasks:</p>
                    <ul class="assignment-list text-left">
                        ${totalGuestAssignments}
                    </ul>
                </div>
                <button class="col-1 p-0"><img src="./assets/images/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="edit icon"></button>
                <button class="col-1 p-0 remove-person">X</button>
            `;

    listOfPeopleContainerEl.appendChild(newLiEl);

    newLiEl.querySelector("button:first-of-type").addEventListener("click", function(e) {
        const parentLiElement = e.target.parentElement;
        const liElementIndex = Array.from(listOfPeopleContainerEl.querySelectorAll("* > li")).indexOf(parentLiElement);
        editingGuestInfo[0] = true;
        editingGuestInfo[1] = liElementIndex;
        
        addGuestPersonNameInput.value = parentLiElement.querySelector(".person-name").textContent;
        
        for(let i = 0; i < parentLiElement.querySelectorAll(".assignment-list > li").length; i++){
            const newPartyTaskEl = document.createElement("li");
            newPartyTaskEl.classList = "row text-left border-bottom border-dark my-1 mx-0 py-1 px-0";
            newPartyTaskEl.innerHTML =`
                <p class="col-9">${parentLiElement.querySelectorAll(".assignment-list > li")[i].textContent}</p>
                <button class="col-2 btn btn-danger"></button>
                `;
            addGuestPartyTaskList.appendChild(newPartyTaskEl);
        
            newPartyTaskEl.querySelector("button").addEventListener("click", function(e) {
                e.target.parentElement.remove();
            });
        }

        showModal(addGuestModal);
    });

    newLiEl.querySelector("button.remove-person").addEventListener("click", function(e) {
        const parentLiElement = e.target.parentElement;
        const liElementIndex = Array.from(listOfPeople).indexOf(parentLiElement);
        removeGuestSPI(liElementIndex);
        parentLiElement.remove();
    });

    listOfPeople = document.querySelectorAll(".list-of-people > li");
};

// edit existing guest list element
function editGuestLiEl(guestIndex, gName, assignments) {
    let totalGuestAssignments = "";
    for(let i = 0; i < assignments.length; i++) {
            totalGuestAssignments += `
            <li>${assignments[i]}</li>
        `;
    }
    const selectedLiEl = listOfPeopleContainerEl.querySelectorAll("* > li")[guestIndex];

    selectedLiEl.querySelector(".person-name").textContent = gName;
    selectedLiEl.querySelector(".assignment-list").innerHTML = totalGuestAssignments;
};




// ^^^ List Of Guest Funtions ^^^
// --------------------------------
// vvv Modal Functions vvv



function showModal(modalEl) {
    modalEl.style.display = "inline";
}

function hideModal(modalCl) {
    modalCl.style.display = "none";
}



// Reset Modal Functions
function resetAllPartyInfo() {
    partyNameEl.textContent = "Party Name";
    partyDateEl.textContent = "MM/DD/YY";
    listOfPeopleContainerEl.innerHTML = "";
    hideModal(resetModal);
    resetSPI();
};



// Edit Party Info (EPI) Modal Functions
function resetEPIModal() {
    EPIPartyNameInput.value = "";
    for(let i = 0; i < EPIPartyDateInputs.length; i++) {
        EPIPartyDateInputs[i].value = "";
    }
}

function initEPIModal () {
    const currentPartyDate = partyDateEl.textContent.split("/");
    EPIPartyNameInput.value = partyNameEl.textContent;
    EPIPartyDateInputs[0].value = currentPartyDate[0];
    EPIPartyDateInputs[1].value = currentPartyDate[1];
    EPIPartyDateInputs[2].value = currentPartyDate[2];
};

function applyEPIModalChanges() {
    const newPartyName = EPIPartyNameInput.value;
    const mm = EPIPartyDateInputs[0].value;
    const dd = EPIPartyDateInputs[1].value;
    const yy = EPIPartyDateInputs[2].value;
    partyNameEl.textContent = newPartyName;
    partyDateEl.textContent = mm + '/' + dd + '/' + yy;
    hideModal(EPIModal);
    editMainSPI(newPartyName, (mm + '/' + dd + '/' + yy));
    resetEPIModal();
}



// Add Guest Modal Functions
function resetAddGuestModal() {
    addGuestPersonNameInput.value = "";
    addGuestPartyTaskInput.value = "";
    addGuestPartyTaskList.innerHTML = "";
};

function addTaskAddGuestModal() {
    const newPartyTaskEl = document.createElement("li");
    newPartyTaskEl.classList = "row text-left border-bottom border-dark my-1 mx-0 py-1 px-0";
    newPartyTaskEl.innerHTML =`
        <p class="col-9">${addGuestPartyTaskInput.value}</p>
        <button class="col-2 btn btn-danger">X</button>
        `;
    addGuestPartyTaskList.appendChild(newPartyTaskEl);

    newPartyTaskEl.querySelector("button").addEventListener("click", function(e) {
        e.target.parentElement.remove();
    });

    addGuestPartyTaskInput.value = "";
};


function applyGuestModalChanges() {
    const allPartyTasks = [];
    for(let i = 0; i < addGuestPartyTaskList.querySelectorAll("li").length; i++){
        allPartyTasks.push(addGuestPartyTaskList.querySelectorAll("li > p")[i].textContent);
    }
    if(editingGuestInfo[0]) {
        editGuestLiEl(editingGuestInfo[1], addGuestPersonNameInput.value, allPartyTasks);
        editGuestSPI(editingGuestInfo[1], addGuestPersonNameInput.value, allPartyTasks);
    }else {
        addGuestLiEl(addGuestPersonNameInput.value, allPartyTasks);
        addGuestSPI(addGuestPersonNameInput.value, allPartyTasks);
    }
    hideModal(addGuestModal);
    resetAddGuestModal();
};



// ^^^ Modal Functions ^^^
// --------------------------------
// vvv page functionality vvv 





// if there is no data stored then setsup default data, (unfinished) but if there is data then update the html with the stored data
if(localStorage.getItem("partyPlannerData") === null) {
    resetSPI();
}else {
    const collectedSPI = JSON.parse(localStorage.getItem("partyPlannerData"));
    partyNameEl.textContent = collectedSPI.partyName;
    partyDateEl.textContent = collectedSPI.partyDate;
    for(let i = 0; i < collectedSPI.guestList.length; i++){
        addGuestLiEl(collectedSPI.guestList[i].guestName, collectedSPI.guestList[i].assignments);
    }
};



resetBtn.addEventListener('click', function() {
    showModal(resetModal);
}); 

EPIBtn.addEventListener('click', function() {
    initEPIModal();
    showModal(EPIModal);
}); 

addGuestBtn.addEventListener('click', function() {
    editingGuestInfo[0] = false;
    showModal(addGuestModal);
});



// Applying Reset Modal Functions
resetModalBtn.addEventListener("click", resetAllPartyInfo);

for (let i = 0; i < resetModalCloseBtns.length; i++){
    resetModalCloseBtns[i].addEventListener('click', function() {
        hideModal(resetModalCloseBtns[i].parentElement.parentElement.parentElement.parentElement);
})};



// Applying Edit Party Info (EPI) Modal Functions
EPISaveChangesBtn.addEventListener("click", applyEPIModalChanges);

for (let i = 0; i < EPIModalCloseBtns.length; i++){
    EPIModalCloseBtns[i].addEventListener('click', function() {
        hideModal(EPIModalCloseBtns[i].parentElement.parentElement.parentElement.parentElement);
        resetEPIModal();
})};



// Applying Add Guest Modal Functions
addGuestSaveChangesBtn.addEventListener("click", applyGuestModalChanges);
addGuestPartyTaskAddBtn.addEventListener("click", addTaskAddGuestModal);

for (let i = 0; i < addGuestModalCloseBtns.length; i++){
    addGuestModalCloseBtns[i].addEventListener('click', function() {
        hideModal(addGuestModalCloseBtns[i].parentElement.parentElement.parentElement.parentElement);
        resetAddGuestModal();
})};
