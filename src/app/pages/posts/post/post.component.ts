import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../shared/interfaces/post";
import {PostService} from "../../../shared/services/post.service";
import {MatDialog} from "@angular/material/dialog";
import {GlobalService} from "../../../shared/services/global.service";
import {PostCrudDialogComponent} from "../../../components/modal-dialogs/post-crud-dialog/post-crud-dialog.component";

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
    this.dialog.open(PostCrudDialogComponent, {
      data: {
        title: 'Editing a post',
        func: (title: string, body: string, id: number) => {
          this.postService.editPost({title, body} as Post, id)
            .subscribe(data => {
              if (data) {
                console.log(data)
                this.globalService.openSnackBar("The post was edited")
              }
            }, error => this.globalService.openSnackBar(error.message))
        }
      }
    });
    this.globalService.updateComponent(post);
  }
}
