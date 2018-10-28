export class MessagingService {
  _messagingAdapter;
  _userAdapter;

  constructor(messagingAdapter, userAdapter) {
    this._messagingAdapter = messagingAdapter;
    this._userAdapter = userAdapter;
  }

  onMessage(callback) {
    this._messagingAdapter.onMessage(callback);
  }

  async getToken(user) {
    const token = await this._messagingAdapter.getToken();
    await this._userAdapter.updateMessagingToken(user, token);
  }

  listenForRefreshedToken(user) {
    this._messagingAdapter.listenForRefreshedToken(async token => {
      await this._userAdapter.updateMessagingToken(user, token);
    });
  }

  async requestPermission(user) {
    try {
      await this._messagingAdapter.requestPermission();
      await this.getToken(user);
    } catch (error) {
      console.log("Messaging permission denied");
    }
  }
}
