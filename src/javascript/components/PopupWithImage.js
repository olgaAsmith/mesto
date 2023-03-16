import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  open(name, link){
    this._openedImageName = document.querySelector('.popup__image-caption');
    this._openedImage = document.querySelector('.popup__image-full');
    this._openedImageName.textContent = name;
    this._openedImage.alt = name;
    this._openedImage.src = link;
    super.open();
  }
}
