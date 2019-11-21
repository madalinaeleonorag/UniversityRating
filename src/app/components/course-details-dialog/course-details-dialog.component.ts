import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseData } from 'src/app/models/CourseData';

@Component({
  selector: 'app-course-details-dialog',
  templateUrl: './course-details-dialog.component.html',
  styleUrls: ['./course-details-dialog.component.scss']
})
export class CourseDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CourseDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public course: CourseData) { }

  ngOnInit() {
  }

}
