import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormToPostService, Post } from '../../services/form-to-post.service';
import { MessagingService } from '../../services/messaging.service';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

@Component({
  selector: 'app-discover-listings',
  standalone: true,
  templateUrl: './discover-listings.component.html',
  styleUrls: ['./discover-listings.component.css'],
  imports: [CommonModule, FormsModule, MContainerComponent]
})
export class DiscoverListingsComponent implements OnInit {
  posts: Post[];
  selectedPostOwner: string;
  messageContent: string;
  sender: string;

  constructor(
    private formToPostService: FormToPostService,
    private messagingService: MessagingService
  ) {
    this.posts = [];
    this.selectedPostOwner = '';
    this.messageContent = '';
    this.sender = 'Customer'; // Set sender dynamically, e.g., from a logged-in user context
  }

  ngOnInit(): void {
    this.updateListings();
  }

  updateListings(): void {
    this.posts = this.formToPostService.getPosts();
  }

  selectPostOwner(owner: string): void {
    this.selectedPostOwner = owner;
  }

  sendMessage(): void {
    if (this.selectedPostOwner && this.messageContent) {
      this.messagingService.sendMessage(this.sender, this.selectedPostOwner, this.messageContent);
      this.messageContent = '';  // Reset the message content
    }
  }
}
