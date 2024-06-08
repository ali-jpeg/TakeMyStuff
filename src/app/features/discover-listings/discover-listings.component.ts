import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormToPostService, Post, TimeSlot } from '../../services/form-to-post.service';
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
  selectedPost: Post | null;
  messageContent: string;
  selectedTimeSlot: TimeSlot | null;
  sender: string;
  senderName: string;
  whatsappNumber: string;
  statusMessage: string | null;

  constructor(
    private formToPostService: FormToPostService,
    private messagingService: MessagingService
  ) {
    this.posts = [];
    this.selectedPost = null;
    this.messageContent = '';
    this.selectedTimeSlot = null;
    this.sender = '';
    this.senderName = '';
    this.whatsappNumber = '';
    this.statusMessage = null;
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.posts = this.formToPostService.getPosts();
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
    this.selectedTimeSlot = post.timeSlots.length > 0 ? post.timeSlots[0] : null;
  }

  sendMessage(): void {
    if (this.selectedPost && this.selectedTimeSlot) {
      const newMessage = {
        id: this.generateId(),
        sender: this.sender,
        senderName: this.senderName,
        whatsappNumber: this.whatsappNumber,
        recipient: this.selectedPost.username,
        content: this.messageContent,
        timestamp: new Date(),
        location: this.selectedPost.location,
        approved: false
      };
      this.messagingService.addMessage(newMessage);
      this.showStatusMessage('Message sent successfully.');
      this.resetForm();
    }
  }

  resetForm(): void {
    this.messageContent = '';
    this.selectedTimeSlot = null;
    this.sender = '';
    this.senderName = '';
    this.whatsappNumber = '';
    this.selectedPost = null;
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
