import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string;

  isLoggedIn$: Observable<boolean>;
  isAccountDisplay$: Observable<boolean>;
  userName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAccountDisplay$ = this.authService.isAccountDisplay;
  }

  onLogOut() {
    this.isAccountDisplay$ = this.authService.isAccountDisplay;
    this.authService.logout();
  }


}
