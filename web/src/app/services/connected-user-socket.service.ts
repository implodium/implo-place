import { Injectable } from '@angular/core';
import BaseSocketService from "./base-socket.service";
import {ServerEnvironmentService} from "./server-environment.service";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import Store from "../store/Store";
import {ConnectedUser} from "../typings/connected-user";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserSocketService extends BaseSocketService {

  socket: WebSocketSubject<void | ConnectedUser | string> | undefined = undefined
  store: Store<ConnectedUser[]> = new Store<ConnectedUser[]>([])

  constructor(
    environment: ServerEnvironmentService,
    private readonly auth: AuthService
  ) {
    super(environment, 'connected-user')
  }

  connect() {
    this.auth.token.subscribe(token => {

      this.socket = webSocket<void | ConnectedUser | string>({
        url: `${this.resourcePath}/${token!.value}`,
        deserializer: ConnectedUserSocketService.deserialize,
      })

      this.subscribeToSocket()
    })
  }

  subscribeToSocket() {
    if (this.socket) {
      this.socket.subscribe(connectedUser => {
        const parsedConnectedUser = connectedUser as ConnectedUser

        if (!parsedConnectedUser.isDisconnect) {
          this.store.set([...this.store.current, parsedConnectedUser])
        } else {
          this.store.set(this.store.current.filter(connectedUserEntry => {
            return connectedUserEntry.id !== parsedConnectedUser.id
          }))
        }
      })
    }
  }

  private static deserialize(event: MessageEvent): ConnectedUser {
    return JSON.parse(event.data)
  }

  connectUser(user: ConnectedUser) {
    if (this.socket) {
      console.log("connecting user", user)
      this.socket.next(user)
    }
  }
}
