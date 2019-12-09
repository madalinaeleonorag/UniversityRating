import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DoughnutData } from 'src/app/models/DoughnutData';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  totalEducationLevel: any;
  universityTypes: any;
  usersSex: any;
  usersGDPR: any;
  courseVerificationType: any;
  requestsStatuses: any;
  facultiesPerUniversity: any;
  photosPerUniversity: any;
  bachelorsPerUniversity: any;
  mastersPerUniversity: any;
  doctoralsPerUniversity: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    this.dashboardService.getNumberOfEducationLevel().subscribe(result => {
      this.totalEducationLevel =
      new DoughnutData(this.dashboardService.constructData(result, 'Education level'));
    });

    this.dashboardService.getNumbersOfUniversityTypes().subscribe(result => {
      this.universityTypes = new DoughnutData(this.dashboardService.constructData(result, 'University types'));
    });

    this.dashboardService.getUsersSex().subscribe(result => {
      this.usersSex = new DoughnutData(this.dashboardService.constructData(result, 'Users sex'));
    });

    this.dashboardService.getUsersGDPR().subscribe(result => {
      this.usersGDPR = new DoughnutData(this.dashboardService.constructData(result, 'Users GDPR'));
    });

    this.dashboardService.getCourseVerificationType().subscribe(result => {
      this.courseVerificationType = new DoughnutData(this.dashboardService.constructData(result, 'Course verification type'));
    });

    this.dashboardService.getRequestsStatuses().subscribe(result => {
      this.requestsStatuses = new DoughnutData(this.dashboardService.constructData(result, 'Requests statuses'));
    });

    this.dashboardService.getFacultiesPerUniversity().subscribe(result => {
      this.facultiesPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Faculties per university'));
    });

    this.dashboardService.getPhotosPerUniversity().subscribe(result => {
      this.photosPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Photos per university'));
    });

    this.dashboardService.getBachelorsPerFaculty().subscribe(result => {
      this.bachelorsPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Bachelors per university'));
    });

    this.dashboardService.getMastersPerFaculty().subscribe(result => {
      this.mastersPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Masters per university'));
    });

    this.dashboardService.getDoctoralsPerFaculty().subscribe(result => {
      this.doctoralsPerUniversity = new DoughnutData(this.dashboardService.constructData(result, 'Doctorals per university'));
    });

  }

}
