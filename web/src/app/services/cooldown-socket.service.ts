import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {ServerEnvironmentService} from "./server-environment.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Cooldown} from "../typings/cooldown";
import Store from "../store/Store";
import BaseSocketService from "./base-socket.service";

@Injectable({
  providedIn: 'root'
})
export class CooldownSocketService extends BaseSocketService {

  public readonly store: Store<Cooldown | undefined>
    = new Store<Cooldown | undefined>(undefined)

  private socket?: WebSocketSubject<any>

  constructor(http: HttpClient, environment: ServerEnvironmentService, private readonly auth: AuthService) {
    super(environment, 'cooldown-socket')
  }

  loadSocket() {
    this.auth.token.subscribe(token => {
      if (token) {
        console.log(`connecting to ${this.resourcePath}/${token.value}`)
        this.socket = webSocket({
          url: `${this.resourcePath}/${token.value}`,
          serializer: value => value,
        })

        this.socket.subscribe(next => {
          const socket: Cooldown = next
          console.log(socket)
          this.store.set(socket)
        })

        this.socket.next('cooldown')
      }
    })
  }

}
