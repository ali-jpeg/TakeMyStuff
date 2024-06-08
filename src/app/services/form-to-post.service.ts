import { Injectable } from '@angular/core';

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Post {
  username: string;
  title: string;
  category: string;
  description: string;
  availability: number;
  location: string;
  imageUrl: string | ArrayBuffer | null;
  timeSlots: TimeSlot[]; 
}

@Injectable({
  providedIn: 'root'
})
export class FormToPostService {
  private readonly STORAGE_KEY = 'posts';
  private posts: Post[] = [];

  constructor() {
    this.loadPostsFromSessionStorage();
  }

  addPost(post: Post): void {
    this.posts.push(post);
    this.savePostsToSessionStorage();
  }

  getPosts(): Post[] {
    return this.posts;
  }

  getPostCount(): number {
    return this.posts.length;
  }

  private savePostsToSessionStorage(): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.posts));
  }

  private loadPostsFromSessionStorage(): void {
    const storedPosts = sessionStorage.getItem(this.STORAGE_KEY);
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
    }
  }
}
