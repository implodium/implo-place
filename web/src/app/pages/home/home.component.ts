import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserResponseDto} from "../../typings/user-response-dto";
import {UserService} from "../../services/user.service";
import {GreetingService} from "../../services/greeting.service";
import {CooldownSocketService} from "../../services/cooldown-socket.service";
import {CooldownService} from "../../services/cooldown.service";
import Cooldown from "../../typings/cooldown";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: UserResponseDto
  cooldown?: Cooldown
  seconds: number = 0
  minutes: number = 0

  constructor(
    private readonly token: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly greetingService: GreetingService,
    private readonly cooldownSocket: CooldownSocketService,
    private readonly cooldownService: CooldownService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.token.isAvailable) {
      await this.redirectToLogin()
    }

    this.userService.register()
      .subscribe(user => this.user = user)

    this.cooldownSocket.loadSocket();
    this.cooldownSocket.store.get().subscribe(cooldown => {
      if (cooldown) {
        this.cooldown = cooldown
        this.seconds = cooldown.seconds
        this.minutes = cooldown.minutes
      }
    })

    this.setInterval()
  }

  private setInterval() {
    setInterval(() => {
      if (this.cooldown && this.cooldown.active) {
        if (this.seconds == 0) {
          this.minutes--
          this.seconds = 60
        } else {
          this.seconds--
        }
      }
    }, 1000)
  }

  private async redirectToLogin() {
    await this.router.navigate(['login'])
  }

  get greeting(): string {
    return this.greetingService.greeting
  }

  draw() {
    this.cooldownService.setCooldown()
  }
}
