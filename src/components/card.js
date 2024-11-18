
import {myId, popupDelete} from './../index'
import {putLikeRequest, deleteLikeRequest} from './../scripts/api'

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

    //вызов попапа удаления карточки
    deleteButton.addEventListener("click", popupDelete);

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
