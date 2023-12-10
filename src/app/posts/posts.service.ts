import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Post } from "./post.model";

const domain = 'http://localhost:3000/api'
@Injectable({providedIn: 'root'})

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient) {}

  // addPost(tite:string, content: string)
  addPost(post: Post) {
    this.http.post<{message: string, postId: string }>('http://localhost:3000/api/post', post)
      .subscribe((resp) => {
        console.log(resp.message)
        post.id = resp.postId
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }

  getPosts() {
    this.http.get<{ message: string, posts: any }>(`${domain}/posts`)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            content: post.content,
            description: post.description,
            id: post._id,
            title: post.title,
          }
        })
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts
        this.postsUpdated.next([...this.posts])
      })
    return [...this.posts]
  }

  deletePost(postId: string) {
    this.http.delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        console.log("Post Deleted!")
        const updatedPosts = this.posts.filter(post => post.id !== postId)
        this.postsUpdated.next([...updatedPosts])
      })
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
