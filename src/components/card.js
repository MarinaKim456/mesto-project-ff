
import {myId, popupConfirmDelete, formElement, deleteCardForm, deleteCardFunction} from './../index'
import {putLikeRequest, deleteLikeRequest, deleteCardRequest} from './../scripts/api'
// import {openPopup, closePopup} from './modal';

export const createCard = function (name, link, _id, ownerId, likes, openCardImage) {
  
  
    const cardTmp = document.querySelector('#card-template').content;
    const cardElement = cardTmp.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton  = cardElement.querySelector('.card__delete-button');
    const likeButton  = cardElement.querySelector('.card__like-button')
    const likeCount = cardElement.querySelector('.like-count');
  
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    //определяем хозяина карточки, если не мы, то удаляем иконку удаления
    if (ownerId !== myId) deleteButton.remove();

    //удаление карточки
    // deleteButton.addEventListener("click", () => {
    //   onDeleteCard(data._id, cardElement);
    // });
    deleteButton.addEventListener("click", deleteCardForm)

    // если у карточки есть лайки, выводим количество и меняем состояние кнопки, если среди лайков есть наши
    if (likes){
      likes.forEach((like)=>{
        if(like._id===myId){
          likeButton.classList.add('card__like-button_is-active');
        }
        else {
          likeButton.classList.remove('card__like-button_is-active');
        }
        likeCount.textContent = likes.length;
      })
    }

    cardElement.querySelector('.card__like-button').addEventListener('click', function() {
        if (!likeButton.classList.contains('card__like-button_is-active')){
          putLikeRequest(_id)
          .then((res)=> {
            likeButton.classList.add('card__like-button_is-active');
            likes.length +=1;
            likeCount.textContent = res.likes.length;
          })
        }
        else {
          deleteLikeRequest(_id)
          .then((res)=>{
            likeButton.classList.remove('card__like-button_is-active');
            likes.length -=1;
            likeCount.textContent = res.likes.length;
          })
        }
    });

    cardImage.addEventListener('click', openCardImage);
  

    return cardElement;
}
// export const deleteCardFunction = function (event) {
//     const listItem = event.target.closest('.card');
//     listItem.remove();
//   };



