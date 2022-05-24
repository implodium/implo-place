import {Component, Input, OnInit} from '@angular/core';
import {ConnectedUser} from "../../typings/connected-user";

@Component({
  selector: 'app-user-display-card',
  templateUrl: './user-display-card.component.html',
  styleUrls: ['./user-display-card.component.scss']
})
export class UserDisplayCardComponent implements OnInit {

  @Input("user")
  user!: ConnectedUser

  constructor() { }

  ngOnInit(): void {
  }

}
