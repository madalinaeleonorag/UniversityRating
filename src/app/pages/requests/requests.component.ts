import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { RequestData } from 'src/app/models/RequestData';
import { ReviewResponseComponent } from 'src/app/components/review-response/review-response.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requests: RequestData[] = [];
  constructor(private firebaseService: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.firebaseService.getRequestsData().subscribe(result => {
      console.log(result);
      result.forEach(element => {
        this.requests.push(new RequestData(element));
      });
    });
  }

  approve(item) {
    this.firebaseService.approveRequest(item);
  }

  reviewByUser(item) {
    const dialogRef = this.dialog.open(ReviewResponseComponent, {
      width: '250px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.firebaseService.reviewRequest(item, result);
    });
  }

}
