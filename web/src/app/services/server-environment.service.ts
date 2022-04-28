import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerEnvironmentService {

  url: string = environment.server.url
  port: number = environment.server.port
  path: string = environment.server.path
  websocketProtocol: string = environment.server.websocketProtocol
  restProtocol: string = environment.server.httpProtocol

  constructor() { }

  get baseUrl() {
    if (this.path.trim() !== '') {
      return `${this.url}:${this.port}/${this.path}/`
    } else {
      return `${this.url}:${this.port}`
    }
  }

}
