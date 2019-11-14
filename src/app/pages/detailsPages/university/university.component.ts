import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { } from 'googlemaps';

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

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.firebaseService.getUniversityById(id).then(data => {
          this.universityDetails = new UniversityData(data);
          this.initializeMap();
        });
        this.firebaseService.getFacultiesData().subscribe(data => {
          this.facultiesData = [];
          data.forEach(faculty => {
            const facultyDetails = new FacultyData(faculty);
            if (facultyDetails.universityId === id) {
              this.facultiesData.push(facultyDetails);
            }
          });
        });
      }
    });
  }

  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(+this.universityDetails.locationUniversity[1],
        +this.universityDetails.locationUniversity[2]),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // tslint:disable-next-line: no-unused-expression
    new google.maps.Marker({
      position: new google.maps.LatLng(+this.universityDetails.locationUniversity[1],
        +this.universityDetails.locationUniversity[2]),
      map: this.map,
      title: this.universityDetails.nameUniversity
    });
  }

  onNavigate(id: string) {
    this.router.navigateByUrl(`/faculty/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
