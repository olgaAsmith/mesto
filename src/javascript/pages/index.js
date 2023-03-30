import '../../pages/index.css';
import {buttonEditProfile,
  popUpProfile,
  nameInput,
  jobInput,
  popUpGalleryImage,
  popUpNewPlace,
  buttonOpenNewPlace,
  listGallery,
  validation,
  formValidators} from '../utils/constant.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';

const popupWithImage = new PopupWithImage(popUpGalleryImage);
popupWithImage.setEventListeners();
const popupWithForm = new PopupWithForm(popUpNewPlace, addNewPlaceCard);
popupWithForm.setEventListeners();
const popupUserInfo = new PopupWithForm(popUpProfile, handlePopupProfileSubmit);
popupUserInfo.setEventListeners();




//*button "edit profile" opens popup editting infoUser
buttonEditProfile.addEventListener('click', function() {
  const userInfoData = userInfo.getUserInfo();
  getValueToForm(userInfoData);
  popupUserInfo.open();
  formValidators['profile'].resetValidation();
});

//*get input value from textcontent h1+p
function getValueToForm({name, job}){
  nameInput.value = name;
  jobInput.value = job;
}


//*bring data from created cards and give it to PopupWithImage------
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//*button "add image" opens popup adding images
buttonOpenNewPlace.addEventListener('click', function(){
  popupWithForm.open()});

  //* valid enabling
  const turnOnValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
turnOnValidation(validation);

//*API
class Api {
  constructor(){
    this._url = 'https://mesto.nomoreparties.co/v1/cohort-62/';
    this._token = 'b594440b-0ebe-413b-972a-23196d848451';
    this._headers = {
                    'Content-Type': 'application/json',
                     authorization: this._token
                    };
  }

  getUserData(){
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  getCardsData(){
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  editUserInfo(accountName, accountProf){
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: accountName,
        about: accountProf
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  createCard(cardName, cardLink){
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  removeCard(cardId){
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  likeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  dislikeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  setAvatar(avatar){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        newAvatar: avatar,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }
}


const api = new Api;

//^ add user data on page after get  //^ render cards from serv
Promise.all([api.getCardsData(), api.getUserData()]).then(([dataCards, dataUser])=> {
  console.log(dataCards);
  userInfo.setUserInfo(dataUser.name, dataUser.about);
  section.renderItems(dataCards, dataUser);
});

//*render cards
const section = new Section({
  renderer: (item, userMe) => {
    section.addItem(createCard(item, userMe));
  }
}, listGallery);
//*create card
function createCard(item, userMe){
  const card = new Card(item, '.template__gallery-item', handleCardClick, userMe, clickOnTrashIcon, clickOnLike);
  return card.addNewCard();
}
//*add new card from form
function addNewPlaceCard(cardFromValue){
  api.createCard(cardFromValue.placeName, cardFromValue.placeLink,).then((result)=>{
    const cardFromForm = {
      name: result.name,
      link: result.link,
      owner: result.owner,
      likes: ''
    }
    section.addItemBefore(createCard(cardFromForm, result.owner));
  })
  popupWithForm.close();
  formValidators['addCard'].resetValidation();
}

//*edit profile button
function handlePopupProfileSubmit(data){
  const {accountName, accountProf} = data;
  userInfo.setUserInfo(accountName, accountProf);
  api.editUserInfo(accountName, accountProf);
  popupUserInfo.close();
}

const popupEditAvatar = new PopupWithForm(document.querySelector('.popup_set-new-avatar'), setNewAvatar) ;
popupEditAvatar.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(document.querySelector('.popup_delete-card-question'));
popupDeleteCard.setEventListeners();

const avatar = document.querySelector('.account__image');


avatar.addEventListener('click', function(){
  popupEditAvatar.open();
})

const userInfo = new UserInfo({
  name: '.account__name',
  job: '.account__profession',
  avatar: '.account__image'
});

//*click trash opens popup, send submit to popup
function clickOnTrashIcon(cardId, card){
  popupDeleteCard.open();
  popupDeleteCard.deleteCardFunction(()=>{
    api.removeCard(cardId).then(()=>{
    card.deleteCard();
    popupDeleteCard.close();
    }).catch((error)=>{console.log(error);})
  })
}

//*click on hearts
function clickOnLike(cardId, card, checked){
  if(checked) { //*id user === user id like
    card.unlikeCard();
    api.dislikeCard(cardId).then((result)=>{
      card.showLikes(result.likes.length);
      console.log('11');
    }).catch((error)=>{console.log(error);})
  } else {
    card.likeCard();
    api.likeCard(cardId).then((result)=>{
      card.showLikes(result.likes.length);
    }).catch((error)=>{console.log(error);})
  }
}

function setNewAvatar(link){


  console.log(link.avatarLink);
  api.setAvatar(link.avatarLink).then((res)=>{
    userInfo.setNewAvatar(link.avatarLink);
    popupEditAvatar.close();
  }).catch((error)=>{console.log(error);})
}

