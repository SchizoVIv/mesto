export default class Card {
  constructor(data, cardTemplateSelector, openCardImage, handleDelitClick){
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id
    this._handleDelitClick = handleDelitClick;
    this.data = data;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = openCardImage;
  }

  _toggleLike () {
    this._buttonLike.classList.toggle('element__like-button_active')
  }

  _setLikes() {
    const likeButtonElement = this._element.querySelector('.element__like-count')
    likeButtonElement.textContent = this._likes//.length
  }

  _deleteCardsButton() {
    this._element.remove()
  }

  _setEventListener() {
    this._buttonLike.addEventListener('click', ()=>{
      this._toggleLike()
    })
    console.log(this._handleDelitClick)
    this._buttonDelete.addEventListener('click', ()=>{ this._handleDelitClick(this._id)
    })

    this._cardImage.addEventListener("click", ()=>{
      this._handleCardClick(this._title, this._image)
    })
  }

  createCard() {
    this._element = document
    .querySelector(this._cardTemplateSelector)
    .content.querySelector('.element')
    .cloneNode(true);
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._setLikes()
    this._setEventListener();
    return this._element;
  }
}
