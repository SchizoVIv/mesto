
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button_profile');
const buttonCloseCards = document.querySelector('.popup__close-button_cards');
const buttonClosePopup = document.querySelectorAll('.popup__close-button');
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupFieldAbout = document.querySelector('.popup__field_about');
const popupFieldName = document.querySelector('.popup__field_name');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupContentProfileForm = document.querySelector('#popapContentProfile');
const popupContentCardsForm = document.querySelector('#popapContentCards');
const cardTemplate = document.querySelector('#cardTemplate').content.querySelector('.element');
const cardsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup-cards');
const popupFieldLink = popupCards.querySelector('.popup__field_link-card');
const popupFieldNameCards = popupCards.querySelector('.popup__field_name-card');
const likeButton = document.querySelector('.element__like-button');
const windowImg = document.querySelector('.popup-open-img');
const windowImage = windowImg.querySelector('.popup-open-img__image');
const windowCloseButton = windowImg.querySelector('.popup-open-img__close-button');
const windowTitle = windowImg.querySelector('.popup-open-img__title');
const img = document.querySelector('.profile__photo');

popupFieldName.value = profileName.textContent
popupFieldAbout.value = profileAbout.textContent

buttonClosePopup.forEach((button) => {
  button.addEventListener('click', () => {
  button.parentElement.classList.remove('popup_opened')
  });
});
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened')
}

document.querySelectorAll('.popup__close-button').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAbout.textContent = popupFieldAbout.value;
    closePopup(popupProfile);
}

function closeWindowImg(){
  windowImg.classList.remove('popup_opened')
}
console.log(cardTemplate);

const render = function renderCard(card){
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
  const likeButton = cardTemplateCopy.querySelector('.element__like-button')
  const deleteButton = cardTemplateCopy.querySelector('.element__delete-button')
// лайк
  likeButton.addEventListener('click', like)
// удаление карты
  deleteButton.addEventListener('click', cardsButtonDelete)
// просмотр картинки
  cardImage.addEventListener("click", event=>{
    openPopup(windowImg)
    windowImage.src = event.target.getAttribute('src')
    windowImage.alt = event.target.getAttribute('alt')
    windowTitle.textContent = windowImage.alt
  })
  return cardTemplateCopy
}

initialCards.forEach(render);
function like (event) {
  event.target.classList.toggle('element__like-button_active')
}

function cardsButtonDelete(event) {
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
  render(card)
  closePopup(popupCards)
}
buttonEdit.addEventListener("click", function (){
  openPopup(popupProfile)
});
popupContentProfileForm.addEventListener('submit', handleFormSubmit);
addButton.addEventListener("click", function (){
  openPopup(popupCards)
});
popupContentCardsForm.addEventListener('submit', createNewCard);















