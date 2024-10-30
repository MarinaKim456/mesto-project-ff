function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
  popupElement.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupElement)
    }
  })
};
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
      const popup = document.querySelector('.popup_is-opened') 
      closePopup(popup);
    }
  };  

export {openPopup, closePopup};