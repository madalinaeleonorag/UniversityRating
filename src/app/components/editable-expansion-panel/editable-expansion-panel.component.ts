import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { CourseData } from 'src/app/models/CourseData';
import { MatDialog } from '@angular/material';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';

@Component({
  selector: 'app-editable-expansion-panel',
  templateUrl: './editable-expansion-panel.component.html',
  styleUrls: ['./editable-expansion-panel.component.scss']
})
export class EditableExpansionPanelComponent implements OnInit {

  @Input() data: any
  type: string;
  courses = [];
  
  constructor(private firebaseService: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.data.courses && this.data.courses.length > 0) {
      this.getCourses(this.data.courses);
    }
  }

  getCourses(coursesIds: string[]) {
    coursesIds.forEach(courseId => {
      this.firebaseService.getCourseById(courseId).subscribe(result => {
        this.courses.push(new CourseData(result));
      });
    });
  }

  editProgram(type: string) {

  }

  getCoursesForSpecialisation(specialisationId: string) {
    const specificCourses: CourseData[] = [];
    this.courses.forEach((course: CourseData) => {
      if (course.specialisationId === specialisationId) {
        specificCourses.push(course);
      }
    });
    return specificCourses;
  }


  showInfoAboutCourse(course: CourseData) {
    this.dialog.open(CourseDetailsDialogComponent, {
      width: '100%',
      data: course
    });
  }

}
