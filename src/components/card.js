
export const createCard = function (name, link, cardId, ownerId, myId, likes, openCardImage, onDeleteCard, likeFunction) {
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
      deleteButton.addEventListener("click", () => {
        onDeleteCard(cardId, cardElement);
      });
    }
    // если у карточки есть лайки, 
    if (likes){
      //меняем состояние кнопки, если среди лайков есть наши
      if(likes.some(like => like._id === myId)){ 
        likeButton.classList.add('card__like-button_is-active'); 
      }
      else {
      likeButton.classList.remove('card__like-button_is-active');
      }
      //устанавливаем количество лайков
      likeCount.textContent = likes.length;
    }
    //слушатель кликов на кнопку лайка
    likeButton.addEventListener('click', function() {
        likeFunction(likeButton, {cardId, likeCount})
  })
    //слушатель увеличения картинки
    cardImage.addEventListener('click', openCardImage);

    return cardElement;
}