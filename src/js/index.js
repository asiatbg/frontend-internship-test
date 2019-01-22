/* Here goes your JS code */
const showPopupForm = document.getElementById('show-popup-form');
const closeBtn = document.getElementById('closeBtn');
const popupContainer = document.getElementById('popupContainer');

showPopupForm.addEventListener('click', () => {
    popupContainer.style.display = "block";
    showPopupForm.style.display = "none";
});

closeBtn.addEventListener('click', () => {
    popupContainer.style.display = "none";
    showPopupForm.style.display = "block";
});