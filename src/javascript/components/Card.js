export default class Card {
  constructor(item, templateSelector, handleCardClick, userMe, clickOnTrashIcon, clickOnLike) {
    this._item = item;//^serv card (owner item.owner)
    this._link = item.link;
    this._name = item.name;
    this._alt = item.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userMe = userMe;//^my (owner)
    this._clickOnTrashIcon = clickOnTrashIcon;//^trash icon open func
    this._clickOnLike = clickOnLike;
    this._likesArray = this._item.likes;
  }

  _getTemplateCard() { //*clone template
    this._card = document.querySelector(this._templateSelector).content.querySelector('.gallery__item').cloneNode(true);
    return this._card;
  }

  addNewCard(){ //* create card + listeners like delete fulls
    this._сard = this._getTemplateCard();
    this._image = this._сard.querySelector('.gallery__item-image');
    this._nameCard = this._сard.querySelector('.gallery__item-name');
    this._likes = this._сard.querySelector('.gallery__like-count');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._nameCard.textContent = this._alt;
    this._setEventsListeners();
    this.showLikes(this._likesArray.length);
    if (this._checkLike()){this.like()};
    return this._сard;
  }

  _checkLike(){//*just id check
    return this._likesArray.some(like => {
      return like._id === this._userMe._id});
    }

  showLikes(number){ //*show count likes
    if(number === 0){
      this._likes.textContent = '';
    } else {
      this._likes.textContent = number;
    }
  }

  like(){
    this._buttonLike.classList.add('gallery__item-like_active');
    this.liked = true;//*change to unlike
  }
  unlike(){
    this._buttonLike.classList.remove('gallery__item-like_active');
    this.liked = false;//*change to like
  }
  deleteCard(){
    this._сard.remove();
  }

  _setEventsListeners() {
    //& like
    this._buttonLike = this._сard.querySelector('.gallery__item-like');
    this._buttonLike.addEventListener('click', () => {
      this._clickOnLike(this._item._id, this, this.liked);
    });
    //& find button
    this._buttonDeleteCard = this._сard.querySelector('.gallery__trash');
    //& hide not mine trashs
    if (this._item.owner._id !== this._userMe._id) {
      this._buttonDeleteCard.classList.add('gallery__trash_invisible')
    }
    //& trash icon click
    this._buttonDeleteCard.addEventListener('click', () => {
      this._clickOnTrashIcon(this._item._id, this);
    })
    //& click full image
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
