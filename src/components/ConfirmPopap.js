import Popup from './Popup.js';

export default class ConfirmPopap extends Popup{
  constructor(popupSelector, { callbackSubmit }){
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector(".popup__content");

  }

  handleSubmit(callback) {
    this._callbackSubmit = callback;
  }

  _setEventForSubmit = evt => {
    evt.preventDefault();
    this._callbackSubmit();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this.handleSubmit(this._card)
    });
  }

  open(card) {
    this._card = card
    super.open()
  }
}
