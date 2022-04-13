import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {GlobalService} from "../../shared/services/global.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  url = '';
  user: User = <User>{}
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
    this.isLoading = true

    this.globalService.updateObservable$.subscribe(user => {
      if(user) {
        this.user = user
        this.isLoading = false
      }
    })
  }

  getAvatar(id: number) {
    return this.userService.getAvatar(id)
  }

  // @ts-ignore
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        // @ts-ignore
        this.url = event.target.result;
      }
    }
  }
}
