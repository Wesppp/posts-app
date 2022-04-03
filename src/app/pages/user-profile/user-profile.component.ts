import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/user";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = <User>{}
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.getUser(params['id'])
    })
  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(user => {
        if (user) {
          this.user = user
          this.isLoading = false
        }
      })
  }

  getAvatar(id: number) {
    return this.userService.getAvatar(id)
  }
}
