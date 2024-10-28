import {overlay, popupList} from './../index';

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

//! handleEscKeyUp
export const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened') 
      closeModal(popup);
    }
  };  

//! closeModal
const closeModal= () => {    
  popupList.forEach((el)=>{     
    closePopup(el); 
    overlay.classList.remove('active');               
  }); 
};

export {openPopup, closePopup, closeModal };