import { Component, EventEmitter, Output } from '@angular/core'
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  styleUrls: ['./post-create.component.css'],
  templateUrl: './post-create.component.html',
})


export class PostCreateComponent {

  constructor(public postsService: PostsService) {}

  // @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm){
    if(form.invalid) return

    const post: Post = {
      content: form.value.content,
      description: form.value.description,
      title: form.value.title,
    };
    // this.postCreated.emit(post);
    this.postsService.addPost(post)
    form.resetForm();
  }
}
