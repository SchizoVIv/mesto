export default class Api{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl
    this._headers = headers
  }

  // _handleServerResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject(`Error:${res.status}`);
  //   }
  // }

  getProfileFromServer(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  getCardsFromServer(){
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  editProfile(userData){
    console.log(userData)
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  addCard(cardData){
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData)
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  removeCard(cardId) {
    console.log(cardId)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  addLike(cardId) {
    console.log(cardId)

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }
}
