export const clearValidation = (formElement, config) =>{
  const inputList = Array.from(formElement.querySelectorAll(`.${config.inputSelector}`));
  inputList.forEach((inputElement) => { 
    hideInputError(formElement, inputElement); 
 });
}; 

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

