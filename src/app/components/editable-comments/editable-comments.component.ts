import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ReviewData } from 'src/app/models/ReviewData';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UserData } from 'src/app/models/UserData';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editable-comments',
  templateUrl: './editable-comments.component.html',
  styleUrls: ['./editable-comments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableCommentsComponent implements OnInit {

  @Input() review: ReviewData;
  userData: UserData;
  isUserSubscription: Subscription;
  @Input() editable: boolean;
  user: UserData;
  form: FormGroup;

  constructor(private authService: AuthService, private firebaseService: FirebaseService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.editable = result ? result.userId === this.review.userId : false;
      this.user = new UserData(result);
    });
    this.getUserDetailById(this.review.userId);
    this.form = this.formBuilder.group({
      stars: new FormControl('', [
        Validators.required
      ]),
      comment: new FormControl('', [
        Validators.required
      ])
    });
  }

  getUserDetailById(id: string) {
    this.firebaseService.getUserById(id).subscribe(details => {
      this.userData = new UserData(details);
    });
  }

  addComment() {
    console.log('test comment')
    console.log(this.form.value)
  }

}
