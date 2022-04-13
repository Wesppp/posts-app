import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/interfaces/user";
import {GlobalService} from "../../shared/services/global.service";
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../../components/modal-dialogs/add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  isLoading: boolean = false
  search: string = '';

  constructor(private userService: UserService,
              private globalService: GlobalService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        if (users.length) {
          this.users = users.slice(0,4)
          console.log(users)
          this.isLoading = false
        }
      }, error => this.globalService.openSnackBar(error.message))
  }

  getAvatar(id: number) {
    return this.userService.getAvatar(id)
  }

  openModal() {
    this.dialog.open(AddUserDialogComponent)
  }
}
