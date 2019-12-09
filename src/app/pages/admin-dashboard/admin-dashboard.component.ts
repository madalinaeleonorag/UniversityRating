import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DoughnutData } from 'src/app/models/DoughnutData';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  totalEducationLevelChart: any;

  constructor(private dashboardServide: DashboardService) { }

  ngOnInit() {

    this.dashboardServide.getNumberOfEducationLevel().subscribe(result => {
      this.totalEducationLevelChart =
      new DoughnutData(this.dashboardServide.constructData(result, 'Education level'));
    });

  }

}
