import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errmesg: string = '';
  successMessage: string | null = null;
  isloading = false;

  registerForm: FormGroup = new FormGroup({
    FullName: new FormControl(null, [Validators.required]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [Validators.required, Validators.minLength(1)])
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {
    localStorage.setItem('currentPage', '/register');
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isloading = true;
      this.errmesg = '';

      this._AuthService.registerApi(this.registerForm.value).subscribe({
        next: (res) => {
          this.isloading = false;
          this.successMessage = "Registration successful! Please confirm your email to log in.";
          this.errmesg = '';
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.isloading = false;
          this.successMessage = null;
          this.errmesg = err.error?.data?.[0]?.description || "An error occurred. Please try again.";
        }
      });
    }
  }

}
