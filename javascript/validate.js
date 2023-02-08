const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//*GET FORMS
const validForms = (objValid) => {
  const forms = Array.from(document.querySelectorAll(objValid.formSelector));
  forms.forEach(validForm => {
    setEventListener(validForm, objValid);
    validForm.addEventListener('input', () => {
    });
  })
}

//*ADD/REMOVE ERRORS (SPANS)
const validElement = (evt, objValid) => {
  const input = evt.target;
  const inputID = input.id;
  const errorElement = document.querySelector(`#${inputID}-error`);
  if (input.validity.valid){
    input.classList.remove(objValid.inputErrorClass);
    errorElement.classList.remove(objValid.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(objValid.inputErrorClass);
    errorElement.classList.add(objValid.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

//*Test on valid input in real
const isInvalid = (inputs) => {
  return inputs.some((inputValids) =>{
    return !inputValids.validity.valid;
  })
}

//*Set/remove class on button(disabled, inactive)
const toggleClassButton = (inputs, button, objValid) => {
  if(isInvalid(inputs)){
    button.classList.add(objValid.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(objValid.inactiveButtonClass);
    button.removeAttribute('disabled', '');
  }
}
//*GET INPUTS and add events on it - add errors and add button disabled
const setEventListener = (validForm, objValid) => {
  const inputs = Array.from(validForm.querySelectorAll(objValid.inputSelector));
  const buttonSubmit = validForm.querySelector(objValid.submitButtonSelector);
  toggleClassButton(inputs, buttonSubmit, objValid);
  inputs.forEach(function(validInput){
    validInput.addEventListener('input', (evt) => {
      validElement(evt, objValid);
      toggleClassButton(inputs, buttonSubmit, objValid);
    })
  })
}

//*run valid
validForms(validation);
