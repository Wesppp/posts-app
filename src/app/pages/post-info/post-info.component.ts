import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import { Comment } from "../../interfaces/comment";
import {Post} from "../../interfaces/post";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  comments: Comment[] = []
  post: Post = {id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.globalService.updateObservable$.subscribe(data => {
      if(data) {
        this.comments = data.comments;
        this.post = data.post
        this.isLoading = false
      }
    }, error => this.globalService.openSnackBar(error.message))
  }
}
