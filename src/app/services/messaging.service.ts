import { Injectable } from '@angular/core';

interface Message {
  id: string;
  sender: string;
  senderName: string;
  whatsappNumber: string;
  recipient: string;
  content: string;
  timestamp: Date;
  location?: string;
  approved?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messages: Message[] = [];

  constructor() {
    this.loadMessagesFromSessionStorage();
  }

  getMessages(recipient: string): Message[] {
    this.loadMessagesFromSessionStorage();
    const filteredMessages = this.messages.filter(message => message.recipient === recipient);
    console.log('Retrieved messages for recipient:', recipient, filteredMessages);
    return filteredMessages;
  }

  getAllMessages(): Message[] {
    this.loadMessagesFromSessionStorage();
    console.log('All messages:', this.messages);
    return this.messages;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.saveMessagesToSessionStorage();
    console.log('Message added:', message);
  }

  approveMessage(id: string): void {
    this.loadMessagesFromSessionStorage();
    const message = this.messages.find(msg => msg.id === id);
    if (message) {
      message.approved = true;
      this.saveMessagesToSessionStorage();
      console.log('Message approved:', message);
    } else {
      console.log('Message not found:', id);
    }
  }

  private saveMessagesToSessionStorage(): void {
    console.log('Saving messages to session storage:', this.messages);
    sessionStorage.setItem('messages', JSON.stringify(this.messages));
  }

  private loadMessagesFromSessionStorage(): void {
    const storedMessages = sessionStorage.getItem('messages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
      console.log('Loaded messages from session storage:', this.messages);
    } else {
      console.log('No messages found in session storage.');
    }
  }
}
