import {addCard, popupEditOpener, popupAddOpener, showImg, formElement, popupList, cardForm, overlay} from './../index';

//! редактирование профиля
    
    // Получите значение полей jobInput и nameInput из свойства value
    const nameInput = document.querySelector('.popup__input_type_name');
    const jobInput  = document.querySelector('.popup__input_type_description');
    // Выберите элементы, куда должны быть вставлены значения полей
    const name = document.querySelector('.profile__title');
    const job = document.querySelector('.profile__description');
    

export function handleFormSubmit(evt) {// Обработчик «отправки» формы
  
    evt.preventDefault();
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    formElement.reset();
    closeModal(evt.target)
}

//! handleEscKeyUp
export const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened') 
      closeModal(popup);
    }
  };  

//! openModal
export const openModal = (evt) => {
  
  overlay.classList.add('active');
   
  if (evt.target===popupEditOpener) {
    const editProfile = document.querySelector('.popup_type_edit');
    nameInput.value = name.textContent
    jobInput.value = job.textContent
    editProfile.classList.add('popup_is-opened');
  }
  else if (evt.target===popupAddOpener) {
    
    addCard.classList.add('popup_is-opened')

  }
  
  evt.target.addEventListener('keydown', handleEscKeyUp);
};

//! openImg
export const openImg = (e)=>{ 
  if (e.target.hasAttribute('alt')){
    overlay.classList.add('active');
    showImg.classList.add('popup_is-opened');
    showImg.querySelector('.popup__content').classList.add('popup__content_content_image');
    document.querySelector('.popup__image').src=e.target.src;
    document.querySelector('.popup__caption').textContent = e.target.alt;
  }

  };

//! closeModal
export const closeModal= () => {
    
  popupList.forEach((el)=>{
    el.classList.remove('popup_is-opened');
    document.querySelector('.overlay').classList.remove('active');       
    cardForm.reset(); 
    el.removeEventListener('keydown', handleEscKeyUp);
  });
};