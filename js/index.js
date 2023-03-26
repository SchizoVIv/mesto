
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
const cardsContainer = document.querySelector('.elements');
const buttonAdd = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup-cards');
const popupFieldLink = popupCards.querySelector('.popup__field_link-card');
const popupFieldNameCards = popupCards.querySelector('.popup__field_name-card');
const buttonLike = document.querySelector('.element__like-button');
const windowImgConteiner = document.querySelector('.popup-open-img');
const windowImage = windowImgConteiner.querySelector('.popup-open-img__image');
const windowTitle = windowImgConteiner.querySelector('.popup-open-img__title');
const popupProfileForm = document.forms['popapProfile'];
const popupCardsForm = document.forms['popapCards'];

const popupList = document.querySelectorAll('.popup');
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
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

// создание карт
const createCard = card =>{

  const cardTemplateCopy = cardTemplate.cloneNode(true)
  const cardTitle = cardTemplateCopy.querySelector('.element__title')
  const cardImage = cardTemplateCopy.querySelector('.element__image')
  cardTitle.textContent = card.name
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', card.name)
  const buttonLike = cardTemplateCopy.querySelector('.element__like-button')
  const deleteButton = cardTemplateCopy.querySelector('.element__delete-button')
// лайк
  buttonLike.addEventListener('click', toggleLike)
// удаление карты
  deleteButton.addEventListener('click', deleteCardsButton)
// просмотр картинки
  cardImage.addEventListener("click", event=>{
    openPopup(windowImgConteiner)
    windowImage.src = event.target.getAttribute('src')
    windowImage.alt = event.target.getAttribute('alt')
    windowTitle.textContent = windowImage.alt
  })
  return cardTemplateCopy
}

initialCards.forEach(renderCard);
function toggleLike (event) {
  event.target.classList.toggle('element__like-button_active')
}

function deleteCardsButton(event) {
  const button = event.target
  const card = button.closest('.element')
  card.remove()
}

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
  popup.addEventListener('click', handlePopupClose);
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
