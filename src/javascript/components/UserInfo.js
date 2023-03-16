export default class UserInfo{
  constructor({name, job}){
    this._name = document.querySelector(name); //*name user  h1
    this._job = document.querySelector(job); //*job user p
  }

  getUserInfo(){
    return {
      name: this._name.textContent,//*h1 text
      job: this._job.textContent//*p text
    }
  }

  setUserInfo(name, job){
    this._name.textContent = name;//*inputname = h1 text
    this._job.textContent = job;//*inputjob = p text
  }
}


/* Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

Аргумент - объект с двумя ключами { элементИнформацииОСебе, элементИмени }
есть метод getUserInfo который возвращает текущие значения из разметки. то есть textContent свойство двух элементов в виде объекта
setUserInfo - получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo) */
