import Popup from './Popup.js';

export default class ConfirmPopup extends Popup{
  constructor(popupSelector, callbackSubmit ){
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector(".popup__content");

  }

  handleSubmit(callback) {
    this._callbackSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._callbackSubmit(this._card)
    });
  }

  open(card) {
    this._card = card
    super.open()
  }
}
