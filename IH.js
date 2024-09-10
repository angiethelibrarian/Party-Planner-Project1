const partyNameEl = document.querySelector("main > h2");
const timeSetEl = document.querySelector("#time-set");

let listOfPeopleContainerEl = document.querySelector(".list-of-people");
let listOfPeople = document.querySelectorAll(".list-of-people > li");

const listOfPeopleEditBtn = document.querySelectorAll(".list-of-people > li > button:first-of-type");
const listOfPeopleRemoveBtn = document.querySelectorAll(".list-of-people > li > button.remove-person");

const resetModal = document.querySelector(".reset-modal");



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
    timeSetEl.textContent = "MM/DD/YY";
    listOfPeopleContainerEl.innerHTML = "";
    // hide modal
    resetSPI();
};



// ^^^ Modal Functions ^^^
// --------------------------------
// vvv page functionality vvv 



// if there is no data stored then setsup default data, (unfinished) but if there is data then update the html with the stored data
if(localStorage.getItem("partyPlannerData") === null) {
    resetSPI();
}else {

};


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



