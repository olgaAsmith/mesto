const editUser = document.querySelector('.account__edit'); //кнопка редакт карандаш
const popUp = document.querySelector('.popup__edit-profile');//попап
const closeButton = document.querySelectorAll('.popup__close-button');//кнопка крестик
let nameAccount = document.querySelector('.account__name');//имя
let jobAccount = document.querySelector('.account__profession');//деятельнсоть
const formElement = document.querySelector('.popup__form_profile');// //форма редакт профиля
let nameInput = popUp.querySelector('.popup__input_tag_name');//инпут форма редакт профиля - имя
let jobInput = popUp.querySelector('.popup__input_tag_prof');// инпут форма редакт профиля - деятельность

const initialCards = [ //карточки галереи
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const templateCard = document.querySelector('.template__gallery-item').content;// получение содержимого тега темплейт
const listGallery = document.querySelector('.gallery__items');
let nameNewCard = document.querySelector('.popup__input_image_name');
let linkNewCard = document.querySelector('.popup__input_image_link');
const formAddCard = document.querySelector('.popup__form_cards');//форма новая карта

//перебор массива для создания галереии
initialCards.forEach(function(item){
  const galleryCard = templateCard.querySelector('.gallery__item').cloneNode(true);
  galleryCard.querySelector('.gallery__item-image').src = item.link;
  galleryCard.querySelector('.gallery__item-image').alt = item.name;
  galleryCard.querySelector('.gallery__item-name').textContent = item.name;
  listGallery.append(galleryCard);
})
const popUpGalleryImage = document.querySelector('.popup__gallery-image');
const popUpNewPlace = document.querySelector('.popup__new-place');
const addImageButton = document.querySelector('.account__add-image');
const showImageButton = document.querySelectorAll('.gallery__item-image');
const like = document.querySelectorAll('.gallery__item-like');
const deleteCard = document.querySelectorAll('.gallery__trash');
//--------------------------------NEWCARD SUBMIT----------------------------
function addNewPlaceCard(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameCard = nameNewCard.value;  // Получите значение полей jobInput и nameInput из свойства value
  let linkCard = linkNewCard.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const galleryCard = templateCard.querySelector('.gallery__item').cloneNode(true);
  galleryCard.querySelector('.gallery__item-image').src = linkCard;
  galleryCard.querySelector('.gallery__item-image').alt = nameCard;
  galleryCard.querySelector('.gallery__item-name').textContent = nameCard;
  listGallery.prepend(galleryCard);
  closePopUpNewPlace();
};

//---call function addcard in gallery
formAddCard.addEventListener('submit', addNewPlaceCard);


//-----------------------------------PROFILE SUBMIT----------------------------
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let job = jobInput.value;  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  nameAccount.textContent = name;
  jobAccount.textContent = job;     // Вставьте новые значения с помощью textContent
  closePopUpProfile();
}
formElement.addEventListener('submit', handleFormSubmit);
  //editUser.addEventListener('click', openPopUp); // кнопка едит открывает окно
  editUser.addEventListener('click', function() {
  nameInput.value = nameAccount.textContent; // при открытии инпут будет равен текущему имени на странице
  jobInput.value = jobAccount.textContent;
  openPopUp();
}); // кнопка едит открывает попап

//---------------------------------OPEN ----CLOSE--POPS------------------------
// Открытие попап по отдельности. Каждому попапу отдельная переменная, каждой кнопке отдельная перменнная. Жмем кнопка открываем соот попап

function openPopUp() { //открытие popup
  popUp.classList.add('popup_opened'); //добавляем класс
};
function openPopUpGalleryImage() { //Картинка добавляем класс
  popUpGalleryImage.classList.add('popup_opened');
};

function openPopUpNewPlace() { //Новое место одобавляем класс
  popUpNewPlace.classList.add('popup_opened');
};

function closePopUpGalleryImage() {
  popUpGalleryImage.classList.remove('popup_opened');
};

function closePopUpNewPlace() {
  popUpNewPlace.classList.remove('popup_opened');
};

function closePopUpProfile() {
  popUp.classList.remove('popup_opened');
};

//клик кнопки + открывает новое место
addImageButton.addEventListener('click', openPopUpNewPlace);
//клик по карточке открывает карточку. Перебор массива всех карточек на страничке.
showImageButton.forEach(function(item){
  item.addEventListener('click',function(){
    //получить срс этого элемента и записать в открывающийся элемент
    let openImage = document.querySelector('.popup__image-full');
    let openImageName = document.querySelector('.popup__image-caption');
    openImage.src = item.src;
    openImageName.textContent = item.alt;
    openPopUpGalleryImage();
  });
});
//Закрытие всех попапов. Для каждого элемента массива закрытая кнопка - добавить слущатель клика и выполнить: присвоение переменной ближайшей к текущему перебираемому элементу и затем удаление класса открытого попапа из этой переменной
closeButton.forEach(function(item){
  item.addEventListener('click', function(){
    const closestPopUp = item.closest('.popup');
    closestPopUp.classList.remove('popup_opened');
  });
});

//---------------------------------LIKE-----------------------------------------

like.forEach(function(item){
  item.addEventListener('click', function(evt){
    evt.target.classList.toggle('gallery__item-like_active');
  });
});

//----------------DELETE CARD----------------------


deleteCard.forEach(function(item){
  item.addEventListener('click', function(){
    const closestCard = item.closest('.gallery__item');
    console.log(closestCard);
    closestCard.remove();
  })
});

//document.addEventListener('click', function(event){console.log(event.target);});
