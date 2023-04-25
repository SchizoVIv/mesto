export default class UserInfo{
  constructor({userNameSelector, aboutUserSelector, userInputNameSelector, abouInputtUserSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._userInputName = document.querySelector(userInputNameSelector);
    this._aboutInputUser = document.querySelector(abouInputtUserSelector);
  }

  setUserInfo = () =>{

    this._userName.textContent = this._userInputName.value;
    this._aboutUser.textContent = this._aboutInputUser.value;
  }
}
