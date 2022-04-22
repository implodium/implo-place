import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DialogComponent} from "../../components/dialog/dialog.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit  {

  @ViewChild('storagePrompt')
  dialog!: DialogComponent

  constructor(
    private auth: AuthService,
    private changeRef: ChangeDetectorRef,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  async ngAfterViewInit() {
    if (this.storage.choiceIsMade) {
      await this.saveToken()
      await this.navigateToHome()
    } else {
      await this.dialog.open()
      this.changeRef.detectChanges()
    }
  }

  async decline() {
    await this.dialog.close()
    this.storage.deactivate()
    await this.saveToken()
    // await this.navigateToHome()
  }

  async accept() {
    await this.dialog.close()
    this.storage.activate()
    await this.saveToken()
    await this.navigateToHome()
  }

  async saveToken() {
    const fragments = new URLSearchParams(window.location.hash.slice(1))
    const value = fragments.get('access_token')
    const type = fragments.get('token_type')

    if (value && type) {
      this.auth.setToken({
        value,
        type
      })
    } else {
      await this.navigateToHome()
    }
  }

  private async navigateToHome() {
    await this.router.navigate(['home'])
  }
}
