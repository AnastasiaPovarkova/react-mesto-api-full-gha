class Auth {
  constructor(options) {
    this._baseUrl = options.BASE_URL;
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

  register = (email, password) => {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  };

  authorize = (password, email) => {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return res;
    });
  };

  checkToken = (token) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };
}

const auth = new Auth({
  BASE_URL: "https://api.mesto.anstpov.nomoredomains.monster",
});

export default auth;
