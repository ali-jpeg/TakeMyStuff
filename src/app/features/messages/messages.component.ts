import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagingService } from '../../services/messaging.service';
import { FormToPostService, Post } from '../../services/form-to-post.service';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  imports: [CommonModule, FormsModule, MContainerComponent]
})
export class MessagesComponent implements OnInit {
  recipient: string;
  messages: { sender: string, content: string, timestamp: Date }[];
  availableRecipients: string[]; // Store available recipients

  constructor(
    private messagingService: MessagingService,
    private formToPostService: FormToPostService
  ) {
    this.recipient = '';
    this.messages = [];
    this.availableRecipients = [];
  }

  ngOnInit(): void {
    this.loadAvailableRecipients();
  }

  loadAvailableRecipients(): void {
    const posts: Post[] = this.formToPostService.getPosts();
    const usernames = posts.map(post => post.username);
    this.availableRecipients = [...new Set(usernames)]; // Unique usernames
  }

  loadMessages(): void {
    this.messages = this.messagingService.getMessages(this.recipient);
  }
}
