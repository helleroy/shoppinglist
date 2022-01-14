import { Messaging, getToken, onMessage } from "firebase/messaging";
import { Message } from "../types";

export class MessagingAdapter {
  _messaging: Messaging | null;

  constructor(messaging: Messaging | null) {
    this._messaging = messaging;
  }

  onMessage(callback: (message: Message) => void): void {
    if (this._messaging) {
      onMessage(this._messaging, (payload: any) => {
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
        const currentToken = await getToken(this._messaging, {
          vapidKey:
            "BIlIsfvbhieh8dLuLLmgnEd852fZc-0x7A8hffbsAz_1zB92yxKVj4uyp-ZyB2FZ3hY98h4eQilwZ9u4SernMNo",
        });

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
}
