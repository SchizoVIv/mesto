
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button_profile');
const closeButtonCards = document.querySelector('.popup__close-button_cards');
const popup = document.querySelector('.popup-profile');
let popupFieldAbout = document.querySelector('.popup__field_about');
let popupFieldName = document.querySelector('.popup__field_name');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
let popupContent = document.querySelector('#popapContentProfile');
let popupContentCards = document.querySelector('#popapContentCards');
const cards = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup-cards');
const popupFieldLink = popupCards.querySelector('.popup__field_link-card');
const popupFieldNameCards = popupCards.querySelector('.popup__field_name-card');
const likeButton = document.querySelector('.element__like-button');
const windowImg = document.querySelector('.window-img');
const windowImage = windowImg.querySelector('.window-img__image');
const windowCloseButton = windowImg.querySelector('.window-img__close-button');
const windowTitle = windowImg.querySelector('.window-img__title');
const img = document.querySelector('.profile__photo');

const initialCards = [
  {
    name: 'Алина Цветко',
    link: 'https://i.pinimg.com/564x/17/ac/9b/17ac9b9b85f65d91dfb5c3fab93ec495.jpg',
    alt: 'Модель Алина Цветко'
  },
  {
    name: 'Евангелина Фраим',
    link: 'https://i.pinimg.com/750x/fc/2f/6e/fc2f6ee37f27f8bd1204e7fb32f88955.jpg',
    alt: 'Модель Евангелина Фраим'
  },
  {
    name: 'София Фадеева',
    link: 'https://i.pinimg.com/564x/96/a3/44/96a34450be9c5f34d577d0930fbc2530.jpg',
    alt: 'Модель София Фадеева'
  },
  {
    name: 'Крис Спиридонова',
    link: 'https://i.pinimg.com/564x/9b/f9/84/9bf9849458f40c1dac246f38c9ca5b96.jpg',
    alt: 'Модель Крис Спиридонова'
  },
  {
    name: 'Ольга Никонова',
    link: 'https://i.pinimg.com/564x/24/a7/4e/24a74e1ea5b2bef973da515d65cfba6b.jpg',
    alt: 'Модель Ольга Никонова'
  },
  {
    name: 'Просто Ваня',
    link: 'https://i.pinimg.com/564x/09/d6/e9/09d6e965ada215a1d87fb392979f808a.jpg',
    alt: 'Модель Просто Ваня'
  }
];

function openPopap(){
  popup.classList.add('popup_opened')
  popupFieldName.value = profileName.textContent
  popupFieldAbout.value = profileAbout.textContent
}

function closePopap(){
  popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAbout.textContent = popupFieldAbout.value;
    closePopap();
}

function openPopapCards(){
  popupCards.classList.add('popup_opened');
}
function closePopapCards(){
  popupCards.classList.remove('popup_opened');
}
// создание карт
const createCard = card =>{
  const cardTemplate = document.querySelector('#cardTemplate').content.cloneNode(true)
  const cardTitle = cardTemplate.querySelector('.element__title')
  const cardImage = cardTemplate.querySelector('.element__image')
  cardTitle.textContent = card.name
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', card.alt)
  const likeButton = cardTemplate.querySelector('.element__like-button')
  const deleteButton = cardTemplate.querySelector('.element__delete-button')
// лайк
  likeButton.addEventListener('click', like)
// удаление карты
  deleteButton.addEventListener('click', deleteCardsButton)
  cards.append(cardTemplate)
// просмотр картинки
  cardImage.addEventListener("click", event=>{
    openWindowImg()
    windowImage.src = event.target.getAttribute('src')
    windowTitle.innerText = cardTitle.innerText
  })
}

initialCards.forEach(createCard);
function like (event) {
  event.target.classList.toggle('element__like-button_active')
}

function deleteCardsButton(event) {
  const button = event.target
  const card = button.closest('.element')
  card.remove()
}

function createNewCard(event){
  event.preventDefault();
  popupContentCards = event.target
  const cardTitleValue = popupFieldNameCards.value
  const cardImageValue = popupFieldLink.value
  const card = {
    name: cardTitleValue,
    link: cardImageValue
  }
  createCard(card)
  closePopapCards()
}

function openWindowImg(){
  windowImg.classList.add('window-img_opened')
}
function closeWindowImg(){
  windowImg.classList.remove('window-img_opened')
}

editButton.addEventListener("click", openPopap);
closeButton.addEventListener("click", closePopap);
popupContent.addEventListener('submit', handleFormSubmit);
addButton.addEventListener("click", openPopapCards);
closeButtonCards.addEventListener("click", closePopapCards);
popupContentCards.addEventListener('submit', createNewCard);
windowCloseButton.addEventListener("click", closeWindowImg);














