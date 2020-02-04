import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { } from 'googlemaps';
import { ILatLng } from 'src/app/directives/directions-map.directive';
import { FunctionsService } from 'src/app/services/functions.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UniversityComponent implements OnInit, OnDestroy {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: google.maps.Map;
  paramSubscription: Subscription;
  universityDetails: UniversityData = new UniversityData(undefined);
  facultiesData: FacultyData[] = [];
  displayedColumns: string[] = ['name', 'bachelors', 'masters', 'doctorals', 'button'];
  origin: ILatLng;
  destination: ILatLng;
  displayDirections = false;
  zoom = 25;
  userCanEdit: boolean;
  isUserSubscription: Subscription;
  universityId: string;
  form: FormGroup;
  user: any;
  editEnabled: boolean;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router,
    private functionsService: FunctionsService, private authService: AuthService) {
      this.buildForm();
  }

  private buildForm() {
    this.form = new FormGroup({
      logoUniversity: new FormControl(this.universityDetails.logoUniversity, [Validators.required]),
      nameUniversity: new FormControl(this.universityDetails.nameUniversity, [Validators.required]),
      universityId: new FormControl(this.universityDetails.universityId, [Validators.required]),
      typeUniversity: new FormControl(this.universityDetails.typeUniversity, [Validators.required]),
      descriptionUniversity: new FormControl(this.universityDetails.descriptionUniversity, [Validators.required]),
      mission: new FormControl(this.universityDetails.mission, [Validators.required]),
      strategicProgram: new FormControl(this.universityDetails.strategicProgram, [Validators.required]),
      values: new FormControl(this.universityDetails.values, [Validators.required]),
      vision: new FormControl(this.universityDetails.vision, [Validators.required]),
      phone: new FormControl(this.universityDetails.phone, [Validators.required]),
      address: new FormControl(this.universityDetails.address, [Validators.required]),
      fax: new FormControl(this.universityDetails.fax, [Validators.required]),
      locationUniversity: new FormControl(this.universityDetails.locationUniversity[0], [Validators.required]),
      latitude: new FormControl(this.universityDetails.locationUniversity[1], [Validators.required]),
      longitude: new FormControl(this.universityDetails.locationUniversity[2], [Validators.required])
    });
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
      this.userEditable();
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.universityId = params.get('id');
      this.userEditable();
      if (this.universityId) {
        this.firebaseService.getUniversityById(this.universityId).then(data => {
          this.universityDetails = new UniversityData(data);
          this.buildForm();
          if (Array.isArray(this.universityDetails.locationUniversity) && this.universityDetails.locationUniversity[1]) {
            this.destination = {
              latitude: +this.universityDetails.locationUniversity[1],
              longitude: +this.universityDetails.locationUniversity[2]
            };
            this.getUserLocation();
            this.displayDirections = true;
          }
        });
        this.firebaseService.getFacultiesData().subscribe(data => {
          this.facultiesData = [];
          data.forEach(faculty => {
            const facultyDetails = new FacultyData(faculty);
            if (facultyDetails.universityId === this.universityId) {
              this.facultiesData.push(facultyDetails);
            }
          });
        });
      }
    });
  }

  userEditable() {
    this.userCanEdit = this.user ? this.user.universityId === this.universityId : false;
    if (this.editEnabled) {
      this.displayedColumns.push('removeButton')
    } else {
      const index = this.displayedColumns.indexOf('removeButton');
      this.displayedColumns.splice(index, 1);
    }
  }

  isArray(item: any) {
    return Array.isArray(item);
  }

  editDetails() {
    this.editEnabled = !this.editEnabled;
    this.userEditable();
  }

  saveDetails() {
    this.editEnabled = !this.editEnabled;
    this.firebaseService.saveUniversityDetails(this.form.value);
  }

  getUserLocation() {
    this.functionsService.getPosition().then(pos => {
      this.origin = {
        latitude: pos.lat,
        longitude: pos.lng
      };
    });
  }

  addFaculty() {
    console.log('test');
  }

  removeFaculty(data: any) {
    console.log(data);
  }

  onNavigate(id: string) {
    this.router.navigateByUrl(`/faculty/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.isUserSubscription) {
      this.isUserSubscription.unsubscribe();
    }
  }

}
