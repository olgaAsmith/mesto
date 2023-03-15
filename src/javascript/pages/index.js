import '../../pages/index.css';
import {buttonEditProfile,
  popUpProfile,
  formElement,
  nameInput,
  jobInput,
  popUpGalleryImage,
  popUpNewPlace,
  buttonOpenNewPlace,
  openedImage,
  openedImageName,
  listGallery,
  validation,
  formValidators} from '../utils/constant.js';
import {initialCards} from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupWithImage = new PopupWithImage(popUpGalleryImage);
const popupWithForm = new PopupWithForm(popUpNewPlace, addNewPlaceCard);
const popupUserInfo = new Popup(popUpProfile);
const userInfo = new UserInfo(nameInput, jobInput);

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
    },
  listGallery);
section.renderItems();

//*add new card from form
function addNewPlaceCard(cardFromValue){
const cardFromForm = {
  name: cardFromValue.placeName,
  link: cardFromValue.placeLink
  }
  createCard(cardFromForm);
  popupWithForm.closePopup();
  formValidators['addCard'].resetValidation();
}

//*-----------------------OPEN PROFILE POPUP--------------------------
buttonEditProfile.addEventListener('click', function() {
  userInfo.getUserInfo();
  popupUserInfo.openPopup();
  formValidators['profile'].resetValidation();
}); // кнопка едит открывает попап

//*--------------------PROFILE POPUP CHANGE----------------------------
function handlePopupProfileSubmit (evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userInfo.setUserInfo();
  popupUserInfo.closePopup();
}

//*-----------------------CHANGE PROFILE SUBMIT--------------------------
formElement.addEventListener('submit', handlePopupProfileSubmit);

//*bring data from created cards and give it to PopupWithImage------
function handleCardClick(name, link) {
  popupWithImage.openPopup(name, link, openedImageName, openedImage);
}

//*---------------ADD IMAGE BBUTTON(+) OPENS POPUPNEWPLACE----------------
buttonOpenNewPlace.addEventListener('click', function(){
  popupWithForm.openPopup()});//клик по + откроет попап добавления карточки

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

