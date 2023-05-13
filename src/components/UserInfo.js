export default class UserInfo{
  constructor({userNameSelector, aboutUserSelector, profileAvatarSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(profileAvatarSelector)
  }

  // constructor({userName, aboutUser, profileAvatar}){
  //   this.data = {
  //     name: userName,
  //     about: aboutUser,
  //     avatar: profileAvatar
  //   }
  //   this._userName = userName;
  //   this._aboutUser = aboutUser;
  //   this._avatar = profileAvatar
  // }

  // getUserInfo () {
  //   return  {
  //     name: this._data.name,
  //     about: this._data.about,
  //     avatar: this._data.avatar
  //   }
  // }

  getUserInfo () {
    return  {
      name: this._userName.textContent,
      about: this._aboutUser.textContent,
      avatar: this._avatar
    }
  }

  // setUserInfo(userInfo) {
  //   console.log(userInfo)
  //   this._data.name = userInfo.name
  //   this._data.about = userInfo.about
  //   this._data.avatar = userInfo.avatar
  //   if (userInfo.name) {
  //     this._userName.textContent = this._data.name
  //   }

  //   if (userInfo.about) {
  //     this._aboutUser.textContent = this._data.about
  //   }

  //   if (userInfo.avatar) {
  //     this._avatar.src = this._data.avatar
  //     this._avatar.alt = this._data.name
  //   }
  // }

  setUserInfo = (userInfo) =>{
    this._userName.textContent = userInfo.userName;
    this._aboutUser.textContent = userInfo.aboutUser;
  }

  setAvatar(linkAvatar) {
    console.log(this._avatar.src)
    console.log(this._avatar)
    this._avatar.src = linkAvatar;
  }
}
