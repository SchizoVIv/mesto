import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._title = this._popup.querySelector('.popup-open-img__title');
    this._image = this._popup.querySelector('.popup-open-img__image');
  }
  open(title, link){
    this._image.src = link;
    this._image.alt = title;
    this._title.textContent = title;
    super.open();
  }
}
