import { Injectable } from '@angular/core';
import BaseRestService from "./base-rest-service";
import {UserResponseDto} from "../typings/user-response-dto";
import {HttpClient} from "@angular/common/http";
import {ServerEnvironmentService} from "./server-environment.service";
import {map, mergeMap, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import Store from "../store/Store";
import {User} from "../typings/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseRestService {

  private readonly user = new Store<User | undefined>(undefined)

  constructor(
    http: HttpClient,
    environment: ServerEnvironmentService,
    private readonly auth: AuthService
  ) {
    super(http, environment, 'user')
  }

  register(): Observable<User | undefined> {
    const response = this.requestRegister()

    response.subscribe(user => {
      this.user.set(user)
    })

    return this.user.get()
  }

  private requestRegister() {
    return this.auth.token.pipe(
      mergeMap(token => {
        console.log(`${this.resourcePath}/register?token=${token!.value}`)
        return this.http
          .post<User>(
            `${this.resourcePath}/register?token=${token!.value}`,
            null
          )
      })
    )
  }
}
