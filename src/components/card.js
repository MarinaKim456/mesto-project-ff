import {putLikeRequest, deleteLikeRequest} from './../scripts/api'

export const createCard = function (name, link, cardId, ownerId, myId, likes, openCardImage, openPopupDelete) {
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
    if (ownerId !== myId) {
      deleteButton.remove();
    }
    else {//вызов попапа удаления карточки
      deleteButton.addEventListener("click", openPopupDelete);
    }
    
    // если у карточки есть лайки, выводим количество и меняем состояние кнопки, если среди лайков есть наши
    if(likes.some(like => like._id === myId)){ 
      console.log(name);
      // console.log(myId);
      console.log(likes);
      likeButton.classList.add('card__like-button_is-active'); 
    }  
    // else {
    //   likeButton.classList.remove('card__like-button_is-active');
    // }

    likeButton.addEventListener('click', likeFunction(likeButton, {cardId, likeCount}))

    cardImage.addEventListener('click', openCardImage);

    return cardElement;
}

//постановка/удаление лайка
function likeFunction (likeButton, {cardId, likeCount}) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLikeRequest : putLikeRequest;
  likeMethod(cardId) 
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active'); 
      likeCount.textContent = res.likes.length;
    })
    .catch(err => console.log(err));
}




// function likeFunction (likeButton, {cardId, likeCount}){
//   if (!likeButton.classList.contains('card__like-button_is-active')){
//     putLikeRequest(cardId)
//     .then((res)=> {
//       likeButton.classList.add('card__like-button_is-active');
//       likeCount.textContent = res.likes.length;
//     })
//   }
//   else {
//     deleteLikeRequest(cardId)
//     .then((res)=>{
//       likeButton.classList.remove('card__like-button_is-active');
//       likeCount.textContent = res.likes.length;
//     })
//   }
// };
