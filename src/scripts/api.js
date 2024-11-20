import {nameInput, jobInput} from './../index'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '433ef9d9-976e-4b56-b15e-b79615252693',
      'Content-Type': 'application/json'
    }
  }

  //обработчик ошибок
  const handleResponse = (res) =>{
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  //запрос на изменение профиля
  export const updateProfileInfoRequest = (data) =>{
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

  //запрос получения информации о профиле
  export const getUserInfo = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers,
    })
    .then(handleResponse)
  }

  //запрос получения имеющихся карточек
  export const getCardsRequest = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
    })
    .then(handleResponse);
  };
  
  //запрос на изменение аватара
  export const updateAvatarRequest = (avatarLink) => {  
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
        body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(handleResponse);
  };
  
  //запрос на получение новой карточки
export const createNewCardRequest = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
    .then(handleResponse)
}

//запрос на постановку лайка
export const putLikeRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(handleResponse)
}

//запрос на удаление лайка
export const deleteLikeRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
  })
  .then(handleResponse)
}

//запрос на удаление карточки
export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
}