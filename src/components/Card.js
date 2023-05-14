export default class Card {
  constructor(
    data,
    cardTemplateSelector,
    openCardImage,
    userId,
    {handleDelitClick},
    {likeCard},
    {dislike}){

    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._data = data
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = openCardImage;
    this._handleDelitClick = handleDelitClick;
    this._likeCard = likeCard;
    this._dislike = dislike
    this._ownerId = data.owner._id
  }

  // _toggleLike () {
  //   this._buttonLike.classList.toggle('element__like-button_active')
  // }

  putLike() {
    this._buttonLike.classList.add('element__like-button_active')
  }

  clearLike() {
    this._buttonLike.classList.remove('element__like-button_active')
  }

  likesCount(res) {

    this._likeButtonCount.textContent = `${res.length}`
  }

  checkMyLike() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.putLike()
      } else {
        this.clearLike()
      }
    })

    // const res = (user) => {user._id === this._userId}
    // console.log(res)
    // return this._likes.some(res)
    // return this._likes.some(user => user._id === this._userId);
  }

  // _checkWhoseLike(){
  //   this.checkMyLike() ? this.putLike() : this.clearLike();
  // }



  // _checkWhoseСard(){
  //   if (this._ownerId !== this._userId) {
  //     this._buttonDelete.classList.add('element__delete-button_hidden');
  //   }
  // }

  deleteCardsButton() {
    this._element.remove()
  }

  _setEventListener() {
    this._buttonLike.addEventListener('click', ()=>{

      if (this._buttonLike.classList.contains('element__like-button_active')) {
        this._dislike()
      } else {
        this._likeCard()
      }
    })
    this._buttonDelete.addEventListener('click', ()=>{ this._handleDelitClick(this._id)
    })

    this._cardImage.addEventListener("click", ()=>{
      this._handleCardClick(this._title, this._image)
    })
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = document
    .querySelector(this._cardTemplateSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._likeButtonCount = this._element.querySelector('.element__like-count')

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    if (this._ownerId !== this._userId) {
      this._buttonDelete.classList.add('element__delete-button_hidden')
    }


    this.likesCount(this._likes)
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.putLike()
      } else {
        this.clearLike()
      }})

    this._setEventListener();

    return this._element;
  }


}
