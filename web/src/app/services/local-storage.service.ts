import { Injectable } from '@angular/core';
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storageIsActivatedKey = 'storageIsActivated'
  private _isActivated: boolean = false

  constructor() {
    this._isActivated = this.checkStorageForChoice()
  }

  set(key: string, value: string, force: boolean = false) {
    console.log(key, force)
    if (!this._isActivated && !force) return
    localStorage.setItem(key, value)
  }

  get(key: string, force: boolean = false) {
    if (!this._isActivated && !force) return null
    return localStorage.getItem(key)
  }

  activate() {
    this._isActivated = true
    this.set(this.storageIsActivatedKey, 'true', true)
  }

  deactivate() {
    this._isActivated = false
    this.set(this.storageIsActivatedKey, 'false', true)
  }

  get isActivated() {
    return this._isActivated
  }

  get choiceIsMade() {
    const isActivatedStorage = this.get(this.storageIsActivatedKey, true)
    return isActivatedStorage !== null;
  }

  private checkStorageForChoice() {
    const isActivatedString = this.get(this.storageIsActivatedKey, true)
    return isActivatedString === 'true'
  }

  clear() {
    localStorage.clear()
  }
}
