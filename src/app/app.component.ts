import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'UniversityRating';
  firstPage: boolean;
  

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ro');
    this.translate.use('en');
  }

  ngOnInit() {
    //TODO get active route for header styling

    // this.firebaseService.getCommentsData().subscribe(result => console.log('getCommentsData: ', result));
    // this.firebaseService.getRequestsData().subscribe(result => console.log('getRequestsData: ', result));
    // this.firebaseService.getUsersData().subscribe(result => console.log('getUsersData: ', result));
  }

}
