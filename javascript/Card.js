export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._link = item.link;
    this._name = item.name;
    this._alt = item.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  addNewCard(){ //* create card + listeners like delete fulls
    this._addedCard = this._templateSelector;
    this._image = this._addedCard.querySelector('.gallery__item-image');
    this._nameCard = this._addedCard.querySelector('.gallery__item-name');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._nameCard.textContent = this._alt;
    this._setEventsListeners();
    return this._addedCard;
  }

  _likeCard(evt){ //*like
    evt.target.classList.toggle('gallery__item-like_active');
  }

  _deleteCard(){ //*delete card
    this._addedCard.remove();
  }

  _setEventsListeners() {
    this._buttonLike = this._addedCard.querySelector('.gallery__item-like');
    this._buttonLike.addEventListener('click', (evt) => {
      this._likeCard(evt);
    });

    this._buttonDeleteCard = this._addedCard.querySelector('.gallery__trash');
    this._buttonDeleteCard.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
