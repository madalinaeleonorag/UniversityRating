import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase-service.service';
import { forkJoin, Observable, of, merge, zip } from 'rxjs';
import { switchMap, first, take } from 'rxjs/operators';
import { UniversityData } from '../models/UniversityData';
import { UserData } from '../models/UserData';
import { CourseData } from '../models/CourseData';
import { RequestData } from '../models/RequestData';
import { FacultyData } from '../models/FacultyData';

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

  getFacultiesPerUniversity() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const facultiesNumber = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.facultiesUniversity) {
            facultiesNumber.push(university.facultiesUniversity.length);
          } else {
            facultiesNumber.push(0);
          }
        });
        const numbers = [...new Set(facultiesNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfFaculties => {
          objectToReturn.push([`${numberOfFaculties} faculties`, numberOfFaculties]);
        });
        return of(objectToReturn);
      })
    );
  }

  getPhotosPerUniversity() {
    return this.firebaseService.getUniversitiesData().pipe(
      switchMap((result: []) => {
        const photosNumber = [];
        result.forEach(item => {
          const university = new UniversityData(item);
          if (university.photosUniversity) {
            photosNumber.push(university.photosUniversity.length);
          } else {
            photosNumber.push(0);
          }
        });
        const numbers = [...new Set(photosNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfphotos => {
          objectToReturn.push([`${numberOfphotos} photos`, numberOfphotos]);
        });
        return of(objectToReturn);
      })
    );
  }

  getBachelorsPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const bachelorsNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.bachelors) {
            bachelorsNumber.push(faculty.bachelors.length);
          } else {
            bachelorsNumber.push(0);
          }
        });
        const numbers = [...new Set(bachelorsNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfbachelors => {
          objectToReturn.push([`${numberOfbachelors} bachelors`, numberOfbachelors]);
        });
        return of(objectToReturn);
      })
    );
  }

  getDoctoralsPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const doctoralsNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.doctorals) {
            doctoralsNumber.push(faculty.doctorals.length);
          } else {
            doctoralsNumber.push(0);
          }
        });
        const numbers = [...new Set(doctoralsNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfDoctorals => {
          objectToReturn.push([`${numberOfDoctorals} doctorals`, numberOfDoctorals]);
        });
        return of(objectToReturn);
      })
    );
  }

  getMastersPerFaculty() {
    return this.firebaseService.getFacultiesData().pipe(
      switchMap((result: []) => {
        const mastersNumber = [];
        result.forEach(item => {
          const faculty = new FacultyData(item);
          if (faculty.masters) {
            mastersNumber.push(faculty.masters.length);
          } else {
            mastersNumber.push(0);
          }
        });
        const numbers = [...new Set(mastersNumber)];
        const objectToReturn = [];
        numbers.forEach(numberOfMasters => {
          objectToReturn.push([`${numberOfMasters} masters`, numberOfMasters]);
        });
        return of(objectToReturn);
      })
    );
  }

}
