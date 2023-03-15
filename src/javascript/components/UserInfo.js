export default class UserInfo{
  constructor(user, job){
    this._user = user;
    this._job = job;
  }

  getUserInfo(){
    this._user.value = document.querySelector('.account__name').textContent;
    this._job.value = document.querySelector('.account__profession').textContent;
  }

  setUserInfo(){
    this._saveUser = document.querySelector('.account__name');
    this._saveJob = document.querySelector('.account__profession');
    this._saveUser.textContent = this._user.value;
    this._saveJob.textContent = this._job.value;
  }
}
