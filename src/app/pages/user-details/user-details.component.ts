import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import LocalitiesRO from 'src/assets/locationsRomania';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UserData } from 'src/app/models/UserData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: UserData;
  isUserSubscription: Subscription;
  name: string;
  surname: string;
  birthday: string;
  sex: string;
  location: string;
  locations: string[];
  canEdit = false;
  requestActive: boolean;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) {
    this.locations = LocalitiesRO;
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      console.log(result);
      this.user = result;
      this.name = result.name;
      this.surname = result.surname;
      this.birthday = result.birthday;
      this.sex = result.sex;
      this.location = result.locality;
      this.requestActive = result.requestId ? true : (result.type !== 'university') && (result.type !== 'admin');
    });
  }

  saveNewDetails() {
    return this.firebaseService.editUserDetails(this.user.id, this.user).then(result => {
      console.log(result);
      this.canEdit = !this.canEdit;
    });
  }

  goToRequestPage() {
    this.router.navigateByUrl('/requestUniversity');
  }

}
