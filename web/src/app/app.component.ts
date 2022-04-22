import { Component } from '@angular/core';
import {LocalStorageService} from "./services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  constructor(private readonly localStorage: LocalStorageService) {
  }

  clearCookies() {
    this.localStorage.clear()
    location.reload()
  }
}
