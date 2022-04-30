
import { Injectable } from '@angular/core';
import BaseRestService from "./base-rest-service";
import {ServerEnvironmentService} from "./server-environment.service";
import {HttpClient} from "@angular/common/http";
import Store from "../store/Store";
import {AuthConfigDTO} from "../typings/auth-config-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService extends BaseRestService {

  private store: Store<AuthConfigDTO | undefined>
    = new Store<AuthConfigDTO | undefined>(undefined)

  constructor(
    http: HttpClient,
    environment: ServerEnvironmentService
  ) {
    super(http, environment, 'config')
  }

  get data() {
    if (this.store.current) {
      return this.store
    } else {
      this.fetch()
      return this.store
    }
  }

  public fetch() {
    this.http.get<AuthConfigDTO>(this.resourcePath)
      .subscribe(config => {
        this.store.set(config)
      })
  }
}
