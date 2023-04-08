import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
  {
    name: 'Алина Цветко',
    link: 'https://i.pinimg.com/564x/17/ac/9b/17ac9b9b85f65d91dfb5c3fab93ec495.jpg'
  },
  {
    name: 'Евангелина Фраим',
    link: 'https://i.pinimg.com/750x/fc/2f/6e/fc2f6ee37f27f8bd1204e7fb32f88955.jpg'
  },
  {
    name: 'София Фадеева',
    link: 'https://i.pinimg.com/564x/96/a3/44/96a34450be9c5f34d577d0930fbc2530.jpg'
  },
  {
    name: 'Крис Спиридонова',
    link: 'https://i.pinimg.com/564x/9b/f9/84/9bf9849458f40c1dac246f38c9ca5b96.jpg'
  },
  {
    name: 'Ольга Никонова',
    link: 'https://i.pinimg.com/564x/24/a7/4e/24a74e1ea5b2bef973da515d65cfba6b.jpg'
  },
  {
    name: 'Просто Ваня',
    link: 'https://i.pinimg.com/564x/09/d6/e9/09d6e965ada215a1d87fb392979f808a.jpg'
  }
];


const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseCards = document.querySelector('.popup__close-button_cards');
const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup-profile');
const popupFieldAbout = document.querySelector('.popup__field_about');
const popupFieldName = document.querySelector('.popup__field_name');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupContentProfileForm = document.querySelector('#popapContentProfile');
const popupContentCardsForm = document.querySelector('#popapContentCards');
const cardTemplate = document.querySelector('#cardTemplate').content.querySelector('.element');
const popupCards = document.querySelector('.popup-cards');
const popupFieldLink = popupCards.querySelector('.popup__field_link-card');
const popupFieldNameCards = popupCards.querySelector('.popup__field_name-card');
const cardsContainer = document.querySelector('.elements');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonLike = document.querySelector('.element__like-button');
const windowImgConteiner = document.querySelector('.popup-open-img');
const windowImage = windowImgConteiner.querySelector('.popup-open-img__image');
const windowTitle = windowImgConteiner.querySelector('.popup-open-img__title');
const popupProfileForm = document.forms['popapProfile'];
const popupCardsForm = document.forms['popapCards'];

const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorTypeClass: '.popup__field_type_error',
  errorClassActive: 'popup__input-error_active',
  fieldsetList: '.popup__fieldset',
  inputErrorType: '.popup__input-error_type_',
};

const profileFormValidator = new FormValidator(config, popupProfileForm);
const addingFormValidator = new FormValidator(config, popupCardsForm);

const popupList = document.querySelectorAll('.popup');

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openCardImage (cardName, cardLink) {
  openPopup(windowImgConteiner)
  windowImage.src = cardLink
  windowImage.alt = cardName
  windowTitle.textContent = windowImage.alt
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);

}

function closePopup(popup) {
  if (popup !== undefined) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
}
function findActivePopup(popupList) {
  const list = Array.from(popupList);
  return list.find((popup) => {
    if (popup.classList.contains('popup_opened')) {
      return popup;
    }
  });
}

function handlePopupClose(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}


function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAbout.textContent = popupFieldAbout.value;
    closePopup(popupProfile);
}

function renderCard(card){
  const newCard = createCard(card)
  cardsContainer.prepend(newCard)
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, openCardImage);
  const cardElement = card.createCard();
  return cardElement
}

initialCards.forEach(renderCard);

function createNewCard(event){
  event.preventDefault();
  const cardTitleValue = popupFieldNameCards.value
  const cardImageValue = popupFieldLink.value
  const card = {
    name: cardTitleValue,
    link: cardImageValue
  }
  renderCard(card)
  event.target.reset()
  closePopup(popupCards)
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', handlePopupClose);
});

buttonEditProfile.addEventListener("click", function (){
  popupFieldName.value = profileName.textContent
  popupFieldAbout.value = profileAbout.textContent
  openPopup(popupProfile)
});

popupContentProfileForm.addEventListener('submit', handleProfileFormSubmit);
buttonAdd.addEventListener("click", function (){
  openPopup(popupCards)
});

popupContentCardsForm.addEventListener('submit', createNewCard);

profileFormValidator.enableValidation();
addingFormValidator.enableValidation();
