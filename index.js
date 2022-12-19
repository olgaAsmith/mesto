let editUser = document.querySelector('.account__edit');
let popUp = document.querySelector('.pop-up');
let closeButton = popUp.querySelector('.pop-up__close-button');
let accountName = document.querySelector('.account__name');
let accountProf = document.querySelector('.account__profession');
let inputName = popUp.querySelector('.pop-up__input-name');
let inputProf = popUp.querySelector('.pop-up__input-prof');
let saveButton = popUp.querySelector('.pop-up__save');

function openPopUp() { //открытие popup
  inputName.value = accountName.textContent;
  inputProf.value = accountProf.textContent;
  inputName.style.border = 'none';
  inputProf.style.border = 'none';
  inputName.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
  inputProf.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';//присвоить значение со страницы в инпут, а такде вернуть исходные свойства. даже если будут изменения в инпутах при закрытии, или при неправильном наборе данных, будет всегда открываться с значением из переменной на основной странице
  popUp.classList.add('pop-up_active'); //добавляем класс
  popUp.querySelector('.pop-up__input-name').focus();//фокус на первый инпут
};

function closePopUp() {// закрыть popup
  popUp.classList.remove('pop-up_active'); //удаляем класс
};

editUser.addEventListener('click', openPopUp); // кнопка едит открывает окно
closeButton.addEventListener('click', closePopUp); // крестик закрывает окно
popUp.addEventListener('click', function(event){
    if (event.target !== event.currentTarget){
    return;
  }
  closePopUp(); //кликом по области popup равный области popup, закрывает окно(с веба)()
  //e.target.closest('.pop-up__window') все до родителя
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
     closePopUp();
  }});//закрытие по клавише escape



function changes() {
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
popUp.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    changes()
  }});//save по клавише enter

// Like
/*   forEach, массив
let like = document.querySelector('.gallery__item-like');

function likeSwitch() {

  if (like.classList.contains('gallery__item-like_active')) {
    like.classList.remove('gallery__item-like_active');
  } else {
    like.classList.add('gallery__item-like_active')
  }}

like.addEventListener('click', likeSwitch);
*/
