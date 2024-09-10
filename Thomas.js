const partyDateInput = document.querySelectorAll('.edit-party-modal .modal-body div')[1];
const partyNameEL = document.querySelector('main > h2');
const partyDateEl = document.querySelector("#time-set");
const editPartySaveBtn = document.querySelector('.edit-party-modal .modal-footer .btn-primary');
const partyNameModalEl = document.querySelectorAll('.edit-party-modal .modal-body div')[0];
const addGuestButton = document.querySelector('main > button')
const modalAssignmentsInput = addPersonModal.querySelector();





//Open Add Guest Model
addGuestButton.onclick = function() {
    editGuestInfo =false; //reset to adding a new guest
    modalGuestNameInput.value = ''; //clear modal input fields
    addPersonModal.style.display = 'block';
}

// Open the modal to edit a guest's information
function openEditGuestModal(guestIndex, guestName, guestAssignments) {
    editingGuestInfo = true;
    modalGuestNameInput.value = guestName;  // Prefill guest name
    modalAssignmentsInput.innerHTML = guestAssignments.map(item => `<li>${item}</li>`).join('');
    addPersonModal.style.display = 'block';

      // Save changes
      addPersonModal.querySelector().onclick = function() {
        const updatedName = modalGuestNameInput.value;
        const updatedAssignments = Array.from(modalAssignmentsInput.querySelectorAll('li')).map(li => li.textContent);
        editGuestSPI(guestIndex, updatedName, updatedAssignments);
        addPersonModal.style.display = 'none';
        //local storage function;
    };
}

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
