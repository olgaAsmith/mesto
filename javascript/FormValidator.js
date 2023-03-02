export default class FormValidator {
  constructor(config, form) {
    this._config = config,
    this._form = form
  }

  enableValidation() {
    this._setEventListener();
    this._form.addEventListener('input', () => {
    });
  }

  _validElement(evt) {//*red errors
    this._input = evt.target;
    this._inputID = this._input.id;
    this._config.errorElement = document.querySelector(`#${this._inputID}-error`);
    if (this._input.validity.valid){
      this._input.classList.remove(this._config.inputErrorClass);
      this._config.errorElement.classList.remove(this._config.errorClass);
      this._config.errorElement.textContent = '';
    } else {
      this._input.classList.add(this._inputErrorClass);
      this._config.errorElement.classList.add(this._config.errorClass);
      this._config.errorElement.textContent = this._input.validationMessage;
    }
  }

  _isInvalid(inputs) {
      return inputs.some((inputValids) =>{
        return !inputValids.validity.valid;
      })
    }

  _toggleClassButton() { //*switch class/disabled if input is invalid or valid
    if(this._isInvalid(this._inputs)){
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', '');
    } else {
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled', '');
    }
  }

  _setEventListener() { //* listen inputs valid
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleClassButton();
    this._inputs.forEach((validInput) =>{
      validInput.addEventListener('input', (evt) => {
        this._validElement(evt);
        this._toggleClassButton();
      });
    });
  }

  resetValidation() {
    this._toggleClassButton();
  }

}
