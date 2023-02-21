
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');
let popupFields = document.querySelector('.popup__fields');
let popupFieldAbout = document.getElementById('inputAbout');
let popupFieldName = document.getElementById('inputName');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
let popupContent = document.querySelector('.popup__content');

function openPopap(){
  popup.classList.add('popup_opened');
  popupFieldName.value = profileName.textContent;
  popupFieldAbout.value = profileAbout.textContent;
}

function closePopap(){
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAbout.textContent = popupFieldAbout.value;
    closePopap();
}

editButton.addEventListener("click", openPopap);
closeButton.addEventListener("click", closePopap);

popupContent.addEventListener('submit', handleFormSubmit);
