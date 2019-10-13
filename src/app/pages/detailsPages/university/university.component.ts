import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
