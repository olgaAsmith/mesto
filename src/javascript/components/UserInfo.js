export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name); //*name user  h1
    this._about = document.querySelector(about); //*job user p
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent, //*h1 text
      about: this._about.textContent, //*p text
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name; //*inputname = h1 text
    this._about.textContent = about; //*inputjob = p text
    this._avatar.src = avatar;
  }
}
