export const clearValidation = (formElement, config) =>{
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
  inputList.forEach((inputElement) => { 
    hideInputError(formElement, inputElement); 
 });
}; 

// export const clearValidation = (formElement, formInput, config) =>{
//   const errorElement = formElement.querySelector(`.${formInput.id}-error`);
//   formInput.classList.remove('popup__input-error');
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// }; 
  
  const showInputError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };

  const hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove('popup__input-error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };

const isValid = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
      // встроенный метод setCustomValidity принимает на вход строку
      // и заменяет ею стандартное сообщение об ошибке
      formInput.setCustomValidity(formInput.dataset.errorMessage);
  } 
  else {
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
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button');

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

export const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};




//   const showInputError = (formElement, formInput, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${formInput.id}-error`);
//     errorElement.classList.add('form__input-error_active');
//     console.log(errorElement);
//     errorElement.textContent = errorMessage;
//   };

//   const hideInputError = (formElement, formInput) => {
//     const errorElement = formElement.querySelector(`.${formInput.id}-error`);
//       errorElement.classList.remove('form__input-error_active');
//       errorElement.textContent = '';
//     };

//     const isValid = (formElement, formInput) => {
//       if (formInput.validity.patternMismatch) {
//           // встроенный метод setCustomValidity принимает на вход строку и заменяет ею стандартное сообщение об ошибке
//           formInput.setCustomValidity(formInput.dataset.errorMessage);
//       } 
//       else {
//           formInput.setCustomValidity("");
//       }
//       if (!formInput.validity.valid) {
//         // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
//         showInputError(formElement, formInput, formInput.validationMessage);
//       } else {
//         // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
//         hideInputError(formElement, formInput);
//       }
//     };  

// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// const toggleButtonState = (inputList, buttonElement, config) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделать кнопку неактивной
//       buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//       buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// };

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(document.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');
//   toggleButtonState(inputList, buttonElement, config);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// }; 

// export const enableValidation = config => { 
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => { 
//     setEventListeners(formElement, config); 
//  })
// }

// export const clearValidation = (formElement, config) =>{
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   inputList.forEach((inputElement) => { 
//     hideInputError(formElement, inputElement); 
//  })
// }; 

// // enableValidation({
// //   formSelector: '.popup__form',
// //   inputSelector: '.popup__input',
// //   submitButtonSelector: '.popup__button',
// //   inactiveButtonClass: 'popup__button_disabled',
// //   inputErrorClass: 'popup__input_type_error',
// //   errorClass: 'popup__error_visible'
// // });

// // export const enableValidation = () => {
// //   const formList = Array.from(document.querySelectorAll('.popup__form'));
// //   formList.forEach((formElement) => {
// //     setEventListeners(formElement);
// //   });
// // };
