import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase-service.service';
import { forkJoin, Observable, of, merge, zip } from 'rxjs';
import { switchMap, first, take } from 'rxjs/operators';
import { UniversityData } from '../models/UniversityData';
import { UserData } from '../models/UserData';
import { CourseData } from '../models/CourseData';
import { RequestData } from '../models/RequestData';

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

  getNumbersOfUniversityTypes() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const privateUniversity = result.filter(item => {
          const university = new UniversityData(item);
          return university.typeUniversity === 'Privat';
        });
        const stateUniversity = result.filter(item => {
          const university = new UniversityData(item);
          return university.typeUniversity === 'Stat';
        });
        return of([
          ['Private', privateUniversity.length],
          ['State', stateUniversity.length]
        ]);
      }));
  }

  getUsersSex() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const feminine = result.filter(item => {
          const user = new UserData(item);
          return user.sex === 'F';
        });
        const masculine = result.filter(item => {
          const user = new UserData(item);
          return user.sex === 'M';
        });
        return of([
          ['Feminine', feminine.length],
          ['Masculine', masculine.length]
        ]);
      }));
  }

  getUsersGDPR() {
    return this.firebaseService.getUsersData().pipe(
      switchMap((result: []) => {
        const accepted = result.filter(item => {
          const user = new UserData(item);
          return user.gdpr === true;
        });
        const declined = result.filter(item => {
          const user = new UserData(item);
          return user.gdpr === false;
        });
        return of([
          ['Accepted', accepted.length],
          ['Declined', declined.length]
        ]);
      }));
  }

  getCourseVerificationType() {
    return this.firebaseService.getCoursesData().pipe(
      switchMap((result: []) => {
        const accepted = result.filter(item => {
          const course = new CourseData(item);
          return course.evaluationProcedure === 'exam';
        });
        const declined = result.filter(item => {
          const course = new CourseData(item);
          return course.evaluationProcedure === 'verification';
        });
        return of([
          ['Exam', accepted.length],
          ['Verification', declined.length]
        ]);
      }));
  }

  getRequestsStatuses() {
    return this.firebaseService.getRequestsData().pipe(
      switchMap((result: []) => {
        const pending = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'pending';
        });
        const approved = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'approved';
        });
        const declined = result.filter(item => {
          const request = new RequestData(item);
          return request.status === 'l';
        });
        return of([
          ['Pending', pending.length],
          ['Approved', approved.length],
          ['Declined', declined.length]
        ]);
      }));
  }

}
