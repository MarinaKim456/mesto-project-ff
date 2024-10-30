import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard} from './components/card.js'
import {openPopup, closePopup} from './components/modal.js';


const placesList = document.querySelector('.places__list'); 
const popupTypeImage = document.querySelector('.popup_type_image');
const addCard = document.querySelector('.popup_type_new-card');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupAddOpener = document.querySelector('.profile__add-button');
const popupClosers = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const editProfile = document.querySelector('.popup_type_edit');
const cardForm = document.forms['new-place'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput  = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');


export const popupImg = (e)=>{ 
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;

  openPopup(popupTypeImage);
};

initialCards.forEach((el)=> {
  placesList.append(createCard(el.name, el.link, popupImg));
});

const popupProfile = () => {
  
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  openPopup(editProfile);
};

popupEditOpener.addEventListener('click', popupProfile);

const popupCard = () => {
  openPopup(addCard);
};

popupAddOpener.addEventListener('click', popupCard);

function addCardFunc(evt){
  evt.preventDefault()
  const inputName = document.querySelector('.popup__input_type_card-name');
  const inputLink = document.querySelector('.popup__input_type_url');
  placesList.prepend(createCard(inputName.value, inputLink.value, popupImg))
  closePopup(addCard);
  cardForm.reset(); 
};

cardForm.addEventListener('submit', addCardFunc);

function handleProfileFormSubmit(evt) {
  
  evt.preventDefault();
  
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  formElement.reset();
  closePopup(editProfile);
};

formElement.addEventListener('submit', handleProfileFormSubmit);

popupClosers.forEach((popupCloser)=>{
  const popupElement = popupCloser.closest('.popup');

  popupCloser.addEventListener("click", ()=> closePopup(popupElement));
});