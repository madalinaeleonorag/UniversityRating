import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { BachelorData } from '../models/BachelorData';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  bachelorsCollection = firebase.database().ref('Bachelors');
  commentsCollection = firebase.database().ref('Comments');
  doctoralsCollection = firebase.database().ref('Doctorals');
  facultiesCollection = firebase.database().ref('Faculties');
  mastersCollection = firebase.database().ref('Masters');
  requestsCollection = firebase.database().ref('Requests');
  universityCollection = firebase.database().ref('Universities');
  usersCollection = firebase.database().ref('Users');

  constructor() {
  }

  async getBachelorsData() {
    return this.bachelorsCollection.on('value', snap => {
      const myObj = snap.val();
      const alluserdetails = [];
      const keysUsers = Object.keys(snap.val());
      keysUsers.forEach(key => {
        const userdetails: BachelorData = new BachelorData(myObj[key], key);
        alluserdetails.push(userdetails);
      });
    }, error => {
      console.log('Error: ' + error.message);
    });
  }

  getCommentsData() {
    return this.commentsCollection;
  }

  getDoctoralsData() {
    return this.doctoralsCollection;
  }

  getFacultiesData() {
    return this.facultiesCollection;
  }

  getMastersData() {
    return this.mastersCollection;
  }

  getRequestsData() {
    return this.requestsCollection;
  }

  getUniversitiesData() {
    return this.universityCollection;
  }

  getUsersData() {
    return this.usersCollection;
  }

  getBachelorsByFacultyId(id: string) {
    // return this.fb.collection('Bachelors').where('facultyId', '==', id)

    // TODO: how the fuck is this working?
  }


  // TODO: move all of the functions which includes firebase there from the old project
}
