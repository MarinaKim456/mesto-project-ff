import {initialCards} from "./scripts/cards.js"
import './pages/index.css'
import {forEach} from "core-js/actual/array";
import {createCard} from './components/card.js'
import {openPopup, closePopup} from './components/modal.js';


const placesList = document.querySelector('.places__list'); 
const popupTypeImage = document.querySelector('.popup_type_image');
const addCard = document.querySelector('.popup_type_new-card');
// const buttonElement = document.querySelector('.popup__button');
const popupEditOpener = document.querySelector('.profile__edit-button');
const popupAddOpener = document.querySelector('.profile__add-button');
const popupClosers = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const editProfile = document.querySelector('.popup_type_edit');
const cardForm = document.forms['new-place'];
// const formInput = document.querySelector('.popup__input');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput  = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
// const inactiveButtonClass = document.querySelector('.popup__button_disabled');
// const inputErrorClass = document.querySelector('.popup__input_type_error');
// const errorClass = document.querySelector('.popup__error_visible');


export const popupImg = (e)=>{ 
  popupTypeImage.querySelector('.popup__content').classList.add('popup__content_content_image');
  document.querySelector('.popup__image').src = e.target.src;
  document.querySelector('.popup__caption').textContent = e.target.alt;

  openPopup(popupTypeImage);
};

initialCards.forEach((el)=> {
  placesList.append(createCard(el.name, el.link, popupImg));
});

const popupProfile = () => {
  
  nameInput.value = name.textContent
  jobInput.value = job.textContent
  openPopup(editProfile);
};

popupEditOpener.addEventListener('click', popupProfile);

const popupCard = () => {
  openPopup(addCard);
};

popupAddOpener.addEventListener('click', popupCard);

function addCardFunc(evt){
  evt.preventDefault()
  const inputName = document.querySelector('.popup__input_type_card-name');
  const inputLink = document.querySelector('.popup__input_type_url');
  placesList.prepend(createCard(inputName.value, inputLink.value, popupImg))
  closePopup(addCard);
  cardForm.reset(); 
};

cardForm.addEventListener('submit', addCardFunc);

function handleProfileFormSubmit(evt) {
  
  evt.preventDefault();
  
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  formElement.reset();
  closePopup(editProfile);
};

formElement.addEventListener('submit', handleProfileFormSubmit);

popupClosers.forEach((popupCloser)=>{
  const popupElement = popupCloser.closest('.popup');

  popupCloser.addEventListener("click", ()=> closePopup(popupElement));
});





//!!!!!!!!!!!!!




// Вынесем все необходимые элементы формы в константы
// const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, formInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  // Остальной код такой же
  formInput.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');


};

const hideInputError = (formElement, formInput) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  // Остальной код такой же
  formInput.classList.remove('popup__input-error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}; 

const isValid = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      formInput.setCustomValidity(formInput.dataset.errorMessage);
      // formInput.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
  } 
  else {
      // если передать пустую строку, то будут доступны
      // стандартные браузерные сообщения
      formInput.setCustomValidity("");
  }




  if (!formInput.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, formInput);
  }
}; 

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

const setEventListeners = (formElement) => {
  
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button');

  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
