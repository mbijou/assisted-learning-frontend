import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import {AuthenticationService, TokenErrorInterface} from '../../../authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(
      private router: Router,
      private spinner: NgxSpinnerService,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private changeDetector: ChangeDetectorRef,) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authenticationService.generateToken(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        data => {
        this.spinner.hide();
        localStorage.setItem("token", data.token);
        this.router.navigate(['/dashboard/dashboard1']);
      },
      err => {
        this.isLoginFailed = true;
        this.spinner.hide();

        this.loginForm.setErrors(
            { serverErrors: err["error"].non_field_errors }
            );

        this.changeDetector.detectChanges();

      }
      );
  }

}
