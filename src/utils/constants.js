export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonCloseCards = document.querySelector('.popup__close-button_cards');
export const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
export const popupProfile = document.querySelector('.popup-profile');
export const popupFieldAbout = document.querySelector('.popup__field_about');
export const popupFieldName = document.querySelector('.popup__field_name');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileFoto = document.querySelector('.profile__photo');
export const popupContentProfileForm = document.querySelector('#popapContentProfile');
export const popupContentCardsForm = document.querySelector('#popapContentCards');
export const cardTemplate = document.querySelector('#cardTemplate').content.querySelector('.element');
export const popupCards = document.querySelector('.popup-cards');
export const popupFieldLink = popupCards.querySelector('.popup__field_link-card');
export const popupFieldNameCards = popupCards.querySelector('.popup__field_name-card');
export const cardsContainer = document.querySelector('.elements');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonLike = document.querySelector('.element__like-button');
export const windowImgConteiner = document.querySelector('.popup-open-img');
export const windowImage = windowImgConteiner.querySelector('.popup-open-img__image');
export const windowTitle = windowImgConteiner.querySelector('.popup-open-img__title');
export const popupProfileForm = document.forms['popapProfile'];
export const popupCardsForm = document.forms['popapCards'];
export const popupAvatarForm = document.forms['popapAvatar'];
export const profileButtonAvatar = document.querySelector('.profile__button-avatar');
export const popupEditAvatar = document.querySelector('.popup-edit-avatar')

export const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorTypeClass: '.popup__field_type_error',
  errorClassActive: 'popup__input-error_active',
  fieldsetList: '.popup__fieldset',
  inputErrorType: '.popup__input-error_type_',
};

export const popupList = document.querySelectorAll('.popup');

export const initialCards = [
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
