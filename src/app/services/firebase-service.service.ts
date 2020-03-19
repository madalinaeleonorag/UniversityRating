import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequestData } from '../models/RequestData';
import { UniversityData } from '../models/UniversityData';
import { FunctionsService } from './functions.service';
import { Observable, Subscription } from 'rxjs';
import { FacultyData } from '../models/FacultyData';
import { ReviewData } from '../models/ReviewData';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fb = firebase.firestore();
  bachelorsCollection = this.afs.collection('Bachelors');
  doctoralsCollection = this.afs.collection('Doctorals');
  facultiesCollection = this.afs.collection('Faculties');
  mastersCollection = this.afs.collection('Masters');
  requestsCollection = this.afs.collection('Requests');
  universityCollection = this.afs.collection('University');
  coursesCollection = this.afs.collection('Courses');
  reviewsCollection = this.afs.collection('Reviews');
  usersCollection = this.afs.collection('Users');

  constructor(private afs: AngularFirestore, private functionsService: FunctionsService) {
  }

  editUserDetails(userId: string, details: object) {
    // TODO
    Object.keys(details).forEach((key) => (details[key] == null) && delete details[key]);
    return this.fb.collection('Users').doc(userId).update(Object.assign({}, details));
  }

  getBachelorsData() {
    return this.bachelorsCollection.valueChanges();
  }

  getDoctoralsData() {
    return this.doctoralsCollection.valueChanges();
  }

  getFacultiesData() {
    return this.facultiesCollection.valueChanges();
  }

  getMastersData() {
    return this.mastersCollection.valueChanges();
  }

  getRequestsData() {
    return this.requestsCollection.valueChanges();
  }

  getUniversitiesData() {
    return this.universityCollection.valueChanges();
  }

  getUsersData() {
    return this.usersCollection.valueChanges();
  }

  getCoursesData() {
    return this.coursesCollection.valueChanges();
  }

  getReviewsData() {
    return this.reviewsCollection.valueChanges();
  }

  getUniversityById(id: string): Observable<any> {
    return this.universityCollection.doc(id).valueChanges();
  }

  getFacultyById(id: string) {
    return this.facultiesCollection.doc(id).valueChanges();
  }

  getBacheloryById(id: string) {
    return this.mastersCollection.doc(id).valueChanges();
  }

  getMasterById(id: string) {
    return this.mastersCollection.doc(id).valueChanges();
  }

  getDoctoralById(id: string) {
    return this.doctoralsCollection.doc(id).valueChanges();
  }

  getCourseById(id: string) {
    return this.coursesCollection.doc(id).valueChanges();
  }

  getUserById(id: string) {
    return this.usersCollection.doc(id).valueChanges();
  }

  getRequestById(id: string) {
    return this.requestsCollection.doc(id).valueChanges();
  }

  saveNewUser(details: any, uid: string) {
    return firebase.firestore().collection('Users/').doc(uid).set(details);
  }

  saveUniversityDetails(details: UniversityData) {
    firebase.firestore().collection('University').doc(details.universityId).update(Object.assign({}, details));
  }

  approveRequest(request: any) {
    const universityData = {
      address: request.address ? request.address : null,
      descriptionUniversity: request.descriptionUniversity ? request.descriptionUniversity : null,
      facilitiesUniversity: request.facilitiesUniversity ? request.facilitiesUniversity : null,
      logoUniversity: request.logoUniversity ? request.logoUniversity : null,
      nameUniversity: request.nameUniversity ? request.nameUniversity : null,
      phone: request.phone ? request.phone : null,
      photosUniversity: request.photosUniversity ? request.photosUniversity : null,
      typeUniversity: request.typeUniversity ? request.typeUniversity : null,
      websiteUniversity: request.websiteUniversity ? request.websiteUniversity : null,
      rating: 0,
      universityId: request.requestId,
      adminAnswer: request.adminAnswer ? request.adminAnswer : null,
      locationUniversity: [request.locationUniversity, request.latitude, request.longitude]
    };
    // approved in requests
    firebase.firestore().collection('Requests/').doc(request.requestId).update({
      status: 'approved'
    });
    // add in university
    firebase.firestore().collection('University').doc(request.requestId).set(universityData);
    // add universityId in user profile
    firebase.firestore().collection('Users/').doc(request.userId).update({
      universityId: request.requestId,
      type: 'approved',
      typeUser: 'university'
    });
  }

  declineRequest(request: RequestData, message: string) {
    firebase.firestore().collection('Requests/').doc(request.requestId).update({
      status: 'declined',
      adminAnswer: message
    });
  }

  sendRequest(request: any, state: string, requestId: string) {
    const requestData = {
      address: request.address ? request.address : '',
      descriptionUniversity: request.descriptionUniversity ? request.descriptionUniversity : '',
      facilitiesUniversity: request.facilitiesUniversity ? request.facilitiesUniversity : '',
      locationUniversity: request.locationUniversity ? request.locationUniversity : '',
      logoUniversity: request.logoUniversity ? request.logoUniversity : '',
      nameUniversity: request.nameUniversity ? request.nameUniversity : '',
      phone: request.phone ? request.phone : '',
      photosUniversity: request.photosUniversity ? request.photosUniversity : '',
      typeUniversity: request.typeUniversity ? request.typeUniversity : '',
      websiteUniversity: request.websiteUniversity ? request.websiteUniversity : '',
      rating: 0,
      userId: request.userId ? request.userId : '',
      status: 'pending',
      adminAnswer: ''
    };
    if (state === 'new') {
      firebase.firestore().collection('Requests').add(requestData).then(docRef => {
        firebase.firestore().collection('Requests').doc(docRef.id).update({
          requestId: docRef.id
        });
        firebase.firestore().collection('Users/').doc(request.userId).update({
          requestId: docRef.id
        });
      }).catch(error => {
        console.error('Error writing document: ', error);
      });
    } else if (state === 'draft') {
      firebase.firestore().collection('Requests').doc(requestId).update({
        status: 'pending'
      });
    }
  }

  setNewFacultyForUniversity(universityId: string, data: any, existingFaculties: Array<string>) {
    firebase.firestore().collection('Faculties').add(
      {
        nameFaculty: data.name,
        descriptionFaculty: data.description,
        universityId
      }
    ).then(docRef => {
      let faculties = [];
      if (Array.isArray(existingFaculties)) {
        faculties = [...existingFaculties];
        faculties.push(docRef.id);
      } else {
        faculties.push(docRef.id);
      }
      firebase.firestore().collection('University/').doc(universityId).update({
        facultiesUniversity: faculties
      });
      firebase.firestore().collection('Faculties/').doc(docRef.id).update({
        facultyId: docRef.id
      });
    }).catch(error => {
      console.error('Error writing document: ', error);
    });
  }

  facultyRemove(item: FacultyData) {
    firebase.firestore().collection('Faculties').doc(item.facultyId).delete().then(res => {
      let subscriptionUniversity: Subscription = this.getUniversityById(item.universityId).subscribe(university => {
        subscriptionUniversity.unsubscribe();
        const data = new UniversityData(university);
        data.facultiesUniversity.splice(data.facultiesUniversity.indexOf(item.facultyId), 1);
        firebase.firestore().collection('University').doc(item.universityId).update({
          facultiesUniversity: data.facultiesUniversity
        });
      });
    });
  }

  addComment(item: ReviewData) {
    var dayString = moment(new Date()).format("DD-MM-YYYY");
    const data = {
      comment: item.comment,
      facultyId: item.facultyId ? item.facultyId : '',
      status: item.status ? item.status : '',
      stars: item.stars,
      userId: item.userId,
      universityId: item.universityId ? item.universityId : '',
      date: dayString
    }
    firebase.firestore().collection('Reviews').add(data).then(res => {
      firebase.firestore().collection('Reviews').doc(res.id).update({
        reviewId: res.id
      })
    }).catch(err => {
      console.log(err);
    })
  }

  updateExistingComment(item: ReviewData) {
    const data = {
      comment: item.comment,
      facultyId: item.facultyId ? item.facultyId : '',
      status: item.status,
      stars: item.stars,
      userId: item.userId,
      universityId: item.universityId ? item.universityId : '',
      date: item.date,
      reviewId: item.reviewId
    }
    firebase.firestore().collection('Reviews').doc(item.reviewId).update(data).then(res => {
    }).catch(err => {
      console.log(err)
    })
  }

}
