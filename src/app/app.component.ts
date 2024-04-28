import { Component } from '@angular/core';
import { RoleEnum, UserConnectedDTO } from 'src/api-client';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: UserConnectedDTO;
  role = RoleEnum;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }

  public logout(): void {
    this.authService.logout();
  }
}
