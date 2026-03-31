// signin.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule, CommonModule],
})
export class Login {

  loginData = {
    email: '',
    password: '',
    remember: false
  };

  showPassword = false;

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    console.log('Login data:', this.loginData);
    // Add your AuthService call here
    // e.g. this.authService.login(this.loginData).subscribe(...)
  }

  loginWithGoogle(): void {
    console.log('Google login');
    // Add Google OAuth logic
  }

  loginWithLinkedIn(): void {
    console.log('LinkedIn login');
    // Add LinkedIn OAuth logic
  }
}