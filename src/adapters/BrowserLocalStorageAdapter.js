export class BrowserLocalStorageAdapter {
  _localStorage;

  constructor(localStorage) {
    this._localStorage = localStorage;
  }

  setItem(key, value) {
    if (value) {
      this._localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key) {
    const value = this._localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  }
}
