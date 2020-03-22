import firebase from "firebase";
import { Message } from "../types";

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

  onMessage(callback: (message: Message) => void): void {
    if (this._messaging) {
      this._messaging.onMessage((payload: any) => {
        console.log("Received message", payload);
        callback(payload);
      });
    }
  }

  async requestPermission(): Promise<void> {
    try {
      await Notification.requestPermission();
    } catch (error) {
      throw error;
    }
  }

  async getToken(): Promise<string | void> {
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

  listenForRefreshedToken(callback: (token: string) => void): void {
    if (this._messaging) {
      this._messaging.onTokenRefresh(async () => {
        let token = await this.getToken();
        if (token) {
          callback(token);
        }
      });
    }
  }
}
