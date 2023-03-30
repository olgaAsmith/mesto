import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup{
  constructor(popup){
    super(popup);
  }

  deleteCardFunction(act){
    this._submitFunction = act;
  }

  setEventListeners(){
    super.setEventListeners();
    const buttonSubmit = this._popup.querySelector('.popup__button-say-yes');
    buttonSubmit.addEventListener('click', () => {
      this._submitFunction();
    })
  }
}
