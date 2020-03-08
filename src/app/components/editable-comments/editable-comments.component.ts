import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ReviewData } from 'src/app/models/ReviewData';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-editable-comments',
  templateUrl: './editable-comments.component.html',
  styleUrls: ['./editable-comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableCommentsComponent implements OnInit {

  @Input() reviewsList: ReviewData[];
  isUserSubscription: Subscription;
  userId: any;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.userId = result ? result.id : null;
    });
  }

  getUserDetailById(id: string) {
    return this.firebaseService.getUserById(id).subscribe(details => {
      return details;
    });
  }

}
