import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = <User>{}
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    }, error => this.globalService.openSnackBar(error.message()))
  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(user => {
        if (user) {
          this.user = user
          this.isLoading = false
        }
      }, error => this.globalService.openSnackBar(error.message()))
  }

  getAvatar(id: number) {
    return this.userService.getAvatar(id)
  }
}
