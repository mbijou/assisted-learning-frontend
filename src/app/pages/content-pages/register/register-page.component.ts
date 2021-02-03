import {Component, ViewChild, OnInit, ChangeDetectorRef} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../../shared/directives/must-match.validator';
import { Router } from '@angular/router';
import {RegistrationInterface, RegistrationService} from './registration.service';
import {SingleChoiceInterface} from '../../../flash-card/single-choice.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {
  registerFormSubmitted = false;
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get rf() {
    return this.registerForm.controls;
  }


  //  On submit click, reset field value
  onSubmit() {
    this.registerFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const data: RegistrationInterface = {
      "username": this.registerForm.controls.username.value,
      "first_name": this.registerForm.controls.first_name.value,
      "last_name": this.registerForm.controls.last_name.value,
      "password": this.registerForm.controls.password.value,
    };

    this.registrationService.registerUser(data).subscribe(
        data =>{
          console.warn("KING");
          this.router.navigate(['/pages/login']);
        },
        errors =>{
          this.changeDetector.detectChanges();
        }
    );



  }
}
