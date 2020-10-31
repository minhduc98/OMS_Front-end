import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('email', { static: false }) emailRef: ElementRef;
  @ViewChild('password', { static: false }) passwordRef: ElementRef;
  @ViewChild('role', { static: false }) roleRef: ElementRef;

  role: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn() {
    const em = this.emailRef.nativeElement.value;
    const pass = this.passwordRef.nativeElement.value;
    const role = this.roleRef.nativeElement.value;

    this.authService.login(em, pass, role);
  }

}
