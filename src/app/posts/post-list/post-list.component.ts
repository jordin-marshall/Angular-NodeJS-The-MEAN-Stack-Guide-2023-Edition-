import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
  templateUrl: './post-list.component.html',
})


export class PostListComponent implements OnInit, OnDestroy{
  private postsSub: Subscription;
  posts: Post[] = []
  // posts: Post[] = [
  //   { title: 'first title', content: 'dsfdasfdasfadsf', description: "This is a description" },
  //   { title: 'second title', content: 'vcxzvczxvcxv', description: "This is a description 2" },
  //   { title: 'third ttile', content: 'etewrtrwetert', description: "This is a description 3" },
  // ]

  constructor(public postsService: PostsService){

  }
  // posts = [
    // { title: 'first title', content: 'dsfdasfdasfadsf' },
    // { title: 'second title', content: 'vcxzvczxvcxv' },
    // { title: 'third ttile', content: 'etewrtrwetert' },
  // ]

  //@Input() posts: Post[] = []


  ngOnInit() {
    this.postsService.getPosts();

    this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      })
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe()
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId)
  }
}
