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

  constructor(private firebaseService: FirebaseService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('ro');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit() {
    this.firebaseService.getBachelorsData().subscribe(result => console.log('getBachelorsData: ', result));
    this.firebaseService.getCommentsData().subscribe(result => console.log('getCommentsData: ', result));
    this.firebaseService.getDoctoralsData().subscribe(result => console.log('getDoctoralsData: ', result));
    this.firebaseService.getFacultiesData().subscribe(result => console.log('getFacultiesData: ', result));
    this.firebaseService.getMastersData().subscribe(result => console.log('getMastersData: ', result));
    this.firebaseService.getRequestsData().subscribe(result => console.log('getRequestsData: ', result));
    this.firebaseService.getUniversitiesData().subscribe(result => console.log('getUniversitiesData: ', result));
    this.firebaseService.getUsersData().subscribe(result => console.log('getUsersData: ', result));
  }

}
