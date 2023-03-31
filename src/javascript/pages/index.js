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
  formValidators,
  avatar} from '../utils/constant.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';

const popupWithImage = new PopupWithImage(popUpGalleryImage);
popupWithImage.setEventListeners();
const popupWithForm = new PopupWithForm(popUpNewPlace, addNewPlaceCard);
popupWithForm.setEventListeners();
const popupUserInfo = new PopupWithForm(popUpProfile, handlePopupProfileSubmit);
popupUserInfo.setEventListeners();
const popupEditAvatar = new PopupWithForm(document.querySelector('.popup_set-new-avatar'), setNewAvatar) ;
popupEditAvatar.setEventListeners();
const popupDeleteCard = new PopupDeleteCard(document.querySelector('.popup_delete-card-question'));
popupDeleteCard.setEventListeners();
const userInfo = new UserInfo({
  name: '.account__name',
  job: '.account__profession',
  avatar: '.account__image'
});
const api = new Api;

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

//^ add user data on page after get  //^ render cards from serv
Promise.all([api.getCardsData(), api.getUserData()]).then(([dataCards, dataUser])=> {
  userInfo.setUserInfo(dataUser.name, dataUser.about, dataUser.avatar);
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
  api.createCard(cardFromValue.placeName, cardFromValue.placeLink,)
  .then((result)=>{
    popupWithForm.buttonLoading(true);
    const cardFromForm = {
      name: result.name,
      link: result.link,
      owner: result.owner,
      likes: []
    }
    section.addItemBefore(createCard(cardFromForm, result.owner));
  })
  .catch((error)=>{console.log(error);})
  .finally(() => {
    popupWithForm.buttonLoading(false);
  });
  popupWithForm.close();
  formValidators['addCard'].resetValidation();
}

//*edit profile button
function handlePopupProfileSubmit(data){
  const {accountName, accountProf} = data;
  userInfo.setUserInfo(accountName, accountProf, avatar.src);
  api.editUserInfo(accountName, accountProf)
  .then(()=>{
    popupUserInfo.buttonLoading(true);
    popupUserInfo.close();
  }).catch((error)=>{console.log(error);})
  .finally(() => {
    popupUserInfo.buttonLoading(false);
  });
}

//*avatar click, editting
avatar.addEventListener('click', function(){
  popupEditAvatar.open();
})

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
    api.dislikeCard(cardId)
    .then((result)=>{
      card.toggleLike();
      console.log(result.likes.length);
      card.showLikes(result.likes.length);
     }).catch((error)=>{console.log(error);})
  } else {
    api.likeCard(cardId)
    .then((result)=>{
      card.toggleLike();
      card.showLikes(result.likes.length);
    }).catch((error)=>{console.log(error);})
  }
}

//*set new avatar
function setNewAvatar(link){
  api.setAvatar(link.avatarLink)
  .then(()=>{
    popupEditAvatar.buttonLoading(true);
    userInfo.setNewAvatar(link.avatarLink);
    popupEditAvatar.close();
  })
  .catch((error)=>{console.log(error);})
  .finally(() => {
    popupEditAvatar.buttonLoading(false);
  });
}
