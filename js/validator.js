class Validator{
  constructor(config, formElement){
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError (inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`${this._config.inputErrorType}${inputElement.id}`);
    inputElement.classList.add(this._config.inputErrorTypeClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._config.errorClassActive);
  }

  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`${this._config.inputErrorType}${inputElement.id}`);
    inputElement.classList.remove(this._config.inputErrorTypeClass);
    this._errorElement.classList.remove(this._config.errorClassActive);
    this._errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, inputElement.validationMessage )
      console.log('input is not valid')
    }else{
      this._hideInputError(inputElement)
      console.log('input is valid')
    }
  }

  _setEventListeners () {
    this._toggleButtonState();

    this._formElement.addEventListener('reset', () => {
      this._disableButton();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=>{
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput (){
    return this._inputList.some((inputElement) =>{
      return !inputElement.validity.valid;
    })
  }

  _disableButton (){
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton (){
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState(){
    this._disableButton();
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._enableButton ()
    }
  }

  enableValidation(){
    this._setEventListeners();
  }
}






