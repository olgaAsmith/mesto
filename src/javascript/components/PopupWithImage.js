import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup);
    this._openedImageName = popup.querySelector('.popup__image-caption');
    this._openedImage = popup.querySelector('.popup__image-full');
  }

  open(name, link){
    this._openedImageName.textContent = name;
    this._openedImage.alt = name;
    this._openedImage.src = link;
    super.open();
  }
}
