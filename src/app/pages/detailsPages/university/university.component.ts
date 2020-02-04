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
      universityId: new FormControl(this.universityDetails.universityId, [Validators.required])
    });
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
      this.userCanEdit = result ? result.universityId === this.universityId : false;
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.universityId = params.get('id');
      this.userCanEdit = this.user ? this.user.universityId === this.universityId : false;
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

  isArray(item: any) {
    return Array.isArray(item);
  }

  editDetails() {
    this.editEnabled = !this.editEnabled;
  }

  saveDetails() {
    this.editEnabled = !this.editEnabled;
    this.firebaseService.saveUniversityDetails(new UniversityData(this.form.value));
  }

  getUserLocation() {
    this.functionsService.getPosition().then(pos => {
      this.origin = {
        latitude: pos.lat,
        longitude: pos.lng
      };
    });
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
