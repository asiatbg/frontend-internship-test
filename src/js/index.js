const showPopupForm = document.getElementById('show-popup-form');
const closeBtn = document.getElementById('closeBtn');
const popupContainer = document.getElementById('popupContainer');
const password = document.forms['loginForm']['password'];
const email = document.forms['loginForm']['email'];
const checkboxForm = document.getElementById('checkboxForm');
const loginForm = document.getElementById('loginForm');
const successMessage = document.getElementById('successMessage');



showPopupForm.addEventListener('click', () => {
    popupContainer.style.display = "block";
    showPopupForm.style.display = "none";
});

closeBtn.addEventListener('click', () => {
    removeTooltips();

    popupContainer.style.display = "none";
    showPopupForm.style.display = "block";
});

password.addEventListener('keypress', (e) => {
    if (password.nextSibling.className === 'tooltipText') {
        password.nextSibling.remove();
        password.classList.remove('errorValidationInput', 'tooltip');
    }
    password.classList.remove('errorValidationInput', 'tooltip');
});

email.addEventListener('keypress', (e) => {
    if (email.nextSibling.className === 'tooltipText') {
        email.nextSibling.remove();
        email.classList.remove('errorValidationInput', 'tooltip');
    }
});

checkboxForm.addEventListener('change', () => {
    checkboxForm.nextElementSibling.classList.remove('errorValidationCheckbox');

});

loginForm.addEventListener('submit', (e) => {
    removeTooltips();

    e.preventDefault();
    let areInputsValid = true;
    if (!password.value) {
        password.focus();
        areInputsValid = false;

        createTooltip(password, "Password cannot be blank!");

    } else if (!passwordValidation(password.value)) {
        password.focus();
        areInputsValid = false;

        createTooltip(password, "Password must contain at least \
            1 lower case letter, 1 special character, 1 upper case letter, 1 numeric character and be at least 8 characters in length.");
    }
    if (!email.value) {
        email.focus();
        areInputsValid = false;

        createTooltip(email, "Email cannot be blank!");

    } else if (!emailValidation(email.value)) {
        email.focus();
        areInputsValid = false;

        createTooltip(email, "Email format is invalid!");
    }
    if (!checkboxForm.checked) {
        areInputsValid = false;
        checkboxForm.nextElementSibling.classList.add('errorValidationCheckbox');
    }
    if (!areInputsValid) {
        return false;
    } else {
        setTimeout(() => {
            popupContainer.style.display = 'none';
            successMessage.style.display = 'block';
            return true;
        }, 3000);

    }

});

const passwordValidation = (password) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(password);
}


const emailValidation = (email) => {
    const regex = new RegExp("[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+");
    return regex.test((email));
}

const createTooltip = (element, tooltipText) => {
    element.classList.add('errorValidationInput', 'tooltip');
    const newSpan = document.createElement("span");
    newSpan.setAttribute('class', 'tooltipText');
    newSpan.textContent = tooltipText;
    element.parentNode.insertBefore(newSpan, element.nextSibling);
}

const removeAdditionalClassAndElement = (tooltipText) => {
    for (let index = tooltipText.length - 1; index >= 0; index--) {
        tooltipText[index].parentNode.removeChild(tooltipText[index]);
    }
    email.classList.remove('errorValidationInput', 'tooltip');
    password.classList.remove('errorValidationInput', 'tooltip');
    checkboxForm.nextElementSibling.classList.remove('errorValidationCheckbox');

}

const removeTooltips = () => {
    let tooltips = document.getElementsByClassName('tooltipText');
    if (tooltips.length !== 0) {
        removeAdditionalClassAndElement(tooltips);
    }
}