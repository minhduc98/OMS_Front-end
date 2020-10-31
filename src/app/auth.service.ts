import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  token: string = null;

  constructor(private router: Router) {}

  private loggedIn = new BehaviorSubject<boolean>(true);
  private accountDisplay = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAccountDisplay() {
    return this.accountDisplay.asObservable();
  }

  async signup(userName: string, em: string, pass: string, role: string) {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Change the example value here
        name: userName,
        email: em,
        password: pass,
        userType: role,
      }),
    });
    const response = await res.json();
    console.log('Sign Up Response', response);
    if (response.status !== 422) {
      this.router.navigate(['/signin']);
    } else {
      alert('Email already exists!');
    }
  }

  async login(em: string, pass: string, role: string) {
    if (em !== '' && pass !== '') {
      const res = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token', // Only need this for protected endpoints
        },
        body: JSON.stringify({
          // Change the example value here
          email: em,
          password: pass,
          userType: role,
        }),
      });
      const response = await res.json();
      console.log(this.accountDisplay);
      if (response.status !== 401) {
        this.handleAuthentication(
          response.userId,
          response.token,
          response.expiresIn
        );
        this.loggedIn.next(false);
        this.accountDisplay.next(true);
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/signin']);
        alert('Wrong email or password!');
      }
      console.log('Sign In Response', response);
    }
  }

  autoLogin() {

    const userData: {
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      this.loggedIn.next(false);
      this.accountDisplay.next(true);

    }
  }

  logout() {
    this.loggedIn.next(true);
    this.accountDisplay.next(false);

    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.loggedIn.next(true);
    this.accountDisplay.next(false);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
  }
}
