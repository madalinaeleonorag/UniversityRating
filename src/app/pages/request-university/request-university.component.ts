import { Component, OnInit } from '@angular/core';
import { UniversityData } from 'src/app/models/UniversityData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MyErrorStateMatcher } from 'src/app/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-request-university',
  templateUrl: './request-university.component.html',
  styleUrls: ['./request-university.component.scss']
})

export class RequestUniversityComponent implements OnInit {

  form: any;
  user: any;
  universityDetails: UniversityData;
  isUserSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.universityDetails = new UniversityData(null);
    this.form = new FormGroup({
      addressFormControl : new FormControl(this.universityDetails.address, [Validators.required]),
      descriptionUniversityFormControl : new FormControl(this.universityDetails.descriptionUniversity, [Validators.required]),
      facilitiesFormControl : new FormControl(this.universityDetails.facilitiesUniversity, [Validators.required]),
      locationFormControl : new FormControl(this.universityDetails.locationUniversity[0], [Validators.required]),
      latitudeLocationFormControl : new FormControl(this.universityDetails.locationUniversity[1], [Validators.required]),
      longitudeLocationFormControl : new FormControl(this.universityDetails.locationUniversity[2], [Validators.required]),
      logoFormControl : new FormControl(this.universityDetails.logoUniversity, [Validators.required]),
      nameFormControl : new FormControl(this.universityDetails.nameUniversity, [Validators.required]),
      phoneFormControl : new FormControl(this.universityDetails.phone, [Validators.required]),
      photosFormControl : new FormControl(this.universityDetails.photosUniversity, [Validators.required]),
      typeFormControl : new FormControl(this.universityDetails.typeUniversity, [Validators.required]),
      websiteFormControl : new FormControl(this.universityDetails.websiteUniversity, [Validators.required])
    });
  }
  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
    });
  }

  send() {
    console.log('meh')
  }

}
