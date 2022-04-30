import { Injectable } from '@angular/core';
import BaseRestService from "./base-rest-service";
import {HttpClient} from "@angular/common/http";
import {ServerEnvironmentService} from "./server-environment.service";
import {Cell} from "../typings/cell";
import Store from "../store/Store";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseRestService {

  private readonly store = new Store<Cell[]>([])

  constructor(http: HttpClient, environment: ServerEnvironmentService) {
    super(http, environment, 'board')
  }

  getCells(): Observable<Cell[]> {
    this.http.get<Cell[]>(`${this.resourcePath}/cells`)
      .subscribe(cells => {
        this.store.set(cells)
      })

    return this.store.get()
  }
}
