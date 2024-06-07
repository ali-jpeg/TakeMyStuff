import { Injectable } from '@angular/core';

interface Message {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private readonly STORAGE_KEY = 'messages';
  private messages: Message[] = [];

  constructor() {
    this.loadMessagesFromSessionStorage();
    console.log('Loaded messages from session storage:', this.messages);
  }

  sendMessage(sender: string, recipient: string, content: string): void {
    console.log('sendMessage called');
    const message: Message = {
      sender,
      recipient,
      content,
      timestamp: new Date()
    };
    this.messages.push(message);
    this.saveMessagesToSessionStorage();
    console.log('Message sent:', message);
    console.log('Current messages:', this.messages);
  }

  getMessages(recipient: string): Message[] {
    const recipientMessages = this.messages.filter(message => message.recipient === recipient);
    console.log(`Messages for ${recipient}:`, recipientMessages);
    return recipientMessages;
  }

  private saveMessagesToSessionStorage(): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages));
    console.log('Messages saved to session storage:', this.messages);
  }

  private loadMessagesFromSessionStorage(): void {
    const storedMessages = sessionStorage.getItem(this.STORAGE_KEY);
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
      console.log('Messages loaded from session storage:', this.messages);
    } else {
      console.log('No messages found in session storage.');
    }
  }
}
