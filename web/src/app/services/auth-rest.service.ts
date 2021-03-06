import { Injectable } from '@angular/core';
import BaseRestService from "./base-rest-service";
import {HttpClient} from "@angular/common/http";
import {ServerEnvironmentService} from "./server-environment.service";
import {UserResponseDto} from "../typings/user-response-dto";
import {AuthService} from "./auth.service";
import {mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService extends BaseRestService{

  constructor(http: HttpClient, environment: ServerEnvironmentService, private readonly auth: AuthService) {
    super(http, environment, 'auth')
  }

  register() {
    return this.auth.token.pipe(
      mergeMap(token => this.http.post<UserResponseDto>(`${this.resourcePath}/register?token=${token!.value}`, null))
    )
  }
}
