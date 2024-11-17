import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard} from './components/card.js'
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, avatarRequest, getCardsRequest, getNewCardRequest, deleteCardRequest, updateProfileInfoRequest } from './scripts/api.js'

//список карточек
const placesList = document.querySelector('.places__list'); 
const popupTypeImage = document.querySelector('.popup_type_image');
const addCard = document.querySelector('.popup_type_new-card');
//кнопка редактирования профиля
const popupEditOpener = document.querySelector('.profile__edit-button');
//кнопка редактирования изображения аватара
const popupUpdateAvatar = document.querySelector('.popup-update-avatar');
//url изображения для аватара
const popupAvatarUrl = document.querySelector('.popup__input_avatar_url');
//аватар профиля
const profileImage = document.querySelector('.profile__image')
//кнопка добавления новой карточки
const popupAddOpener = document.querySelector('.card__add-button');
//попап подтверждения удаления карточки
export const popupConfirmDelete = document.querySelector('.popup-confirm-delete');
//кнопки закрытия попапов
const popupClosers = document.querySelectorAll('.popup__close');
//кнопка удаления карточки
export const deleteButton  = document.querySelector('.card__delete-button');

export const formElement = document.querySelector('.popup__form');
//попап редактирования профиля
const editProfile = document.querySelector('.popup_type_edit');
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
export const deleteCardForm = document.forms['delete-card'];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput  = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
// export const myId = '3632a5461a46f16a9de1aa57'
export let myId = null;

const validationConfig = {
  formElement: '.popup__form',
  formInput: '.popup__input',
}

const loading = {
  start: btn => btn.textContent = 'Сохранение...',
  stop: btn => btn.textContent = 'Сохранить',
}

//редактирование аватара
const popupAvatar = () => {
  openPopup(popupUpdateAvatar);
};

profileImage.addEventListener('click', popupAvatar);

avatarForm.addEventListener('submit', function(evt){
  loading.start(evt.submitter);
  evt.preventDefault();
  avatarRequest(popupAvatarUrl.value)
  .then(()=> {
    console.log(popupAvatarUrl.value);
    profileImage.style.backgroundImage = "url('" + popupAvatarUrl.value + "')";
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  })
  .finally(()=>{
    loading.stop(evt.submitter);
    // clearValidation(evt.target, )
    formElement.reset();
    closePopup(popupUpdateAvatar);
  })
});

//увеличенное изображение картинки
export const openCardImage = (e)=>{ 
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;
  openPopup(popupTypeImage);
};

//попап редактирования профиля
const popupProfile = () => {
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  openPopup(editProfile);
};

popupEditOpener.addEventListener('click', popupProfile);

//редактирование профиля
const updateUserInfo = (user)=>{
  name.textContent = user.name;
  job.textContent = user.about;
  profileImage.style.backgroundImage = "url('" + user.avatar + "')";
}

//обработчик редактирования профиля
function handleProfileFormSubmit(evt) {
  loading.start(evt.submitter);
  evt.preventDefault();
  updateProfileInfoRequest()
  .then((data) => {
    name.textContent = data.name;
    job.textContent = data.about;
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  })
  .finally(()=>{
    loading.stop(evt.submitter);
    formElement.reset();
    closePopup(editProfile);
  })
};

//попап добавления новой карточки
const popupCard = () => {
  openPopup(addCard);
};
popupAddOpener.addEventListener('click', popupCard);

//попап удаления карточки
export const popupDelete = () => {
  openPopup(popupConfirmDelete);
};

// let cardForDelete = {}
// const handleDeleteCard = (cardId, cardElement) => {
//   cardForDelete = {
//     id: cardId,
//     cardElement
//   }
//   openPopup(popupConfirmDelete);
// };
// const handleDeleteCardSubmit = (evt) => {
//   evt.preventDefault();
//  if (!cardForDelete.cardElement) return;

//   removeCard(cardForDelete.id)
//     .then(() => {
//       cardForDelete.cardElement.remove();
//       formElement.reset();
//       closePopup(popupConfirmDelete);
//       cardForDelete = {};
//     })
//     .catch((err) => {
//       console.log('Ошибка: ', err);
//     })
// }

// добавление новой карточки
function addCardFunc(evt){
  loading.start(evt.submitter);
  evt.preventDefault();
    getNewCardRequest ({
      name: inputName.value,
      link: inputLink.value,
    })
      .then((newCardData) => {
        createCard({
          name: newCardData.name,
          link: newCardData.link,
          id: newCardData._id,
          ownerId: newCardData.owner._id,
          likes: newCardData.likes,
        })
      })
    .then((card) =>{
      placesList.prepend(card)
      closePopup(addCard);
      cardForm.reset(); 
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(()=>{
      loading.stop(evt.submitter);
    })
  };



//обработчик подтверждения добавления карточки
cardForm.addEventListener('submit', addCardFunc);
//обработчик подтверждения редактирования профиля
formElement.addEventListener('submit', handleProfileFormSubmit);
//обработчик закрытия попапа нажатием на крестик
popupClosers.forEach((popupCloser)=>{
  const popupElement = popupCloser.closest('.popup');
  popupCloser.addEventListener("click", ()=> closePopup(popupElement));
});

Promise.all([getUserInfo(), getCardsRequest()])
  .then(([user, cards])=>{
    myId = user._id;
    updateUserInfo(user);
    getInitialCards(cards);
})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
})

//вывод карточек одногруппников
const getInitialCards = (cards)=>{
  cards.forEach((el)=>{
    placesList.append(createCard(el.name, el.link, el._id, el.owner._id, el.likes, openCardImage));
  })
};



//!!!!!!!!!!!!!


// очистка ошибок валидации вызовом clearValidation

// clearValidation(editProfile, validationConfig) {  
//   closePopup(editProfile);
// }

// clearValidation(profileForm, validationConfig); 
// которая очищает ошибки валидации формы и делает кнопку неактивной. 
// Эта функция должна принимать как параметры DOM-элемент формы, для которой очищаются 
// ошибки валидации и объект с настройками валидации. Используйте функцию clearValidation 
// при заполнении формы профиля 
// во время её открытия и при очистке формы добавления карточки.
// const container = document.forms["todo-list"];
// const cards = initHandlers(placesList, "card-template");//"todo-item"//addCardFunc

// function handleError(err) {
//   console.log(`error ${err.code}: ${err.error}`);
// }