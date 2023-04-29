import './index.css';
import {
  config,
  popupProfileForm,
  popupCardsForm,
  initialCards,
  cardsContainer,
  buttonEditProfile,
  popupFieldName,
  popupFieldAbout,
  profileName,
  profileAbout,
  buttonAdd} from '../utils/constants.js';
import {FormValidator} from '../js/FormValidator.js';
import Card from '../js/Card.js';
import Section from '../js/Section.js';
import PopupWithImage from '../js/PopupWithImage.js';
import PopupWithForm from '../js/PopupWithForm.js';
import UserInfo from '../js/UserInfo.js';
// import path from 'path';

const profileFormValidator = new FormValidator(config, popupProfileForm);
const addingFormValidator = new FormValidator(config, popupCardsForm);

const sectionList = new Section(
  {
    items: initialCards,
    renderer: cardData => {
      const card = new Card(cardData, '#cardTemplate', handlePopupOpen);
      const cardElement = card.createCard();
      sectionList.addItem(cardElement);
    }
  },
  cardsContainer
);

sectionList.renderer()

function createCard(cardData) {
  const card = new Card(cardData, '#cardTemplate', handlePopupOpen);
  const cardElement = card.createCard();
  return cardElement
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about',
  userInputNameSelector: '.popup__field_name',
  abouInputtUserSelector: '.popup__field_about'
});

const popupWithImage = new PopupWithImage('.popup-open-img')
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm('.popup', {
  callbackSubmit: userData => {
  const newInfo = {
    userName: userData.name,
    aboutUser: userData.about };
  console.log(newInfo)
  userInfo.setUserInfo(newInfo);
  popupWithForm.close();
}} )
popupWithForm.setEventListeners();

function handlePopupOpen(cardName, cardLink){
  popupWithImage.open(cardName, cardLink);
}

const popupAddCard = new PopupWithForm('.popup-cards', {
  callbackSubmit: cardData => {
    console.log(cardData)
    const newCard = {
      name: cardData.title,
      link: cardData.link
    };
    sectionList.addItem(createCard(newCard));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

buttonEditProfile.addEventListener("click", function (){
  const profileInfo = userInfo.getUserInfo();
  popupFieldName.value = profileInfo.userName
  popupFieldAbout.value = profileInfo.aboutUser
  popupWithForm.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
})

profileFormValidator.enableValidation();
addingFormValidator.enableValidation();
