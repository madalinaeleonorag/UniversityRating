import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UniversityData } from 'src/app/models/UniversityData';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { ActivatedRoute } from '@angular/router';
import { Facilities } from 'src/app/enums/Facilities';
import { RequestData } from 'src/app/models/RequestData';

@Component({
  selector: 'app-request-university',
  templateUrl: './request-university.component.html',
  styleUrls: ['./request-university.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RequestUniversityComponent implements OnInit {

  form: any;
  user: any;
  universityDetails: UniversityData;
  isUserSubscription: Subscription;
  paramSubscription: Subscription;
  state: string;
  facilitiesList = Object.keys(Facilities);

  constructor(private authService: AuthService, private snackBar: MatSnackBar,
              private firebaseService: FirebaseService, private route: ActivatedRoute) {
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
        this.firebaseService.getRequestById(this.user.requestId).subscribe(response => {
          const data = new RequestData(response);
          this.form.patchValue({
            addressFormControl: data.address,
            descriptionUniversityFormControl: data.descriptionUniversity,
            facilitiesFormControl: data.facilitiesUniversity,
            locationFormControl: data.locationUniversity[0],
            latitudeLocationFormControl: data.locationUniversity[1],
            longitudeLocationFormControl: data.locationUniversity[2],
            logoFormControl: data.logoUniversity,
            nameFormControl: data.nameUniversity,
            phoneFormControl: data.phone,
            photosFormControl: data.photosUniversity,
            typeFormControl: data.typeUniversity,
            websiteFormControl: data.websiteUniversity
          })
        })
      }
    });
  }

  private buildForm() {
    this.form = new FormGroup({
      addressFormControl: new FormControl(this.universityDetails.address, [Validators.required]),
      descriptionUniversityFormControl: new FormControl(this.universityDetails.descriptionUniversity, [Validators.required]),
      locationFormControl: new FormControl(this.universityDetails.locationUniversity[0], [Validators.required]),
      logoFormControl: new FormControl(this.universityDetails.logoUniversity),
      nameFormControl: new FormControl(this.universityDetails.nameUniversity, [Validators.required]),
      phoneFormControl: new FormControl(this.universityDetails.phone, [Validators.required]),
      typeFormControl: new FormControl(this.universityDetails.typeUniversity, [Validators.required]),
      websiteFormControl: new FormControl(this.universityDetails.websiteUniversity, [Validators.required])
    });
  }

  send() {
    const details = {
      address: this.form.value.addressFormControl,
      descriptionUniversity: this.form.value.descriptionUniversityFormControl,
      locationUniversity: [this.form.value.locationFormControl, 0, 0],
      logoUniversity: this.form.value.logoFormControl,
      nameUniversity: this.form.value.nameFormControl,
      phone: this.form.value.phoneFormControl,
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
  getAddress(place: object) {
    console.log(place)
    this.universityDetails.address = place['formatted_address'];
    const addressComponents = place['address_components'];
    this.form.value.locationFormControl = addressComponents[addressComponents.length - 4].long_name;
  }

}
