// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list'); 
// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = function (name, link) {

  const cardElement = cardTmp.querySelector('.card').cloneNode(true)

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').textContent = 'alt';
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteButtonFunction);
   
  return cardElement;
}

// @todo: Функция удаления карточки
const deleteButtonFunction = function (event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
  }
// @todo: Вывести карточки на страницу

initialCards.forEach((el)=> {

  placesList.appendChild(createCard(el.name, el.link));

});