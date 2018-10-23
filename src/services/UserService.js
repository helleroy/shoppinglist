export class UserService {
  _userAdapter;

  constructor(userAdapter) {
    this._userAdapter = userAdapter;
  }

  async updateUser(user) {
    try {
      return this._userAdapter.updateUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id) {
    try {
      return this._userAdapter.getUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this._userAdapter.getUserByEmail(email);
    } catch (error) {
      console.log(error);
    }
  }
}
