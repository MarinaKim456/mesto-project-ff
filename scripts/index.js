// @todo: Темплейт карточки
  const placesList = document.querySelector('.places__list'); 
  const cardTmp = document.querySelector('#card-template').content;
  
// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = function (name, link) {

   const cardElement = cardTmp.querySelector('.card').cloneNode(true)
   cardElement.querySelector('.card__title').textContent = name;
   cardElement.querySelector('.card__image').textContent = link;

   return cardElement;
   console.log('ddd')
}

// @todo: Функция удаления карточки

const deleteButtonFunction = function (event) {
  const listItem = event.target.closest('.card');

  listItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((el)=> {

  const cardElement = cardTmp.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__title').textContent = el.name;
  cardElement.querySelector('.card__image').setAttribute('src', `${el.link}`);
  cardElement.querySelector('.card__image').textContent = 'alt';
  
  placesList.appendChild(cardElement);

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });
  
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardDeleteButton.addEventListener('click', deleteButtonFunction);
});