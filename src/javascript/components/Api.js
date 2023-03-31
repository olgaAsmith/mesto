//*API
export default class Api {
  constructor(){
    this._url = 'https://mesto.nomoreparties.co/v1/cohort-62/';
    this._token = 'b594440b-0ebe-413b-972a-23196d848451';
    this._headers = {
                    'Content-Type': 'application/json',
                     authorization: this._token
                    };
  }

  _check(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData(){
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._check)}

  getCardsData(){
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._check)}

  editUserInfo(accountName, accountProf){
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: accountName,
        about: accountProf
      })
    })
    .then(this._check)}

  createCard(cardName, cardLink){
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._check)}


  removeCard(cardId){
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._check)}

  likeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._check)}

  dislikeCard(cardId){
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._check)}

  setAvatar(avatarNew){
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarNew,
      })
    })
    .then(this._check)}
}
