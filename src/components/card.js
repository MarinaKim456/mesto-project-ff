export const createCard = function (name, link, popupImg) {
  
    const cardTmp = document.querySelector('#card-template').content;
    const cardElement = cardTmp.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunction);
  
    cardElement.querySelector('.card__like-button').addEventListener('click', likeFunc);

    cardImage.addEventListener('click', popupImg)
    
    return cardElement;
  };

export const deleteCardFunction = function (event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
  };

export function likeFunc(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  };