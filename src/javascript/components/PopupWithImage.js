import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  openPopup(name, link, openedImageName, openedImage){
    openedImageName.textContent = name;
    openedImage.alt = name;
    openedImage.src = link;
    super.openPopup();
  }
}
