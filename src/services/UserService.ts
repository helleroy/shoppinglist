import { SignedInUser } from "../types";
import { UserAdapter } from "../adapters/UserAdapter";

export class UserService {
  _userAdapter: UserAdapter;

  constructor(userAdapter: UserAdapter) {
    this._userAdapter = userAdapter;
  }

  async updateUser(user: SignedInUser): Promise<void> {
    try {
      await this._userAdapter.updateUser(user);
    } catch (error) {
      console.log(error);
    }
  }
}
