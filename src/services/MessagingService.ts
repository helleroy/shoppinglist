import { MessagingAdapter } from "../adapters/MessagingAdapter";
import { UserAdapter } from "../adapters/UserAdapter";
import { Message, SignedInUser } from "../types";

export class MessagingService {
  _messagingAdapter: MessagingAdapter;
  _userAdapter: UserAdapter;

  constructor(messagingAdapter: MessagingAdapter, userAdapter: UserAdapter) {
    this._messagingAdapter = messagingAdapter;
    this._userAdapter = userAdapter;
  }

  onMessage(callback: (message: Message) => void): void {
    this._messagingAdapter.onMessage(callback);
  }

  async getToken(user: SignedInUser): Promise<void> {
    const token = await this._messagingAdapter.getToken();
    if (token) {
      await this._userAdapter.updateMessagingToken(user, token);
    }
  }

  async requestPermission(user: SignedInUser): Promise<void> {
    try {
      await this._messagingAdapter.requestPermission();
      await this.getToken(user);
    } catch (error) {
      console.log("Messaging permission denied");
    }
  }
}
