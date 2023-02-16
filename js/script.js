
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');

function openPopap(){
  popup.classList.add('popup_opened');
}
function closePopap(){
  popup.classList.remove('popup_opened');
}
editButton.addEventListener("click", openPopap);
closeButton.addEventListener("click", closePopap);
saveButton.addEventListener("click", closePopap);


let popupFieldAbout = document.querySelector('.popup__field-about');
let popupFieldName = document.querySelector('.popup__field-name');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');


function handleFormSubmit (evt) {
    evt.preventDefault();
    let name = document.querySelector('.popup__field-name').value;
    let work = document.querySelector('.popup__field-about').value;

    if(name === ''){
      return name;
    }else{
      profileName.textContent = name;
    }
    if(work === ''){
      return work;
    }else{
      profileAbout.textContent = work;
    }
}
popupFieldName.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   saveButton.click();
  }
});
popupFieldAbout.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   saveButton.click();
  }
});
saveButton.addEventListener('submit', handleFormSubmit);
saveButton.onclick = handleFormSubmit;
