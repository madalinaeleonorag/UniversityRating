import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UniversityComponent implements OnInit, OnDestroy {

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

  onNavigate(id: string) {
    this.router.navigateByUrl(`/faculty/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
