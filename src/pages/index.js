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
import ConfirmPopap from '../components/ConfirmPopap.js';

// Promise.all([api.getRealUserInfo(), api.getInitialCards()])
//   .then(([userProfile, cards]) => {
//     user.setUserInfo(userProfile)
//     userId = userProfile._id
//     cardList.renderItems(cards)
//   })



let userId

const profileFormValidator = new FormValidator(config, popupProfileForm);
const addingFormValidator = new FormValidator(config, popupCardsForm);
// const editAvatarFormPopup = new FormValidator(config, popupAvatarForm);



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
    console.log(info)
    console.log(res)
    console.log('!')

    userInfo.setUserInfo(res)
  })
// api
//   .getProfileFromServer()
//   .then( res => {
//     const info = {
//       userName: res.name,
//       aboutUser: res.about,
//       userAvatar: res.avatar
//     };
//     console.log(info)
//     console.log(res)

//     userInfo.setUserInfo(res)
//   })

  api
    .getCardsFromServer()
    .then(cardList => {
      cardList.forEach(data => {
        sectionList.addItem(createCard(data))
      })
    })

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

const popupConfirm = new ConfirmPopap('.popup-question', {
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
    console.log('подтверждение удаление карточки')
    popupConfirm.open(card)
    popupConfirm.handleSubmit(() => {
      api
        .removeCard(cardData._id)
        .then(() => {
          card.deleteCardsButton()
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
          console.log(`index likeCard ${cardData}`)
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
          console.log(`index dislike ${cardData}`)
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
});profileName
console.log(userInfo)


const popupWithForm = new PopupWithForm('.popup-profile', {
  callbackSubmit: userData => {
    console.log('!')
  const newInfo = {
    userName: userData.name,
    aboutUser: userData.about,
    userAvatar: userData.avatar
  };

  api
    .editProfile(userData) //сохраняет измененные данные профиля после обновления
    .then( res => {
      console.log('res', res)
      console.log(userData)
      userInfo.setUserInfo(res);
      popupWithForm.close();
    })
}})
popupWithForm.setEventListeners();

const popupAddCard = new PopupWithForm('.popup-cards', {
  callbackSubmit: cardData => {
    console.log(cardData)
    const newCard = {
      name: cardData.title,
      link: cardData.link,
      likes: cardData.likes,
      id: cardData._id
    };
    api.addCard(newCard)
      .then(res => {
        sectionList.addItem(createCard(res));
        console.log(res)

        popupAddCard.close();
      })
  }
});
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', {
  callbackSubmit: profileData => {
    api
      .updateUserAvatar(profileData)
      .then(res => {
        //console.log(res);
        userInfo.setAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch(err => {
        console.warn(`Ошибка загрузки автара: ${err} - ${err.statusText}`);
      })
  }
});
popupEditAvatar.setEventListeners();


  Promise.all([api.getProfileFromServer(), api.getCardsFromServer()])
  .then(([profileData, cardData]) => {
    userInfo.setUserInfo(profileData)
    userId = profileData._id
    sectionList.renderItems(cardData)
  })

buttonEditProfile.addEventListener("click", function (){
  const profileInfo = userInfo.getUserInfo();
  popupFieldName.value = profileInfo.name
  popupFieldAbout.value = profileInfo.about
  popupWithForm.open();
});


profileButtonAvatar.addEventListener('click', () => {
  // editAvatarFormPopup.resetValidation();
  popupEditAvatar.open();
});

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
})

profileFormValidator.enableValidation();
addingFormValidator.enableValidation();
// editAvatarFormPopup.enableValidation();
