import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firebaseService: FirebaseService) { }

  constructData(values: Array<Array<any>>, title: string) {
    return {
      values,
      title
    };
  }

  getNumberOfEducationLevel() {
    let bachelors = 0;
    let masters = 0;
    let doctorals = 0;

    // tslint:disable-next-line: deprecation
    this.firebaseService.getBachelorsData().subscribe(result => {
      bachelors = result.length;
    });
    this.firebaseService.getDoctoralsData().subscribe(result => {
      doctorals = result.length;
    });
    this.firebaseService.getMastersData().subscribe(result => {
      masters = result.length;
    });

    return [
      ['bachelors', bachelors],
      ['masters', masters],
      ['doctorals', doctorals]
    ];
  }
}
