import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

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
  usersCollection = this.afs.collection('Users');

  constructor(private afs: AngularFirestore) {
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

  getUserById(id: string) {
    return this.fb.collection('Users').doc(id).get().then(doc => doc.data());
  }

  saveNewUser(details: any, uid: string) {
    return firebase.firestore().collection('Users/').doc(uid).set(details);
  }

}
