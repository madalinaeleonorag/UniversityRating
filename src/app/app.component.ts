import { Component } from '@angular/core';
import { FirebaseService } from './firebase/firebase-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UniversityRating';

  constructor(private firebaseService: FirebaseService) {
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
