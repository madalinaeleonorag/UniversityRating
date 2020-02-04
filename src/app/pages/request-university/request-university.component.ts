import { Component, OnInit } from '@angular/core';
import { UniversityData } from 'src/app/models/UniversityData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { ActivatedRoute } from '@angular/router';

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
  paramSubscription: Subscription;
  state: string;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private firebaseService: FirebaseService, private route: ActivatedRoute) {
    this.universityDetails = new UniversityData(null);
    this.buildForm();
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.state = params.get('state');
      if (params.get('state') === 'draft' && this.user) {
        this.firebaseService.getRequestById(this.user.requestId).then(response => {
          this.form.patchValue({
            addressFormControl : response.address,
            descriptionUniversityFormControl : response.descriptionUniversity,
            facilitiesFormControl : response.facilitiesUniversity,
            locationFormControl : response.locationUniversity[0],
            latitudeLocationFormControl : response.locationUniversity[1],
            longitudeLocationFormControl : response.locationUniversity[2],
            logoFormControl : response.logoUniversity,
            nameFormControl : response.nameUniversity,
            phoneFormControl : response.phone,
            photosFormControl : response.photosUniversity,
            typeFormControl : response.typeUniversity,
            websiteFormControl : response.websiteUniversity
          })
        })
      }
    });
  }

  private buildForm() {
    this.form = new FormGroup({
      addressFormControl : new FormControl(this.universityDetails.address, [Validators.required]),
      descriptionUniversityFormControl : new FormControl(this.universityDetails.descriptionUniversity, [Validators.required]),
      facilitiesFormControl : new FormControl(this.universityDetails.facilitiesUniversity),
      locationFormControl : new FormControl(this.universityDetails.locationUniversity[0], [Validators.required]),
      latitudeLocationFormControl : new FormControl(this.universityDetails.locationUniversity[1], [Validators.required]),
      longitudeLocationFormControl : new FormControl(this.universityDetails.locationUniversity[2], [Validators.required]),
      logoFormControl : new FormControl(this.universityDetails.logoUniversity),
      nameFormControl : new FormControl(this.universityDetails.nameUniversity, [Validators.required]),
      phoneFormControl : new FormControl(this.universityDetails.phone, [Validators.required]),
      photosFormControl : new FormControl(this.universityDetails.photosUniversity),
      typeFormControl : new FormControl(this.universityDetails.typeUniversity, [Validators.required]),
      websiteFormControl : new FormControl(this.universityDetails.websiteUniversity, [Validators.required])
    });
  }

  send() {
    const details = {
      address: this.form.value.addressFormControl,
      descriptionUniversity: this.form.value.descriptionUniversityFormControl,
      locationUniversity: [this.form.value.locationFormControl, this.form.value.latitudeLocationFormControl, this.form.value.longitudeLocationFormControl],
      facilitiesUniversity: this.form.value.facilitiesFormControl,
      logoUniversity: this.form.value.logoFormControl,
      nameUniversity: this.form.value.nameFormControl,
      phone: this.form.value.phoneFormControl,
      photosUniversity: this.form.value.photosFormControl,
      status: 'pending',
      typeUniversity: this.form.value.typeFormControl,
      userId: this.user.id,
      websiteUniversity: this.form.value.websiteFormControl,
      adminAnswer: null
    }
    this.firebaseService.sendRequest(details, this.state, this.user.requestId);
    this.snackBar.open('Your request was sent', 'OK', {
      duration: 2000,
    });
  }

}
