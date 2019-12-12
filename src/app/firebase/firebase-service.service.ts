import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from '../models/UserData';

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
  usersCollection = this.afs.collection('Users');

  constructor(private afs: AngularFirestore) {
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

  getUniversityById(id: string) {
    return this.fb.collection('University').doc(id).get().then(doc => doc.data());
  }

  getFacultyById(id: string) {
    return this.fb.collection('Faculties').doc(id).get().then(doc => doc.data());
  }

  getBacheloryById(id: string) {
    return this.fb.collection('Bachelors').doc(id).get().then(doc => doc.data());
  }

  getMasterById(id: string) {
    return this.fb.collection('Masters').doc(id).get().then(doc => doc.data());
  }

  getDoctoralById(id: string) {
    return this.fb.collection('Doctorals').doc(id).get().then(doc => doc.data());
  }

  getCourseById(id: string) {
    return this.fb.collection('Courses').doc(id).get().then(doc => doc.data());
  }

  getUserById(id: string) {
    return this.fb.collection('Users').doc(id).get().then(doc => doc.data());
  }

  saveNewUser(details: any, uid: string) {
    return firebase.firestore().collection('Users/').doc(uid).set(details);
  }

}
