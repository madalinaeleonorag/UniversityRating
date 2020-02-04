import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
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
      result.forEach(element => {
        this.requests.push(new RequestData(element));
      });
    });
  }

  approve(item) {
    this.firebaseService.approveRequest(item);
  }

  decline(item) {
    const dialogRef = this.dialog.open(ReviewResponseComponent, {
      width: '250px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.declineRequest(item, result);
    });
  }

}
