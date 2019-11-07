import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { BachelorData } from 'src/app/models/BachelorData';
import { MasterData } from 'src/app/models/MasterData';
import { DoctoralData } from 'src/app/models/DoctoralData';

export interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacultyComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;
  facultyDetails: FacultyData;
  universityDetails: UniversityData;
  bachelorsData: BachelorData[] = [];
  mastersData: MasterData[] = [];
  doctoralsData: DoctoralData[] = [];

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private router: Router) { }
//TODO add route to university page

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.firebaseService.getFacultyById(id).then(data => {
          this.facultyDetails = new FacultyData(data);
          console.log('facultyDetails:', this.facultyDetails);
          if (this.facultyDetails.universityId) {
            this.firebaseService.getUniversityById(this.facultyDetails.universityId).then(university => {
              this.universityDetails = new UniversityData(university);
            });
          }
          if (this.facultyDetails.bachelors.length > 0) {
            this.facultyDetails.bachelors.forEach(bachelorId => {
              this.firebaseService.getBacheloryById(bachelorId).then(bachelor => {
                this.bachelorsData.push(new BachelorData(bachelor));
              });
            });
          }
          if (this.facultyDetails.masters.length > 0) {
            this.facultyDetails.masters.forEach(masterId => {
              this.firebaseService.getMasterById(masterId).then(master => {
                this.mastersData.push(new MasterData(master));
              });
            });
          }
          if (this.facultyDetails.doctorals.length > 0) {
            this.facultyDetails.doctorals.forEach(doctoralId => {
              this.firebaseService.getDoctoralById(doctoralId).then(doctoral => {
                this.doctoralsData.push(new DoctoralData(doctoral));
              });
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
