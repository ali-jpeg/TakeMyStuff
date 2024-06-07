import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormToPostService, Post } from '../../services/form-to-post.service';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';

@Component({
  selector: 'app-post-listing',
  standalone: true,
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css'],
  imports: [CommonModule, FormsModule, MContainerComponent]
})
export class PostListingComponent implements OnInit {
  username: string;
  title: string;
  category: string;
  description: string;
  availability: number;
  location: string;
  imageFile: File | null;
  imageUrl: string | ArrayBuffer | null;
  submitted: boolean;

  constructor(private formToPostService: FormToPostService) {
    this.username = '';
    this.title = '';
    this.category = '';
    this.description = '';
    this.availability = 0;
    this.location = '';
    this.imageFile = null;
    this.imageUrl = null;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
      this.readImageFile(this.imageFile);
    }
  }

  readImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (!this.imageUrl) {
      console.log('Image is still being loaded.');
      return;
    }

    const newPost: Post = {
      username: this.username,
      title: this.title,
      category: this.category,
      description: this.description,
      availability: this.availability,
      location: this.location,
      imageUrl: this.imageUrl
    };

    this.formToPostService.addPost(newPost);
    this.submitted = true;

    // Reset form fields
    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.title = '';
    this.category = '';
    this.description = '';
    this.availability = 0;
    this.location = '';
    this.imageFile = null;
    this.imageUrl = null;
    this.submitted = false;
  }
}
