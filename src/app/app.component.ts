import { Component, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from './firebase/firebase-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'UniversityRating';
  firstPage: boolean;
  

  constructor(private firebaseService: FirebaseService, private translate: TranslateService) {
    this.translate.setDefaultLang('ro');
    this.translate.use('en');
  }

  ngOnInit() {
    //TODO get active route for header styling


    // this.firebaseService.getBachelorsData().subscribe(result => console.log('getBachelorsData: ', result));
    // this.firebaseService.getCommentsData().subscribe(result => console.log('getCommentsData: ', result));
    // this.firebaseService.getDoctoralsData().subscribe(result => console.log('getDoctoralsData: ', result));
    // this.firebaseService.getFacultiesData().subscribe(result => console.log('getFacultiesData: ', result));
    // this.firebaseService.getMastersData().subscribe(result => console.log('getMastersData: ', result));
    // this.firebaseService.getRequestsData().subscribe(result => console.log('getRequestsData: ', result));
    // this.firebaseService.getUniversitiesData().subscribe(result => console.log('getUniversitiesData: ', result));
    // this.firebaseService.getUsersData().subscribe(result => console.log('getUsersData: ', result));
  }

}
