export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  openPopup(){
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  closePopup(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if ((evt.key === "Escape" || evt.target === this._popup)){
      this.closePopup();
    }
  }

  setEventListeners(){
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleEscClose);
    this._buttons = document.querySelectorAll('.popup__close-button');
    this._buttons.forEach((item)=>{
      item.addEventListener('click', ()=>{
        this.closePopup();
      });
    });
  }
}
