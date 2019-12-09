import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase-service.service';
import { forkJoin, Observable, of, merge, zip } from 'rxjs';
import { switchMap, first, take } from 'rxjs/operators';

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

  getNumberOfEducationLevel(): Observable<any> {
    return zip(this.firebaseService.getBachelorsData(),
      this.firebaseService.getDoctoralsData(),
      this.firebaseService.getMastersData())
      .pipe(
        switchMap(([bachelors, doctorals, masters]: [any, any, any]) => {
          return of([
            ['Bachelors', bachelors.length],
            ['Masters', masters.length],
            ['Doctorals', doctorals.length]
          ]);
        })
      );
  }
}
