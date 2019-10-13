import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bachelor',
  templateUrl: './bachelor.component.html',
  styleUrls: ['./bachelor.component.scss']
})
export class BachelorComponent implements OnInit, OnDestroy {

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
