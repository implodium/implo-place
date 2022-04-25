import {Component, ViewChild} from '@angular/core';
import {LocalStorageService} from "./services/local-storage.service";
import {UserService} from "./services/user.service";
import {DialogComponent} from "./components/dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';
  currentName = ''
  err?: string;

  @ViewChild('changeNameDialog')
  changeNameDialog!: DialogComponent

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly userService: UserService
  ) {
  }

  clearCookies() {
    this.localStorage.clear()
    location.reload()
  }

  async changeName() {
    await this.changeNameDialog.open()
  }

  async cancel() {
    await this.changeNameDialog.close();
  }

  async ok() {
    if (this.currentName.trim() !== '') {
      this.userService.changeName(this.currentName)
      await this.changeNameDialog.close()
    } else {
      this.err = 'name should not be empty'
    }
  }

  async clearName() {
    this.userService.clearName()
    await this.changeNameDialog.close()
  }
}
