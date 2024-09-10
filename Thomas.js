const partyDateInput = document.querySelectorAll('.edit-party-modal .modal-body div')[1];
const partyNameEL = document.querySelector('main > h2');
const partyDateEl = document.querySelector("#time-set");
const editPartySaveBtn = document.querySelector('.edit-party-modal .modal-footer .btn-primary');
const partyNameModalEl = document.querySelectorAll('.edit-party-modal .modal-body div')[0];
const addGuestButton = document.querySelector('main > button')






//Open Add Guest Model
addGuestButton.onclick = function() {
    editGuestInfo =false; //reset to adding a new guest
    modalGuestNameInput.value = ''; //clear modal input fields
    addPersonModal.style.display = 'block';
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
