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
import {initialCards} from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage(popUpGalleryImage);
popupWithImage.setEventListeners();
const popupWithForm = new PopupWithForm(popUpNewPlace, addNewPlaceCard);
popupWithForm.setEventListeners();
const popupUserInfo = new PopupWithForm(popUpProfile, handlePopupProfileSubmit);
popupUserInfo.setEventListeners();
const userInfo = new UserInfo({
  name: '.account__name',
  job: '.account__profession'
});

//*create card
function createCard(item) {
  const card = new Card(item, '.template__gallery-item', handleCardClick);
  const cardElement = card.addNewCard();
  section.addItemBefore(cardElement);
}

//*render cards
const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
      }
    }, listGallery);
  section.renderItems();

//*add new card from form
function addNewPlaceCard(cardFromValue){
const cardFromForm = {
    name: cardFromValue.placeName,
    link: cardFromValue.placeLink
  }
  createCard(cardFromForm);
  popupWithForm.close();
  formValidators['addCard'].resetValidation();
}

//*-----------------------OPEN PROFILE POPUP--------------------------
buttonEditProfile.addEventListener('click', function() {
  const userInfoData = userInfo.getUserInfo();
  getValueToForm(userInfoData);
  popupUserInfo.open();
  formValidators['profile'].resetValidation();
}); // кнопка едит открывает попап

//*get input value from textcontent h1+p
function getValueToForm({name, job}){
  nameInput.value = name;
  jobInput.value = job;
}

//*--------------------PROFILE POPUP CHANGE----------------------------
function handlePopupProfileSubmit(data){
  const {accountName, accountProf} = data;
  userInfo.setUserInfo(accountName, accountProf);
  popupUserInfo.close();
}

//*bring data from created cards and give it to PopupWithImage------
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//*---------------ADD IMAGE BBUTTON(+) OPENS POPUPNEWPLACE----------------
buttonOpenNewPlace.addEventListener('click', function(){
  popupWithForm.open()});//клик по + откроет попап добавления карточки

//* valid enable
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

