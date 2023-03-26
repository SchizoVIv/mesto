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

const checkInputValidity = (formElement, inputElement, inputErrorType, inputErrorTypeClass, errorClassActive)=>{
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputErrorType, inputElement.validationMessage, inputErrorTypeClass, errorClassActive)
    console.log('input is not valid')
  }else{
    hideInputError(formElement, inputElement, inputErrorType, inputErrorTypeClass, errorClassActive)
    console.log('input is valid')
  }
}

const setEventListeners = (formElement, inputErrorType, inputSelector, submitButtonSelector, inputErrorTypeClass, errorClassActive, inactiveButtonClass)=>{

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
console.log(buttonElement)
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, inactiveButtonClass);
  });

  inputList.forEach((input) => {
    input.addEventListener('input', ()=>{
      checkInputValidity(formElement, input, inputErrorType, inputErrorTypeClass, errorClassActive)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = (config) => {
  const forms = document.forms;
  const formList = Array.from(forms);
  console.log(formList)

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config.inputErrorType, config.inputSelector, config.submitButtonSelector, config.inputErrorTypeClass, config.errorClassActive, config.inactiveButtonClass);
  });
};

function hasInvalidInput (inputList){
  return inputList.some((inputElement) =>{
    return !inputElement.validity.valid;
  })
}

function disableButton (buttonElement, inactiveButtonClass){
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
  console.log(buttonElement)
}

function enableButton (buttonElement, inactiveButtonClass){
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass){
  disableButton(buttonElement, inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass)
  } else {
    enableButton (buttonElement, inactiveButtonClass)
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
