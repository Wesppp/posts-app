import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../shared/interfaces/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  user: User = <User>{
    address: {
      city: ''
    }}

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                func: any
              }) { }

  ngOnInit(): void {
  }

}
