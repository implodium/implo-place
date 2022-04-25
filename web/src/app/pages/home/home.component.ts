import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthRestService} from "../../services/auth-rest.service";
import {UserDTO} from "../../typings/user-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: UserDTO

  constructor(
    private readonly token: AuthService,
    private readonly router: Router,
    private readonly authRest: AuthRestService,
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.token.isAvailable) {
      await this.redirectToLogin()
    }

    this.authRest.register()
      .subscribe(user => this.user = user)
  }

  private async redirectToLogin() {
    await this.router.navigate(['login'])
  }
}
