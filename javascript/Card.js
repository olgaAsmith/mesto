import {openedImage} from './index.js';
import {openedImageName} from './index.js';
import openPopUp from './index.js';
import {popUpGalleryImage} from './index.js';

export default class Card {
  constructor(item, templateSelector) {
    this._link = item.link;
    this._name = item.name;
    this._alt = item.name;
    this._templateSelector = templateSelector;
  }

   _getTemplateCard() { //*clone template
    this._card = document.querySelector('.template__gallery-item').content.querySelector(this._templateSelector).cloneNode(true);
    return this._card;
  }

  addNewCard(){ //* create card + listeners like delete fulls
    this._addedCard = this._getTemplateCard();
    this._image = this._addedCard.querySelector('.gallery__item-image');
    this._nameCard = this._addedCard.querySelector('.gallery__item-name');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._nameCard.textContent = this._alt;
    this._likeCard();
    this._deleteCard();
    this._showFullImage();
    return this._addedCard;
  }

  _likeCard(){ //*like
    this._buttonLike = this._addedCard.querySelector('.gallery__item-like');
    this._buttonLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('gallery__item-like_active');
    });
  }

  _deleteCard(){ //*delete card
    this._buttonDeleteCard = this._addedCard.querySelector('.gallery__trash');
    this._buttonDeleteCard.addEventListener('click', () => {
      this._addedCard.remove();
    });
  }

  _showFullImage() { //*open image popup / full image
    this._image.addEventListener('click', (evt) => {
      openedImage.src = this._link;
      openedImageName.textContent = this._name;
      openedImage.alt = this._alt;
      openPopUp(popUpGalleryImage);
    });
  };
}
