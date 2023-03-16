export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if ((evt.key === "Escape" || evt.target === this._popup)){
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if ((evt.target === this._popup)){
      this.close();
    }
  }

  setEventListeners(){
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
    this._button = this._popup.querySelector('.popup__close-button');
    this._button.addEventListener('click', ()=>{
      this.close();
      });
    };
}
