import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { CourseData } from 'src/app/models/CourseData';
import { MatDialog } from '@angular/material';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';
import { SpecialisationData } from 'src/app/models/SpecialisationData';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editable-expansion-panel',
  templateUrl: './editable-expansion-panel.component.html',
  styleUrls: ['./editable-expansion-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableExpansionPanelComponent implements OnInit {

  @Input() data: SpecialisationData;
  @Input() editable: boolean;
  @Input() type: string;
  form: FormGroup;
  courses = [];
  userChooseToEdit: boolean;

  constructor(private firebaseService: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    this.buildForm();
    if (this.data.courses && this.data.courses.length > 0) {
      this.getCourses(this.data.courses);
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      id: new FormControl(this.data.id, [Validators.required]),
      facultyId: new FormControl(this.data.facultyId, [Validators.required]),
      years: new FormControl(this.data.years, [Validators.required]),
      semesters: new FormControl(this.data.semesters, [Validators.required])
    })
  }

  getCourses(coursesIds: string[]) {
    coursesIds.forEach(courseId => {
      this.firebaseService.getCourseById(courseId).subscribe(result => {
        this.courses.push(new CourseData(result));
      });
    });
  }


  modifyValuesFromList(event: Array<any>, type: string) {
    this.data[type] = event;
  }

  editProgram() {
    this.userChooseToEdit = !this.userChooseToEdit;
  }

  removeProgram() {
    this.editProgram();
    this.firebaseService.programRemove(this.data, this.type);
  }

  saveProgram() {
    this.editProgram();
    this.firebaseService.programEdit(this.data, this.type);
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
      width: '50vw',
      data: course
    });
  }

}
