let editUser = document.querySelector('.account__edit');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-button');
let nameAccount = document.querySelector('.account__name');
let jobAccount = document.querySelector('.account__profession');
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = popUp.querySelector('.popup__input_tag_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = popUp.querySelector('.popup__input_tag_prof');// Воспользуйтесь инструментом .querySelector()
nameInput.value = nameAccount.textContent;
jobInput.value = jobAccount.textContent;

function openPopUp() { //открытие popup
  popUp.classList.add('popup_opened'); //добавляем класс
};

function closePopUp() {// закрыть popup
  popUp.classList.remove('popup_opened'); //удаляем класс
};

// Находим форму в DOM
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    let job = jobInput.value;  // Получите значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    nameAccount.textContent = name;
    jobAccount.textContent = job;     // Вставьте новые значения с помощью textContent
    popUp.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
editUser.addEventListener('click', openPopUp); // кнопка едит открывает окно
closeButton.addEventListener('click', closePopUp); // крестик закрывает окно
