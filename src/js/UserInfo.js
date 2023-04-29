export default class UserInfo{
  constructor({userNameSelector, aboutUserSelector, userInputNameSelector, abouInputtUserSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo () {
    return  {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent
    }
  }

  setUserInfo = ({userName, aboutUser}) =>{
    this._userName.textContent = userName;
    this._aboutUser.textContent = aboutUser;
  }
}
