import { Component } from '@angular/core';
import { FirebaseService } from './firebase/firebase-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UniversityRating';

  constructor(private firebaseService: FirebaseService) {
  }

}
