// validate data
const checkUsername = (element) => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = element.value.trim();

    if (!isRequired(username)) {
        showError(element, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(element, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};


const checkEmail = (element) => {
    let valid = false;
    const email = element.value.trim();
    if (!isRequired(email)) {
        showError(element, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(element, 'Email is not valid.')
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const checkPassword = (element) => {
    let valid = false;

    const password = element.value.trim();

    if (!isRequired(password)) {
        showError(element, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(element, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(element);
        valid = true;
    }

    if (!valid){
        element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        element.style.borderColor = "red"
    }
    else {
        element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const checkConfirmPassword = (element, confirm_element) => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirm_element.value.trim();
    const password = element.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirm_element, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirm_element, 'The password does not match');
    } else {
        showSuccess(confirm_element);
        valid = true;
    }

    if (!valid){
        confirm_element.style.boxShadow = "inset 2px 2px 2px red, inset -1px -1px 5px red"
        confirm_element.style.borderColor = "red"
    }
    else {
        confirm_element.style.boxShadow = "inset 2px 2px 2px rgb(110, 110, 110), inset -1px -1px 5px rgb(110, 110, 110)"
        confirm_element.style.borderColor = "rgb(110, 110, 110)"
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

// for form with authent...
const email_authent = document.getElementById('email_authent')
const password_authent = document.getElementById('password_authent')
const form_authent = document.getElementById('form_for_authent')
const error_for_authent = document.getElementById('error_for_authent') //?
var login_button = document.getElementById('button-login') //?



form_authent.addEventListener('submit', (e) =>
{
    e.preventDefault()

    let isEmailValid = checkEmail(email_authent),
        isPasswordValid = checkPassword(password_authent);

    let isFormValid = isEmailValid &&
        isPasswordValid;

    if (isFormValid){

    }
})

form_authent.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email_authent':
            checkEmail(email_authent);
            break;
        case 'password_authent':
            checkPassword(password_authent);
            break;
    }
}));

// form with registration

const email_reg = document.getElementById('email_reg')
const username_reg = document.getElementById('username_reg')
const password_reg = document.getElementById('password_reg')
const rep_password_reg = document.getElementById('rep_password_reg')
const form_for_registration = document.getElementById('form_for_register')

var reg_button = document.getElementById('reg_button')

form_for_registration.addEventListener('submit', (e) => {
    e.preventDefault()

    let isUsernameValid = checkUsername(username_reg),
        isEmailValid = checkEmail(email_reg),
        isPasswordValid = checkPassword(password_reg),
        isConfirmPasswordValid = checkConfirmPassword(password_reg, rep_password_reg);

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid){

    }
})

form_for_registration.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username_reg':
            checkUsername(username_reg);
            break;
        case 'email_reg':
            checkEmail(email_reg);
            break;
        case 'password_reg':
            checkPassword(password_reg);
            break;
        case 'rep_password_reg':
            checkConfirmPassword(password_reg, rep_password_reg);
            break;
    }
}));