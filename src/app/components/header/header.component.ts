import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() firstPage: boolean;

  ngOnInit() {
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }

  // TODO logic

}
