class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this.credentials = options.credentials;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  getUserInfo = () => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this.credentials,
    });
  };

  getInitialCards = () => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: this.credentials,
    });
  };

  changeUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this.credentials,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard = (data) => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this.credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  };

  deleteCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this.credentials,
    });
  };

  likeCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this.credentials,
    });
  };

  unlikeCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this.credentials,
    });
  };

  editAvatar = (data) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this.credentials,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  };
}

const api = new Api({
  baseUrl: "https://api.mesto.anstpov.nomoredomains.monster", // "https://mesto.nomoreparties.co/v1/cohort-59"
  headers: {
    authorization: "d2287a93-13da-4c7a-9dc9-db17e7519537",
    "Content-Type": "application/json",
  },
  credentials: 'include',
});

export default api;
