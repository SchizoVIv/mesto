import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
  constructor(popupSelector, {callbackSubmit}){
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._popupForm = this._popup.querySelector('.popup__content')
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__field'));
    this._saveButton = this._popupForm.querySelector('.popup__save-button');
  }

  _getInputValues(){
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  runLoading(isLoading) {
    isLoading
      ? (this._saveButton.textContent = 'Сохранение...')
      : (this._saveButton.textContent = 'Сохранить');
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }
}
