
const showInputError = (formElement, inputElement, inputErrorType, errorMessage, inputErrorTypeClass, errorClassActive) => {
  const errorElement = formElement.querySelector(`${inputErrorType}${inputElement.id}`);
  inputElement.classList.add(inputErrorTypeClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassActive);
}

const hideInputError = (formElement, inputElement, inputErrorType, inputErrorTypeClass, errorClassActive) => {
  const errorElement = formElement.querySelector(`${inputErrorType}${inputElement.id}`);
  inputElement.classList.remove(inputErrorTypeClass);
  errorElement.classList.remove(errorClassActive);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, config)=>{
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, config.inputErrorType, inputElement.validationMessage, config.inputErrorTypeClass, config.errorClassActive)
  }else{
    hideInputError(formElement, inputElement, config.inputErrorType, config.inputErrorTypeClass, config.errorClassActive)
  }
}

const setEventListeners = (formElement, config)=>{

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, config);
  });

  inputList.forEach((input) => {
    input.addEventListener('input', ()=>{
      checkInputValidity(formElement, input, config)
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {

  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetList));
    fieldsetList.forEach((fieldSet) => {
      console.log(fieldSet)
      setEventListeners(fieldSet, config);
    });
  });
};

function hasInvalidInput (inputList){
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

function disableButton (buttonElement, config){
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function enableButton (buttonElement, config){
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, config){
  disableButton(buttonElement, config);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config)
  } else {
    enableButton (buttonElement, config)
  }
}

enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorTypeClass: '.popup__field_type_error',
  errorClassActive: 'popup__input-error_active',
  fieldsetList: '.popup__fieldset',
  inputErrorType: '.popup__input-error_type_',
});
