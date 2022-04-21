import {ServerEnvironmentService} from "./server-environment.service";
import {HttpClient} from "@angular/common/http";
import Store from "../store/Store";

export default abstract class BaseRestService {

  protected constructor(
    protected readonly http: HttpClient,
    private readonly serverEnvironment: ServerEnvironmentService,
    private readonly path: string
  ) { }

  protected get baseUrl() {
    return this.serverEnvironment.baseUrl
  }

  protected get resourcePath() {
    return `${this.baseUrl}/${this.path}`
  }
}

