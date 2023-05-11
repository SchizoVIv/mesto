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
  buttonAdd} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import ConfirmPopap from '../components/ConfirmPopap.js';

let userId

const profileFormValidator = new FormValidator(config, popupProfileForm);
const addingFormValidator = new FormValidator(config, popupCardsForm);


const api = new Api(
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1e197306-3c80-4dea-abe5-170206fcfc3b',
    'Content-Type': 'application/json'
  }
})
api.getProfile()
  .then( res => {
    const info = {
      userName: res.name,
      aboutUser: res.about
    };
    userInfo.setUserInfo(info)
  })

  api.getCards()
    .then(cardList => {
      cardList.forEach(data => {
        const newCard = {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id
        };
        sectionList.addItem(createCard(newCard))
      })
    })


const sectionList = new Section(
  {
    items: initialCards,
    renderer: cardData => {
      const newCardElement = createCard(cardData);
      sectionList.addItem(newCardElement);
    }
  },
  cardsContainer
);

sectionList.renderer()

const popupConfirm = new ConfirmPopap('.popup-question', {
  callbackSubmit: card => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.remove()
        popupConfirm.close()
      })
      .catch(err => {
        console.warn(`Error: ${err.status} - ${err.statusText}`);
      });
  }
})
popupConfirm.setEventListeners();

function createCard(cardData) {
  const card = new Card(cardData, '#cardTemplate', handlePopupOpen, userId,
    () => {
    console.log('удаление карточки')
    popupConfirm.open()
    popupConfirm.handleSubmit
    },
    () => {

    }
  );
  const cardElement = card.createCard();
  return cardElement
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about',
});

const popupWithImage = new PopupWithImage('.popup-open-img')
popupWithImage.setEventListeners();


const popupWithForm = new PopupWithForm('.popup-profile', {
  callbackSubmit: userData => {
  const newInfo = {
    userName: userData.name,
    aboutUser: userData.about
  };

  api.editProfile(userData) //сохраняет измененные данные профиля после обновления
    .then( res => {
      console.log('res', res)
      userInfo.setUserInfo(newInfo);
      popupWithForm.close();
    })
}} )
popupWithForm.setEventListeners();

function handlePopupOpen(cardName, cardLink){
  popupWithImage.open(cardName, cardLink);
}

const popupAddCard = new PopupWithForm('.popup-cards', {
  callbackSubmit: cardData => {
    const newCard = {
      name: cardData.title,
      link: cardData.link,
      likes: cardData.likes,
      id: res._id
    };
    api.addCard(newCard)
      .then(res => {
        console.log('res', res)
        sectionList.addItem(createCard(newCard));
        popupAddCard.close();
      })
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
