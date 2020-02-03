import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { } from 'googlemaps';
import { ILatLng } from 'src/app/directives/directions-map.directive';
import { LocationService } from 'src/app/services/location.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router,
              private locationService: LocationService, private authService: AuthService) { }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.userCanEdit = result ? result.universityId === this.universityId : false;
    });

    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.universityId = params.get('id');
      if (this.universityId) {
        this.firebaseService.getUniversityById(this.universityId).then(data => {
          this.universityDetails = new UniversityData(data);
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
    console.log('test')
  }

  getUserLocation() {
    this.locationService.getPosition().then(pos => {
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
