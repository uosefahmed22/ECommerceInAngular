import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errmesg: string = "";
  isloading: boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {
    localStorage.setItem('currentPage', '/login');
  }

  LoginForm: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });

  onSubmit() {
    if (this.LoginForm.valid) {
      this.isloading = true;

      this._AuthService.loginApi(this.LoginForm.value).subscribe({
        next: (res) => {
          this.isloading = false;
          this._Router.navigate(['/home']);
          console.log(res.data.token);

          if (res.message == "Login Successful") {
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            this._AuthService.SaveDataMethod();
            this._Router.navigate(['/home']);
          }
          else {
            this.errmesg = res.message;
          }
        },

        error: (err) => {
          this.isloading = false;
          if (err.error?.message) {
            this.errmesg = err.error.message;
          } else {
            this.errmesg = "An unexpected error occurred.";
          }
        }
      });
    }
  }
}