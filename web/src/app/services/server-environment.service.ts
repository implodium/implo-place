import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerEnvironmentService {

  url: string = environment.server.url
  port: number = environment.server.port
  path: string = environment.server.path

  constructor() { }

  get baseUrl() {
    return `${this.url}:${this.port}/${this.path}`
  }

}
