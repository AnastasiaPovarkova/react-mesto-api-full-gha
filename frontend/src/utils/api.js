class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return res.json().then(res => Promise.reject(res));
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
      credentials: "include",
    });
  };

  getInitialCards = () => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    });
  };

  changeUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    });
  };

  likeCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: "include",
    });
  };

  unlikeCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    });
  };

  editAvatar = (data) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  };
}

const api = new Api({
  baseUrl: "https://api.mesto.anstpov.nomoredomains.monster", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;
