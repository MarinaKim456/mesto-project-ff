import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard} from './components/card.js'
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, updateAvatarRequest, getCardsRequest, createNewCardRequest, updateProfileInfoRequest, deleteLikeRequest, putLikeRequest } from './scripts/api.js'

//список карточек
const placesList = document.querySelector('.places__list'); 
//попап увеличенного изображения
const popupTypeImage = document.querySelector('.popup_type_image');
//попап добавления новой карточки
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

//попапы редактирования форм
export const formElement = document.querySelector('.popup__form');
const editProfile = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
export const deleteCardForm = document.forms['delete-card'];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput  = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
export let myId = null;
let cardId = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const loading = {
  start: btn => btn.textContent = 'Сохранение...',
  stop: btn => btn.textContent = 'Сохранить',
}

//редактирование аватара
const openPopupAvatar = () => {
  openPopup(popupUpdateAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig)
};

profileImage.addEventListener('click', openPopupAvatar);

avatarForm.addEventListener('submit', function(evt){
  loading.start(evt.submitter);
  evt.preventDefault();
  updateAvatarRequest(popupAvatarUrl.value)
  .then((newUser)=> {
    profileImage.style.backgroundImage = `url('${newUser.avatar}')`;
  })
  .catch((err) => {
    console.log('Ошибка: ', err);
  })
  .finally(()=>{
    loading.stop(evt.submitter);
    closePopup(popupUpdateAvatar);
  })
});

//попап редактирования профиля
const openPopupProfile = () => {
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  openPopup(editProfile);
  clearValidation(editProfileForm, validationConfig)
};

popupEditOpener.addEventListener('click', openPopupProfile);

//редактирование профиля
const updateUserInfo = (user)=>{
  name.textContent = user.name;
  job.textContent = user.about;
  profileImage.style.backgroundImage = "url('" + user.avatar + "')";
}

//редактирование профиля
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
    closePopup(editProfile);
  })
};

//увеличенное изображение картинки
export const openCardImage = (e)=>{ 
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;
  openPopup(popupTypeImage);
};

//попап добавления новой карточки
const openPopupCard = () => {
  openPopup(addCard);
  cardForm.reset();
  clearValidation(cardForm, validationConfig)
};
popupAddOpener.addEventListener('click', openPopupCard);

// добавление новой карточки
function addCardFunc(evt){
  loading.start(evt.submitter);
  evt.preventDefault();
  createNewCardRequest ({
      name: inputName.value,
      link: inputLink.value,
    })
      .then((newCardData) => {
        cardId = newCardData._id;
        
        createCard({
          name: newCardData.name,
          link: newCardData.link,
          cardId: newCardData._id,
          ownerId: newCardData.owner._id,
          myId: myId,
          likes: newCardData.likes,
          openCardImage: openCardImage,
          openPopupDelete: openPopupDelete,
        })
      })
    .then((card) =>{
      placesList.prepend(card)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(()=>{
      loading.stop(evt.submitter);
      closePopup(addCard);
    })
  };



//попап удаления карточки
export const openPopupDelete = () => {
  openPopup(popupConfirmDelete);
};

//подтверждение удаления карточки
deleteCardForm.addEventListener('submit', function(evt){
  evt.preventDefault();
});

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
    showInitialCards(cards);
})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
})

//вывод карточек одногруппников
const showInitialCards = (cards)=>{
  cards.forEach((el)=>{
    placesList.append(createCard(el.name, el.link, el._id, el.owner._id, myId, el.likes, openCardImage, openPopupDelete));
  })
};

enableValidation(validationConfig)