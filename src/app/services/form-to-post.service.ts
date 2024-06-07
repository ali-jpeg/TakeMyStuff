import { Injectable } from '@angular/core';

export interface Post {
  username: string;
  title: string;
  category: string;
  description: string;
  availability: number;
  location: string;
  imageUrl: string | ArrayBuffer | null;
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
    console.log('Post added:', post);
  }
  
  getPosts(): Post[] {
    console.log('Getting posts:', this.posts);
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
