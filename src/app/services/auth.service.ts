import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase/firebase-service.service';
import { UserData } from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticatedSubject = new BehaviorSubject<any>(null);
  isUserAuthenticatedObservable = this.isUserAuthenticatedSubject.asObservable();

  constructor(private firebaseAuth: AngularFireAuth, private firebaseService: FirebaseService) { }

  signInRegular(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  setUser(userAuth: any) {
    let userData: UserData;
    this.firebaseService.getUserById(userAuth.user.uid).then(user => {
      userData = new UserData(user);
    });
    this.isUserAuthenticatedSubject.next(userData);
  }

  logOut() {
    this.setUser(null);
    return this.firebaseAuth.auth.signOut();
  }

}
