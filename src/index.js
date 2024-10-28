import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard} from './components/card.js'
import {openPopup, handleEscKeyUp, closeModal} from './components/modal.js';


const placesList = document.querySelector('.places__list'); 
const popupTypeImage = document.querySelector('.popup_type_image');
export const popupList = document.querySelectorAll('.popup');
const addCard = document.querySelector('.popup_type_new-card');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupAddOpener = document.querySelector('.profile__add-button');
const popupClosers = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const cardForm = document.forms['new-place'];
export const overlay = document.querySelector('#overlay-modal');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput  = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');


export const popupImg = (e)=>{ 
  overlay.classList.add('active');
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;

  openPopup(popupTypeImage);
};

initialCards.forEach((el)=> {
  placesList.append(createCard(el.name, el.link, popupImg));
});

const popupProfile = () => {
  overlay.classList.add('active');
  const editProfile = document.querySelector('.popup_type_edit');
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  openPopup(editProfile);
  document.addEventListener('keydown', handleEscKeyUp);
};

popupEditOpener.addEventListener('click', popupProfile);

const popupCard = () => {
  overlay.classList.add('active');
  openPopup(addCard);
  document.addEventListener('keydown', handleEscKeyUp);
};

popupAddOpener.addEventListener('click', popupCard);

function addCardFunc(evt){
  evt.preventDefault()
  const inputName = document.querySelector('.popup__input_type_card-name');
  const inputLink = document.querySelector('.popup__input_type_url');
  placesList.prepend(createCard(inputName.value, inputLink.value, popupImg))
  closeModal(evt.target)
  cardForm.reset(); 
};

cardForm.addEventListener('submit', addCardFunc);

function handleFormSubmit(evt) {// Обработчик «отправки» формы
  
  evt.preventDefault();
  
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  formElement.reset();
  closeModal(evt.target)
};

formElement.addEventListener('submit', handleFormSubmit);

popupClosers.forEach((popupCloser)=>{
  popupCloser.addEventListener("click", closeModal);
});

overlay.addEventListener("click",closeModal);