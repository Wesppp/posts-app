import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../interfaces/post";
import {PostService} from "../../../services/post.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPostDialogComponent} from "../../../modal-dialogs/edit-post-dialog/edit-post-dialog.component";
import {GlobalService} from "../../../services/global.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() posts: Post[] = []
  @Input() post: Post = {id: 0, title: '', body: ''}

  constructor(private postService: PostService,
              private globalService: GlobalService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deletePost(id: number, $event: any) {
    $event.stopPropagation()
    this.globalService.customConfirm().then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id)
          .subscribe(post => {
            if (post) {
              this.globalService.openSnackBar("The post was successfully deleted")
              this.globalService.updateComponent({refresh: true});
            } else {
              this.globalService.openSnackBar("Something went wrong")
            }
          }, error => this.globalService.openSnackBar(error.message))
      }
    })
  }

  openEditModal(post: Post, $event: any) {
    $event.stopPropagation()
      this.dialog.open(EditPostDialogComponent);
    this.globalService.updateComponent(post);
  }
}
