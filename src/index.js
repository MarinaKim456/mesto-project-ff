import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard, addCardFunc} from './components/card.js'
import {openModal, handleFormSubmit, handleEscKeyUp, closeModal} from './components/modal.js';


export const placesList = document.querySelector('.places__list'); 
export const showImg = document.querySelector('.popup_type_image');
export const popupList = document.querySelectorAll('.popup');
export const addCard = document.querySelector('.popup_type_new-card');
export const popupEditOpener = document.querySelector('.profile__edit-button');
export const popupAddOpener = document.querySelector('.profile__add-button');
export const popupImgOpeners = document.querySelectorAll('.card__image');
const popupClosers = document.querySelectorAll('.popup__close');
export const formElement = document.querySelector('.popup__form');
export const cardForm = document.forms['new-place'];
export const overlay = document.querySelector('#overlay-modal');

// !Вывести карточки на страницу
initialCards.forEach((el)=> {
  placesList.append(createCard(el.name, el.link));
});

formElement.addEventListener('submit', handleFormSubmit);

popupEditOpener.addEventListener('click', openModal);
popupAddOpener.addEventListener('click', openModal);

//! добавление карточек
cardForm.addEventListener('submit', addCardFunc);
  
document.addEventListener('keydown', handleEscKeyUp);

//! закрытие крестиком
popupClosers.forEach((popupCloser)=>{
  popupCloser.addEventListener("click", closeModal);
});

//! закрытие попапа нажатием на оверлей
overlay.addEventListener("click",closeModal);