import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  avatars: string[] = []
  isLoading: boolean = false

  constructor(private userService: UserService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getUsers()

  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        if (users.length) {
          this.users = users
          this.isLoading = false
        }
      }, error => this.globalService.openSnackBar(error.message))
  }

}
