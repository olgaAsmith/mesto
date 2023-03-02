const buttonEditProfile = document.querySelector('.account__edit'); //кнопка редакт карандаш
const popUpProfile = document.querySelector('.popup_edit-profile');//попап
const buttonClosePopUp = document.querySelectorAll('.popup__close-button');//кнопка крестик
const nameAccount = document.querySelector('.account__name');//имя
const jobAccount = document.querySelector('.account__profession');//деятельнсоть
const formElement = document.querySelector('.popup__form_profile');//форма редакт профиля
const nameInput = popUpProfile.querySelector('.popup__input_tag_name');//инпут форма редакт профиля - имя
const jobInput = popUpProfile.querySelector('.popup__input_tag_prof');// инпут форма редакт профиля - деятельность
const formAddCard = document.querySelector('.popup__form_cards');//форма новая карта
const popUpGalleryImage = document.querySelector('.popup_gallery-image');//попап фулл имейдж
const popUpNewPlace = document.querySelector('.popup_new-place');//попап нвое место
const buttonOpenNewPlace = document.querySelector('.account__add-image');//кнопка +
const openedImage = document.querySelector('.popup__image-full');//открытая картинка
const openedImageName = document.querySelector('.popup__image-caption');//подпись открытой картинки
const escapeButton = 'Escape';
const allPopups = document.querySelectorAll('.popup');
const listGallery = document.querySelector('.gallery__items');
const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const cardFromValueName = document.querySelector('.popup__input_image_name');
const cardFromValueLink = document.querySelector('.popup__input_image_link');
const formValidators = {};

//^IMPORT--------------------------------------------------------
import {initialCards} from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//*create card
function createCard(item) {
  const cardTemplate = document.querySelector('.template__gallery-item').content.querySelector('.gallery__item').cloneNode(true);
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.addNewCard();
  return cardElement;
}

//*arr
initialCards.forEach(function(item) {
  listGallery.append(createCard(item));
});

 //*create card by value in form
function addNewPlaceCard(evt){
  evt.preventDefault();
  const cardFromValue = {
    name: cardFromValueName.value,
    link: cardFromValueLink.value
  };
  listGallery.prepend(createCard(cardFromValue));
  closePopUp(popUpNewPlace);
  formAddCard.reset();
  formValidators['addCard'].resetValidation();
}

//*submit card form/addcard listener
formAddCard.addEventListener('submit', addNewPlaceCard);

//*---------------------------------OPEN-CLOSE--POPS------------------------
function openPopUp(item){
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopUp(item){
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}//общая функция с передачей аргумента для всех попапов

//*--------------------PROFILE POPUP CHANGE----------------------------
function handlePopupProfileSubmit (evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const job = jobInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  nameAccount.textContent = name;
  jobAccount.textContent = job;// Вставьте новые значения с помощью textContent
  closePopUp(popUpProfile);
}

//*-----------------------CHANGE PROFILE SUBMIT--------------------------
formElement.addEventListener('submit', handlePopupProfileSubmit);

//*-----------------------OPEN PROFILE POPUP--------------------------
buttonEditProfile.addEventListener('click', function() {
  nameInput.value = nameAccount.textContent; // при открытии инпут будет равен текущему имени на странице
  jobInput.value = jobAccount.textContent;
  openPopUp(popUpProfile);
  formValidators['profile'].resetValidation();
}); // кнопка едит открывает попап

//*---------------ADD IMAGE BBUTTON(+) OPENS POPUPNEWPLACE----------------
buttonOpenNewPlace.addEventListener('click', function(){
  openPopUp(popUpNewPlace)});//клик по + откроет попап добавления карточки

//* ----------------CLOSE BUTTON---------------
buttonClosePopUp.forEach(function(item){
  item.addEventListener('click', function(){
    const closestPopUp = item.closest('.popup');
    closePopUp(closestPopUp);
  });
});

//*------------------------CLOSE POPUP BY ESCAPE-------------------
function closeByEscape(evt){
  if ((evt.key === escapeButton)){
    const openedPopup = document.querySelector('.popup_opened');
    closePopUp(openedPopup);
  }
}

//*------------------------CLOSE POPUP BY OVERLAY-------------------
function overlayCloseListener(popup){
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup){
      closePopUp(popup);
    }
  });
}

//*------------------------popups array-------------------
function closeByOverlayArray() {
  allPopups.forEach((popup) => {
    overlayCloseListener(popup);
  })
}
closeByOverlayArray();

function handleCardClick(name, link) {
  openedImageName.textContent = name;
  openedImage.alt = name;
  openedImage.src = link;
  openPopUp(popUpGalleryImage);
}

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

