export class MessagingAdapter {
  _messaging;
  _projectId;

  constructor(messaging, projectId) {
    this._messaging = messaging;
    this._projectId = projectId;
  }

  onMessage(callback) {
    if (this._messaging) {
      this._messaging.onMessage(payload => {
        console.log("Received message", payload);
        callback(payload);
      });
    }
  }

  async requestPermission() {
    try {
      if (this._messaging) {
        await this._messaging.requestPermission();
      }
    } catch (error) {
      throw error;
    }
  }

  async getToken() {
    try {
      if (this._messaging) {
        const currentToken = await this._messaging.getToken();

        if (currentToken) {
          return currentToken;
        } else {
          await this.requestPermission();
        }
      }
    } catch (error) {
      console.log("Failed to retrieve token", error);
    }
  }

  listenForRefreshedToken(callback) {
    if (this._messaging) {
      this._messaging.onTokenRefresh(async () => {
        callback(await this.getToken());
      });
    }
  }
}
