import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  // addPost(tite:string, content: string)
  // const post: Post = {title:title, content: content}
  // cant you just do this? const post: Post = {title,content}
  addPost(post: Post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  getPosts() {
    return [...this.posts]
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
