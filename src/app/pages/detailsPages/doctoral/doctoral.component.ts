import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctoral',
  templateUrl: './doctoral.component.html',
  styleUrls: ['./doctoral.component.scss']
})
export class DoctoralComponent implements OnInit, OnDestroy {

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
