import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpDialogComponent implements OnInit {

  signUpForm: FormGroup;
  error: string;
  matcher = new MyErrorStateMatcher();
  schoolLevelValues = ['primary', 'highschool', 'licence', 'master', 'doctoral', 'finished'];
  locations = [];

  constructor(private dialogRef: MatDialogRef<SignUpDialogComponent>,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private firebaseService: FirebaseService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  getAddress(place: object) {
    const address = 'address_components';
    const addressComponents = place[address];
    this.signUpForm.get('location').setValue(addressComponents[addressComponents.length - 4].long_name)
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      passwordRepeat: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      birthday: new FormControl('', [
        Validators.required
      ]),
      sex: new FormControl('', [
        Validators.required
      ]),
      schoolLevel: new FormControl('', [
        Validators.required
      ]),
      classLevel: new FormControl('', [
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.required
      ]),
      gdpr: new FormControl('', [
        Validators.required
      ])
    });
  }

  classLevelValues(schoolLevel: string) {
    switch (schoolLevel) {
      case 'primary': return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
      case 'highschool': return ['IX', 'X', 'XI', 'XII'];
      case 'licence': return ['1', '2', '3', '4', '5', '6'];
      case 'master': return ['1', '2', '3'];
      case 'doctoral': return ['1', '2'];
      default: return '';
    }
  }

  signUpWithEmail() {
    this.error = '';
    if (this.signUpForm.value.password === this.signUpForm.value.passwordRepeat) {
      this.authService.signUpRegular(this.signUpForm.value)
      .then((res) => {
        const details = {
          email: this.signUpForm.value.email,
          name: this.signUpForm.value.name,
          surname: this.signUpForm.value.surname,
          birthday: this.signUpForm.value.birthday,
          sex: this.signUpForm.value.sex,
          schoolLevel: this.signUpForm.value.schoolLevel,
          classLevel: this.signUpForm.value.classLevel,
          location: this.signUpForm.value.location,
          gdpr: this.signUpForm.value.gdpr,
          requestId: null,
          type: 'user',
          id: res.user.uid,
          universityId: null
        };
        this.firebaseService.saveNewUser(details, res.user.uid).then(newUser => {
          this.dialogRef.close(res);
        });
      })
      .catch((err) => this.error = err);
    } else {
      this.error = 'Passwords are different';
    }
  }

  cancelSignUp(): void {
    this.dialogRef.close();
  }

}
