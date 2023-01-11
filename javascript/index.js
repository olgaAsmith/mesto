const editUser = document.querySelector('.account__edit'); //кнопка редакт карандаш
const popUpProfile = document.querySelector('.popup_edit-profile');//попап
const closeButton = document.querySelectorAll('.popup__close-button');//кнопка крестик
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
const addImageButton = document.querySelector('.account__add-image');//кнопка +
const initialCards = [ //карточки галереи
  { name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  { name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  { name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  { name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  { name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  { name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
];
//*------------------------------------------------------------------------------

//*---------------------------------OPEN-CLOSE--POPS------------------------
function openPopUp(item){
  item.classList.add('popup_opened');
}
function closePopUp(item){
  item.classList.remove('popup_opened');
}//общая функция с передачей аргумента для всех попапов

//*---------------------LIKE------------------------
function likeCard(item){
  item.addEventListener('click', function(evt){
    evt.target.classList.toggle('gallery__item-like_active');
})}//Листенер нулл, массива не существует - нет значения листенеру!!

//*---------------DELETE CARD----------------------
function deleteCard(item){
  item.addEventListener('click', function(evt){
    const closestCard = item.closest('.gallery__item');
    console.log(closestCard);
    closestCard.remove();
})}

//*------------------FULLIMAGE POPUP--------------------------
function showFullImage(item){
  item.addEventListener('click',function(){//получить срс этого элемента и записать в открывающийся элемент
    const openImage = document.querySelector('.popup__image-full');
    const openImageName = document.querySelector('.popup__image-caption');
    openImage.src = item.src;
    openImageName.textContent = item.alt;
    openPopUp(popUpGalleryImage);
  });
};//открываем картинку в попап. Достаем переменные для попап картинки и записываем в них значения из создаваемой карточки--ссылку картинки и название подпись. Открываем попап картинки.

//*------------------------------ADD NEW CARD----------------------------------
function addNewCard(link, name, alt) {
  const galleryCard = templateCard.querySelector('.gallery__item').cloneNode(true);
  galleryCard.querySelector('.gallery__item-image').src = link;
  galleryCard.querySelector('.gallery__item-image').alt = name;
  galleryCard.querySelector('.gallery__item-name').textContent = alt;
  const likeButton = galleryCard.querySelector('.gallery__item-like');
  const deleteButton = galleryCard.querySelector('.gallery__trash');
  const showFullImageButton = galleryCard.querySelector('.gallery__item-image');
  showFullImage(showFullImageButton);
  likeCard(likeButton);
  deleteCard(deleteButton);
  return galleryCard;
  //получаем клон кода из темплейт, задаем атрибуты склонированного объекта. Получаем значения из полученных аргументов функции. Получаем из клона лайк, корзинку и кнопку(сама картинка карточки) и вызываем функции для этих переменных. Записываем полученную карточку.
}

//*--------------------------------ADD NEWCARD----------------------------
function addNewPlaceCard(evt){
  evt.preventDefault();
  const nameCard = nameNewCard.value;
  const linkCard = linkNewCard.value;
  listGallery.prepend(addNewCard(linkCard , nameCard, nameCard));
  closePopUp(popUpNewPlace);
  //добавление карточки по кнопке создать. Получаем данные для карточки из значений в инпутах. Добавляем краточку в начало списка через функцию addnewcard с полученными аргументами
};

//*------------------------ПЕРЕБОР МАССИВА КАРТОЧЕК-------------------
initialCards.forEach(function(item){
  listGallery.append(addNewCard(item.link, item.name, item.name));
  //перебираем массив карточек, записывае в аргументы данные из массива и добавляем в конец списка
})

//*-----------------ADD NEWCARD SUBMIT--------------------
formAddCard.addEventListener('submit', addNewPlaceCard); //вызов по сабмиту в форме

//*--------------------PROFILE POPUP CHANGE----------------------------
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let job = jobInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  nameAccount.textContent = name;
  jobAccount.textContent = job;// Вставьте новые значения с помощью textContent
  closePopUp(popUpProfile);
}

//*-----------------------CHANGE PROFILE SUBMIT--------------------------
formElement.addEventListener('submit', handleFormSubmit);

//*-----------------------OPEN PROFILE POPUP--------------------------
editUser.addEventListener('click', function() {
  nameInput.value = nameAccount.textContent; // при открытии инпут будет равен текущему имени на странице
  jobInput.value = jobAccount.textContent;
  openPopUp(popUpProfile);
}); // кнопка едит открывает попап

//*---------------ADD IMAGE BBUTTON(+) OPENS POPUPNEWPLACE----------------
addImageButton.addEventListener('click', function(){
  openPopUp(popUpNewPlace)});//клик по + откроет попап добавления карточки

//* ----------------CLOSE BUTTON---------------
closeButton.forEach(function(item){
  item.addEventListener('click', function(){
    const closestPopUp = item.closest('.popup');
    closestPopUp.classList.remove('popup_opened');
  });
});//Закрытие всех попапов. Для каждого элемента массива закрытая кнопка - добавить слущатель клика и выполнить: присвоение переменной ближайшей к текущему перебираемому элементу(родитель) и затем удаление класса открытого попапа из этой переменной

//document.addEventListener('click', function(event){console.log(event.target);});
