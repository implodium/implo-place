import { Injectable } from '@angular/core';
import Store from "../store/Store";
import {TokenDto} from "../typings/token-dto";
import {LocalStorageService} from "./local-storage.service";
import {forkJoin} from "rxjs";
import {UserResponseDto} from "../typings/user-response-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenTypeKey = 'token-type'
  private readonly tokenValueKey = 'token-value'

  private readonly tokenStore: Store<TokenDto | undefined>
    = new Store<TokenDto | undefined>(undefined)

  constructor(private storage: LocalStorageService) {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const {tokenValue, tokenType} = this.tokenStorage

    if (tokenType && tokenValue) {
      this.tokenStore.set({
        value: tokenValue,
        type: tokenType
      })
    }
  }

  private get tokenStorage(): {tokenValue: string | null, tokenType: string | null} {
    return {
      tokenValue: this.storage.get(this.tokenValueKey),
      tokenType: this.storage.get(this.tokenTypeKey)
    }
  }

  get isAvailable() {
    return this.tokenStore.current !== undefined
  }

  setToken(token: TokenDto) {
    this.tokenStore.set(token)
    this.storage.set(this.tokenTypeKey, token.type)
    this.storage.set(this.tokenValueKey, token.value)
  }

  get token() {
    return this.tokenStore.get()
  }
}
