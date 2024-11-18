import {nameInput, jobInput} from './../index'

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '433ef9d9-976e-4b56-b15e-b79615252693',
      'Content-Type': 'application/json'
    }
  }

  const handleResponse = (res) =>{
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };


  export const updateProfileInfoRequest = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then(handleResponse)
  }

  export const getUserInfo = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: 'Marina Kim',
        about: 'junior frontend developer',
        avatar: 'https://i.pinimg.com/originals/00/52/5c/00525c50c5b947a61ffccddaada2d663.jpg'
      }),
    })
    .then(handleResponse)
  }

  export const getCardsRequest = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
    })
    .then(handleResponse);
  };
  
  export const avatarRequest = (avatarLink) => {  
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
        body: JSON.stringify({
        avatar: avatarLink,
      })
    })
      .then(handleResponse);
  };
  
export const getNewCardRequest = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
    .then(handleResponse)
}

export const putLikeRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(handleResponse)
}

export const deleteLikeRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
  })
  .then(handleResponse)
}

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
}
