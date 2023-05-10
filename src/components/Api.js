export default class Api{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getProfile(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  getCards(){
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  editProfile({name, about}){
    console.log(name)
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  addCard({name, link}){
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then( res =>  res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }
}
