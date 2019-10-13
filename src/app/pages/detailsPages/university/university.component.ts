import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UniversityComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;
  universityDetails: UniversityData = new UniversityData(undefined);

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.firebaseService.getUniversityById(id).then(data => {
          this.universityDetails = new UniversityData(data);
          console.log(this.universityDetails);

        });
      }
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
