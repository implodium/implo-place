import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserResponseDto} from "../../typings/user-response-dto";
import {UserService} from "../../services/user.service";
import {GreetingService} from "../../services/greeting.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: UserResponseDto
  cooldown?: number

  constructor(
    private readonly token: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly greetingService: GreetingService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.token.isAvailable) {
      await this.redirectToLogin()
    }

    this.userService.register()
      .subscribe(user => this.user = user)
  }

  private async redirectToLogin() {
    await this.router.navigate(['login'])
  }

  get greeting(): string {
    return this.greetingService.greeting
  }

  draw() {
    this.userService.requestClearName()
  }
}
