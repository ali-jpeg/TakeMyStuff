import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagingService } from '../../services/messaging.service';
import { FormToPostService } from '../../services/form-to-post.service';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

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

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  imports: [CommonModule, FormsModule, MContainerComponent]
})
export class MessagesComponent implements OnInit {
  recipient: string;
  messages: Message[];
  availableRecipients: string[];
  statusMessage: string | null;

  constructor(
    private messagingService: MessagingService,
    private formToPostService: FormToPostService
  ) {
    this.recipient = '';
    this.messages = [];
    this.availableRecipients = [];
    this.statusMessage = null;
  }

  ngOnInit(): void {
    this.loadAvailableRecipients();
  }

  loadAvailableRecipients(): void {
    const posts = this.formToPostService.getPosts();
    const usernames = posts.map(post => post.username);
    this.availableRecipients = [...new Set(usernames)];
    console.log('Available recipients:', this.availableRecipients);
  }

  loadMessages(): void {
    console.log('Loading messages for recipient:', this.recipient);
    const allMessages = this.messagingService.getMessages(this.recipient);
    console.log('All messages:', allMessages);

    this.messages = allMessages.map(message => {
      return { ...message, location: message.location || '', approved: message.approved || false };
    });

    console.log('Filtered messages:', this.messages);
  }

  approveMessage(id: string): void {
    console.log('Approving message with ID:', id);
    this.messagingService.approveMessage(id);
    this.loadMessages();
    this.showStatusMessage('Message approved successfully.');
  }

  showStatusMessage(message: string): void {
    this.statusMessage = message;
    setTimeout(() => {
      this.statusMessage = null;
    }, 3000); // Show the message for 3 seconds
  }

  private generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
