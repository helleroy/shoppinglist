export class BrowserLocalStorageAdapter {
  _localStorage: Storage;

  constructor(localStorage: Storage) {
    this._localStorage = localStorage;
  }

  setItem(key: string, value: string) {
    if (value) {
      this._localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    const value = this._localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }

    return null;
  }
}
