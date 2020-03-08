import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UserData } from 'src/app/models/UserData';
import { Router } from '@angular/router';
import { RequestData } from 'src/app/models/RequestData';

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
  requestStatus: string;
  requestMessage: string;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private router: Router) {
  }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
      this.name = result ? result.name : '';
      this.surname = result ? result.surname : '';
      this.birthday = result ? result.birthday : '';
      this.sex = result ? result.sex : '';
      this.location = result ? result.locality : '';
      this.requestActive = result ? (result.requestId ? true : (result.type !== 'university') && (result.type !== 'admin')) : false;
      if (result) {
        this.firebaseService.getRequestById(result.requestId).subscribe(response => {
          const data = new RequestData(response);
          this.requestStatus = data.status;
          this.requestMessage = data.adminAnswer;
        });
      }
    });
  }

  saveNewDetails() {
    return this.firebaseService.editUserDetails(this.user.id, this.user).then(result => {
      this.canEdit = !this.canEdit;
    });
  }

  goToUniversityPage() {
    this.router.navigateByUrl(`/university/${this.user.universityId}`);
  }

  goToRequestPage(state) {
    this.router.navigateByUrl(`/requestUniversity/${state}`);
  }

}
