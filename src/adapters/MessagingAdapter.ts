export class MessagingAdapter {
  _messaging: firebase.messaging.Messaging | null;
  _projectId: string;

  constructor(
    messaging: firebase.messaging.Messaging | null,
    projectId: string
  ) {
    this._messaging = messaging;
    this._projectId = projectId;
  }

  onMessage(callback: Function) {
    if (this._messaging) {
      this._messaging.onMessage((payload: object) => {
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

  listenForRefreshedToken(callback: Function) {
    if (this._messaging) {
      this._messaging.onTokenRefresh(async () => {
        callback(await this.getToken());
      });
    }
  }
}
