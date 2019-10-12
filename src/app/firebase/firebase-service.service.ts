import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fb = firebase.firestore();
  bachelorsCollection = this.afs.collection('Bachelors');
  commentsCollection = this.afs.collection('Comments');
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

  getCommentsData() {
    return this.commentsCollection.valueChanges();
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

  getBachelorsByFacultyId(id: string) {
    // return this.fb.collection('Bachelors').where('facultyId', '==', id).valueChanges()

    // TODO: how the fuck is this working?
  }


  // TODO: move all of the functions which includes firebase there from the old project
}