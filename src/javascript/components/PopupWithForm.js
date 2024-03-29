import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popup, addCard){
    super(popup);
    this._addCard = addCard;
    this._form = popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._buttonSave = this._form.querySelector('.popup__save')
  }

  _getInputValues(){
    this._formInputValues = {};
    this._inputs.forEach(input => this._formInputValues[input.name] = input.value);
    return this._formInputValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._addCard(this._getInputValues());
    });
  }

  changeButtonText(isLoading){
    if (isLoading) {
      this._buttonSave.textContent = 'Сохранение...'
    } else {
      this._buttonSave.textContent = 'Сохранить'
  }}

  close(){
    super.close();
    this._form.reset();
  }
}
