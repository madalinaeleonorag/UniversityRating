import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase/firebase-service.service';
import { UserData } from '../models/UserData';
import { FormGroup } from '@angular/forms';

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

  signUpRegular(signUpForm: any) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  }

  setUser(userAuth: any) {
    if (userAuth) {
      this.firebaseService.getUserById(userAuth.user.uid).then(user => {
        this.isUserAuthenticatedSubject.next(new UserData(user));
      });
    } else {
      this.isUserAuthenticatedSubject.next(null);
    }
  }

  logOut() {
    this.setUser(null);
    return this.firebaseAuth.auth.signOut();
  }

}
