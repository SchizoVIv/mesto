export default class UserInfo{
  constructor({userNameSelector, aboutUserSelector, profileAvatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(profileAvatarSelector)
  }

  getUserInfo () {
    return  {
      name: this._userName.textContent,
      about: this._aboutUser.textContent,
      avatar: this._avatar
    }
  }

  setUserInfo = (userInfo) =>{
    this._userName.textContent = userInfo.name;
    this._aboutUser.textContent = userInfo.about;
  }

  setAvatar(linkAvatar) {
    this._avatar.src = linkAvatar;
  }
}
