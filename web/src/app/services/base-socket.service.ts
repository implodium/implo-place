import {HttpClient} from "@angular/common/http";
import {ServerEnvironmentService} from "./server-environment.service";

export default class BaseSocketService {

  protected constructor(
    private readonly serverEnvironment: ServerEnvironmentService,
    private readonly path: string
  ) { }

  protected get baseUrl() {
    return `${this.serverEnvironment.websocketProtocol}://${this.serverEnvironment.baseUrl}`
  }

  protected get resourcePath() {
    return `${this.baseUrl}/${this.path}`
  }

}
