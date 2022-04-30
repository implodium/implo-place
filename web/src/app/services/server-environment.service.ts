import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerEnvironmentService {

  host: string = environment.server.host
  websocketProtocol: string = environment.server.websocketProtocol
  restProtocol: string = environment.server.httpProtocol

  constructor() { }

  get baseUrl() {
    return this.host
  }

}
