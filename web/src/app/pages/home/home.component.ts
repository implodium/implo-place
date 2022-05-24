import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserResponseDto} from "../../typings/user-response-dto";
import {UserService} from "../../services/user.service";
import {GreetingService} from "../../services/greeting.service";
import {CooldownSocketService} from "../../services/cooldown-socket.service";
import Cooldown from "../../typings/cooldown";
import {DrawRequest} from "../../typings/draw-request";
import {DrawingSocketService} from "../../services/drawing-socket.service";
import {BoardComponent} from "../../components/board/board.component";
import {BoardService} from "../../services/board.service";
import {Cell} from "../../typings/cell";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConnectedUser} from "../../typings/connected-user";
import {ConnectedUserSocketService} from "../../services/connected-user-socket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('board')
  board!: BoardComponent

  user?: UserResponseDto
  cooldown?: Cooldown
  seconds: number = 0
  minutes: number = 0
  drawingColor: string = 'white'
  loadedCells: Cell[] = []
  connectedUser: ConnectedUser[] = [
    {username: "smth", discriminator: "idjadf", id: "asidfjadsjfiojasdiofj"}
  ]

  constructor(
    private readonly token: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly greetingService: GreetingService,
    private readonly cooldownSocket: CooldownSocketService,
    private readonly drawingSocket: DrawingSocketService,
    private readonly boardService: BoardService,
    private readonly connectedUserSocket: ConnectedUserSocketService,
    private _snackBar: MatSnackBar
    ) { }

  async ngOnInit(): Promise<void> {
    await this.checkToken()
    this.registerUser()
    this.subscribeToCooldownSocket()
    this.setInterval()
    this.subscribeToDrawingSocket()
    this.loadCells()
    this.connectUser()
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

  draw($event: DrawRequest) {
    this.drawingSocket.requestDraw($event)
  }

  changeDrawingColor($event: string) {
    this.drawingColor = $event
  }

  private openCooldownAlert() {
    this._snackBar.open('you are on cooldown', 'dismiss', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  private async checkToken() {
    if (!this.token.isAvailable) {
      await this.redirectToLogin()
    }
  }

  private registerUser() {
    this.userService.register()
    this.userService.user.get()
      .subscribe(user => this.user = user)
  }

  private subscribeToCooldownSocket() {
    this.cooldownSocket.loadSocket();
    this.cooldownSocket.store.get().subscribe(cooldown => {
      if (cooldown) {
        this.cooldown = cooldown
        this.seconds = cooldown.seconds
        this.minutes = cooldown.minutes
      }
    })
  }

  private subscribeToDrawingSocket() {
    this.drawingSocket.loadSocket()
    this.drawingSocket.
    subscribe(response => {
      if (response.isAllowed) {
        this.board.visualizeDraw(response)
      } else {
        this.openCooldownAlert()
      }
    })
  }

  private loadCells() {
    this.boardService.getCells()
      .subscribe(cells => {
        this.loadedCells = cells
      })
  }

  private connectUser() {
    this.connectedUserSocket.connect()
    this.connectedUserSocket.store.get().subscribe(connectedUser => {
      console.log(connectedUser)
      this.connectedUser = connectedUser
    })

    this.userService.user.get().subscribe(user => {
      if (user) {
        this.connectedUserSocket.connectUser({
          id: user.id,
          discriminator: user.discriminator,
          username: user.displayName,
        })
      }
    })
  }
}
