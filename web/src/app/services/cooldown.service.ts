import { Injectable } from '@angular/core';
import BaseRestService from "./base-rest-service";
import {ServerEnvironmentService} from "./server-environment.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CooldownService extends BaseRestService{

  constructor(environment: ServerEnvironmentService, http: HttpClient, private readonly auth: AuthService) {
    super(http, environment, 'cooldown')
  }

  setCooldown() {
    this.auth.token.pipe(
      mergeMap(token => {
          return this.http
            .post(
              `${this.resourcePath}/set-cooldown?token=${token!.value}`,
              null
            )
      })
    ).subscribe()
  }
}
