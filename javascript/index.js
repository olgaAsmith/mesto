const buttonEditProfile = document.querySelector('.account__edit'); //кнопка редакт карандаш
const popUpProfile = document.querySelector('.popup_edit-profile');//попап
const buttonClosePopUp = document.querySelectorAll('.popup__close-button');//кнопка крестик
const nameAccount = document.querySelector('.account__name');//имя
const jobAccount = document.querySelector('.account__profession');//деятельнсоть
const formElement = document.querySelector('.popup__form_profile');//форма редакт профиля
const nameInput = popUpProfile.querySelector('.popup__input_tag_name');//инпут форма редакт профиля - имя
const jobInput = popUpProfile.querySelector('.popup__input_tag_prof');// инпут форма редакт профиля - деятельность
const templateCard = document.querySelector('.template__gallery-item').content;// получение содержимого тега темплейт
const listGallery = document.querySelector('.gallery__items');//список карточек
const nameNewCard = document.querySelector('.popup__input_image_name');//имя в инпуте формы
const linkNewCard = document.querySelector('.popup__input_image_link');//ссылка в инпуте формы
const formAddCard = document.querySelector('.popup__form_cards');//форма новая карта
const popUpGalleryImage = document.querySelector('.popup_gallery-image');//попап фулл имейдж
const popUpNewPlace = document.querySelector('.popup_new-place');//попап нвое место
const buttonOpenNewPlace = document.querySelector('.account__add-image');//кнопка +
const openedImage = document.querySelector('.popup__image-full');//открытая картинка
const openedImageName = document.querySelector('.popup__image-caption');//подпись открытой картинки
const escapeButton = 'Escape';
const allPopups = document.querySelectorAll('.popup');
//^-------------------------------------------------------------------------
//^-------------------------------------------------------------------------

//*---------------------------------OPEN-CLOSE--POPS------------------------
function openPopUp(item){
  item.classList.add('popup_opened');//*--CALL CLOSE POPUP BY ESCAPE---
  document.addEventListener('keydown', closeByEscape);
  unblockSaveButton();
}

function closePopUp(item){
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}//общая функция с передачей аргумента для всех попапов

//*--------------------------DISACTIVATE ADD CARDBUTTON -----------
function blockAddButton() {
  const buttonAddCard = formAddCard.querySelector('.popup__save');
  buttonAddCard.classList.add('popup__button_disabled');
  buttonAddCard.setAttribute('disabled', '');
}
//*----------------------ACTIVATE PROFILE SAVE BUTTON------------------------
function unblockSaveButton() {
  const buttonSaveInfo = formElement.querySelector('.popup__save');
  buttonSaveInfo.classList.remove('popup__button_disabled');
  buttonSaveInfo.removeAttribute('disabled', '');
}

//*---------------------LIKE------------------------
function likeCard(evt){
  evt.target.classList.toggle('gallery__item-like_active');
}//Листенер нулл, массива не существует - нет значения листенеру!!

//*---------------DELETE CARD----------------------
function deleteCard(evt){
  const closestCard = evt.target.closest('.gallery__item');
  closestCard.remove();
}

//*------------------FULLIMAGE POPUP--------------------------
function showFullImage(item){
  openedImage.src = item.target.src;
  openedImageName.textContent = item.target.alt;
  openedImage.alt = item.target.alt;
  openPopUp(popUpGalleryImage);
};//открываем картинку в попап. Достаем переменные для попап картинки и записываем в них значения из создаваемой карточки--ссылку картинки и название подпись. Открываем попап картинки.

//*------------------------------ADD NEW CARD----------------------------------
function addNewCard(link, name, alt){
  const galleryCard = templateCard.querySelector('.gallery__item').cloneNode(true);
  const galleryImageData = galleryCard.querySelector('.gallery__item-image')
  galleryImageData.src = link;//<---^
  galleryImageData.alt = name;//<---^
  galleryCard.querySelector('.gallery__item-name').textContent = alt;
  const buttonLike = galleryCard.querySelector('.gallery__item-like');
  const buttonDeleteCard = galleryCard.querySelector('.gallery__trash');
  const buttonShowFullImage = galleryImageData;//<---^
  buttonLike.addEventListener('click', likeCard);
  buttonDeleteCard.addEventListener('click', deleteCard);
  buttonShowFullImage.addEventListener('click', showFullImage);
  return galleryCard;
  //получаем клон кода из темплейт, задаем атрибуты склонированного объекта. Получаем значения из полученных аргументов функции. Получаем из клона лайк, корзинку и кнопку(сама картинка карточки) и вызываем функции для этих переменных. Записываем полученную карточку.
}

//*----------------------------ADD NEWCARD IN FORM--------------------------
function addNewPlaceCard(evt){
  evt.preventDefault();
  const nameCard = nameNewCard.value;
  const linkCard = linkNewCard.value;
  listGallery.prepend(addNewCard(linkCard , nameCard, nameCard));
  closePopUp(popUpNewPlace);
  blockAddButton();
  formAddCard.reset();
  //добавление карточки по кнопке создать. Получаем данные для карточки из значений в инпутах. Добавляем краточку в начало списка через функцию addnewcard с полученными аргументами
};

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

//*-----------------ADD NEWCARD SUBMIT--------------------
formAddCard.addEventListener('submit', addNewPlaceCard); //вызов по сабмиту в форме

//*-----------------------CHANGE PROFILE SUBMIT--------------------------
formElement.addEventListener('submit', handlePopupProfileSubmit);

//*-----------------------OPEN PROFILE POPUP--------------------------
buttonEditProfile.addEventListener('click', function() {
  nameInput.value = nameAccount.textContent; // при открытии инпут будет равен текущему имени на странице
  jobInput.value = jobAccount.textContent;
  openPopUp(popUpProfile);
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
});//Закрытие всех попапов. Для каждого элемента массива закрытая кнопка - добавить слущатель клика и выполнить: присвоение переменной ближайшей к текущему перебираемому элементу(родитель) и затем удаление класса открытого попапа из этой переменной
//*------------------------ADD CARD BY ARRAY-------------------
initialCards.forEach(function(item){
  listGallery.append(addNewCard(item.link, item.name, item.name));
  //перебираем массив карточек, записывае в аргументы данные из массива и добавляем в конец списка
});

//*------------------------CLOSE POPUP BY ESCAPE-------------------
function closeByEscape(evt){
  const openedPopup = document.querySelector('.popup_opened');
  if ((evt.key === escapeButton)&&(openedPopup)){
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
