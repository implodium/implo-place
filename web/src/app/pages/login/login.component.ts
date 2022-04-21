import { Component, OnInit } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {AuthConfigService} from "../../services/auth-config.service";
import {AuthConfigDTO} from "../../typings/auth-config-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authConfig?: AuthConfigDTO

  constructor(private authConfigService: AuthConfigService) { }

  async ngOnInit(): Promise<void> {
    this.authConfigService.data.get()
      .subscribe(config => {
        this.authConfig = config
      })
  }

  authenticate() {
    window.open(this.authConfig!.redirectURL)
  }
}
