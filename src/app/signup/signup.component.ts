import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('username', { static: false }) usernameRef: ElementRef;
  @ViewChild('email', { static: false }) emailRef: ElementRef;
  @ViewChild('password', { static: false }) passwordRef: ElementRef;
  @ViewChild('role', { static: false }) roleRef: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    const username = this.usernameRef.nativeElement.value;
    const em = this.emailRef.nativeElement.value;
    const pass = this.passwordRef.nativeElement.value;
    const role = this.roleRef.nativeElement.value;

    this.authService.signup(username, em, pass, role);
  }

}
