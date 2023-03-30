export default class UserInfo{
  constructor({name, job, avatar}){
    this._name = document.querySelector(name); //*name user  h1
    this._job = document.querySelector(job); //*job user p
    this._avatar = document.querySelector(avatar);
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

  setNewAvatar(link){
    this._avatar.src = link;
  }
}
