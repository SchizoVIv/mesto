import './index.css';
import {
  config,
  popupProfileForm,
  popupCardsForm,
  popupAvatarForm,
  profileButtonAvatar,
  cardsContainer,
  buttonEditProfile,
  popupFieldName,
  popupFieldAbout,
  buttonAdd,
  profileName,
  profileAbout,
  profileFoto} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import ConfirmPopup from '../components/ConfirmPopup.js';


let userId

const profileFormValidator = new FormValidator(config, popupProfileForm);
const addingFormValidator = new FormValidator(config, popupCardsForm);
const editAvatarFormPopup = new FormValidator(config, popupAvatarForm);



const api = new Api(
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1e197306-3c80-4dea-abe5-170206fcfc3b',
    'Content-Type': 'application/json'
  }
})

api
  .getProfileFromServer()
  .then( res => {
    const info = {
      name: res.name,
      about: res.about,
      avatar: res.avatar
    };

    userInfo.setUserInfo(res)
  })


  // api
  //   .getCardsFromServer()
  //   .then(cardList => {
  //     cardList.forEach(data => {
  //       sectionList.addItem(createCard(data))
  //     })
  //   })

const popupWithImage = new PopupWithImage('.popup-open-img')
popupWithImage.setEventListeners();

function handlePopupOpen(cardName, cardLink){
  popupWithImage.open(cardName, cardLink);
}

const sectionList = new Section(
  {
    renderer: cardData => {
      const newCardElement = createCard(cardData);
      sectionList.addItem(newCardElement);
    }
  },
  cardsContainer
);

const popupConfirm = new ConfirmPopup('.popup-question', {
  callbackSubmit: card => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.remove()
        popupConfirm.close()
      })
      .catch(err => {
        console.warn(`Error: ${err}`);
      });
  }
})
popupConfirm.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    '#cardTemplate',
    handlePopupOpen,
    userId,
  {
    handleDelitClick: () => {
    popupConfirm.open(card)
    popupConfirm.handleSubmit(() => {
      api
        .removeCard(cardData._id)
        .then(() => {
          card.deleteCard()
          popupConfirm.close();
        })
        .catch(err => { console.log(`Error: ${err}`)});
    })}
  },
  {
    likeCard: () => {
      api
        .addLike(cardData._id)
        .then((item) => {
          card.putLike()
          card.likesCount(item.likes)
        })
        .catch(err => { console.log(`Error: ${err}`)});
    }
  },
  {
    dislike: () => {
      api
        .removeLike(cardData._id)
        .then((item) => {
          card.clearLike()
          card.likesCount(item.likes)
        })
        .catch(err => { console.log(`Error: ${err}`)});
    }
  },

  );
  const cardElement = card.createCard();
  return cardElement
}


const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  aboutUserSelector: '.profile__about',
  profileAvatarSelector: '.profile__photo'
})


const popupWithForm = new PopupWithForm('.popup-profile', {
  callbackSubmit: userData => {
  const newInfo = {
    userName: userData.name,
    aboutUser: userData.about,
    userAvatar: userData.avatar
  };
  popupWithForm.runLoading(true);
  api
    .editProfile(userData) //сохраняет измененные данные профиля после обновления
    .then( res => {
      console.log('res', res)
      userInfo.setUserInfo(res);
      popupWithForm.close();
    })
    .finally(() => popupWithForm.runLoading(false));
}})
popupWithForm.setEventListeners();

const popupAddCard = new PopupWithForm('.popup-cards', {
  callbackSubmit: cardData => {
    const newCard = {
      name: cardData.title,
      link: cardData.link,
      likes: cardData.likes,
      id: cardData._id
    };
    popupAddCard.runLoading(true);
    api.addCard(newCard)
      .then(res => {
        sectionList.addItem(createCard(res));
        popupAddCard.close();
      })
      .finally(() => popupAddCard.runLoading(false));
  }
});
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', {
  callbackSubmit: profileData => {
    popupEditAvatar.runLoading(true);
    api
      .updateUserAvatar(profileData)
      .then(res => {
        userInfo.setAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch(err => {
        console.warn(`Ошибка загрузки автара: ${err} - ${err.statusText}`);
      })
      .finally(() => popupEditAvatar.runLoading(false));
  }
});
popupEditAvatar.setEventListeners(); 


Promise
  .all([api.getProfileFromServer(), api.getCardsFromServer()])
    .then(([profileData, cardData]) => {
      userInfo.setUserInfo(profileData)
      userInfo.setAvatar(profileData.avatar)
      userId = profileData._id
      console.log(sectionList)
      sectionList.renderer(cardData)
    })

buttonEditProfile.addEventListener("click", function (){
  const profileInfo = userInfo.getUserInfo();
  popupFieldName.value = profileInfo.name
  popupFieldAbout.value = profileInfo.about
  popupWithForm.open();
});


profileButtonAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
})

profileFormValidator.enableValidation();
addingFormValidator.enableValidation();
editAvatarFormPopup.enableValidation();
