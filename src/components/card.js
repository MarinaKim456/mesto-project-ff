import {placesList, cardForm, popupImgOpeners} from './../index';
import {openModal, openImg, closeModal} from './modal';

export const createCard = function (name, link) {
    const cardTmp = document.querySelector('#card-template').content;
    const cardElement = cardTmp.querySelector('.card').cloneNode(true)
  
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').setAttribute("alt",name);
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunction);
  
    cardElement.querySelector('.card__like-button').addEventListener('click', likeFunc);

    //! открытие карточек 
    placesList.addEventListener('click', openImg);
  
    return cardElement;
  };

export const deleteCardFunction = function (event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
  };

export function addCardFunc(evt){
    evt.preventDefault()
    const inputName = document.querySelector('.popup__input_type_card-name');
    const inputLink = document.querySelector('.popup__input_type_url');
    placesList.prepend(createCard(inputName.value, inputLink.value))
  
    closeModal(evt.target)
    cardForm.reset(); 
  };

export function likeFunc(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  };