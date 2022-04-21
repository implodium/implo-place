import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storageIsActivatedKey = 'storageIsActivated'
  private _isActivated: boolean = false


  constructor() {
    this._isActivated = this.checkStorageForChoice()
  }

  set(key: string, value: string) {
    if (!this._isActivated) return
    localStorage.setItem(key, value)
  }

  get(key: string) {
    // TODO: Need to research cookies and so on
    // if (!this._isActivated) return null
    return localStorage.getItem(key)
  }

  activate() {
    this._isActivated = true
    this.set(this.storageIsActivatedKey, 'true')
  }

  get isActivated() {
    return this._isActivated
  }

  private checkStorageForChoice() {
    const isActivatedString = this.get(this.storageIsActivatedKey)
    return isActivatedString === 'true'
  }
}
