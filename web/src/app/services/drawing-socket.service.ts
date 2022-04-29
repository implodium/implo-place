import { Injectable } from '@angular/core';
import BaseSocketService from "./base-socket.service";
import {ServerEnvironmentService} from "./server-environment.service";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {DrawRequest} from "../typings/draw-request";
import {DrawResponse} from "../typings/draw-response";
import {AuthService} from "./auth.service";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class DrawingSocketService extends BaseSocketService{

  socket?: WebSocketSubject<DrawRequest | DrawResponse>

  constructor(environement: ServerEnvironmentService, private readonly auth: AuthService) {
    super(environement, 'drawing-socket')
  }

  loadSocket() {
    this.auth.token.subscribe(token => {
      if (token) {
        this.socket = webSocket({
          url: `${this.resourcePath}/${token.value}`,
        })
      }
    })
  }

  requestDraw(drawRequest: DrawRequest) {
    if (this.socket) {
      this.socket.next(drawRequest)
    }
  }

  subscribe(callBack: (response: DrawResponse) => void) {
    if (this.socket) {
      this.socket.subscribe(response => {
        const castedResponse = response as DrawResponse
        callBack(castedResponse)
      })
    }
  }
}
