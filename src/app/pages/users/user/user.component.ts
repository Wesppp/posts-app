import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/interfaces/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User = <User>{}

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getAvatar(id: number) {
    return this.userService.getAvatar(id)
  }
}
