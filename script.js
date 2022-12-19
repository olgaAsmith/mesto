let editUser = document.querySelector('.account__edit');
let popUp = document.querySelector('.pop-up')
let popUpWindow = document.querySelector('.pop-up__window')
let closeButton = document.querySelector('.pop-up__close-button')

function openPopUp() {
  popUp.classList.add('pop-up_active'); //добавляем класс
};

function closePopUp() {
  popUp.classList.remove('pop-up_active'); //удаляем класс
};

editUser.addEventListener('click', openPopUp); // кнопка едит открывает окно
closeButton.addEventListener('click', closePopUp); // крестик закрывает окно
popUp.addEventListener('click', function(mouse){
  if (!mouse.target.closest('.pop-up__window')){ //кликом по области popup, за //искючением всего того что не являетмя родителем виндоу, закрывает окно
    closePopUp();
}});
document.addEventListener('keydown', function(exitPopUp) {
  if (exitPopUp.key === 'Escape') {
   closePopUp()
  }});//закрытие по клавише escape

//сохранение изменений

let accountName = document.querySelector('.account__name');
let accountProf = document.querySelector('.account__profession');
let inputName = document.querySelector('.pop-up__input-name');
let inputProf = document.querySelector('.pop-up__input-prof');
let saveButton = document.querySelector('.pop-up__save');

inputName.value = accountName.textContent;
inputProf.value = accountProf.textContent;//инпут берет значение текста из имени
 //инпут берет значение текста из проф

function changes() {
  inputName.style.border = 'none';
  inputProf.style.border = 'none';
  inputName.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
  inputProf.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';

  if (inputName.value.length <= 1){
    inputName.style.border = '1px solid red';
    return;//ошибка
  }

  if (inputProf.value.length <= 2){
    inputProf.style.border = '1px solid red';
    return;//ошибка
  }

  if ((accountName.textContent === inputName.value) && (accountProf.textContent === inputProf.value)) {
    closePopUp();//если инпут не изменилсмя, выход
  }

  if ((accountName.textContent !== inputName.value) || (accountProf.textContent !== inputProf.value)) {
    accountName.textContent = inputName.value;
    accountProf.textContent = inputProf.value;
    closePopUp();//если инпут изменилсмя, присвоить новое значение инпута имени на странице и закрыть окно
  }};

saveButton.addEventListener('click', changes);//кнопка сохранить в окне
document.addEventListener('keydown', function(enterPopUp) {
  if (enterPopUp.key === 'Enter') {
    changes()
  }});//закрытие по клавише escape

// Like
/*
let like = document.querySelector('.gallery__item-like');

function likeSwitch() {

  if (like.classList.contains('gallery__item-like_active')) {
    like.classList.remove('gallery__item-like_active');
  } else {
    like.classList.add('gallery__item-like_active')
  }}

like.addEventListener('click', likeSwitch);
*/
