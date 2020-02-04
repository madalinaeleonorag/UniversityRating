import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { UniversityData } from 'src/app/models/UniversityData';
import { FacultyData } from 'src/app/models/FacultyData';
import { BachelorData } from 'src/app/models/BachelorData';
import { MasterData } from 'src/app/models/MasterData';
import { DoctoralData } from 'src/app/models/DoctoralData';
import { CourseData } from 'src/app/models/CourseData';
import { MatDialog } from '@angular/material';
import { CourseDetailsDialogComponent } from 'src/app/components/course-details-dialog/course-details-dialog.component';

export interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FacultyComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription;
  facultyDetails: FacultyData;
  universityDetails: UniversityData;
  bachelorsData: BachelorData[] = [];
  mastersData: MasterData[] = [];
  doctoralsData: DoctoralData[] = [];
  courses = [];

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.firebaseService.getFacultyById(id).then(data => {
          this.facultyDetails = new FacultyData(data);
          if (this.facultyDetails.universityId) {
            this.firebaseService.getUniversityById(this.facultyDetails.universityId).then(university => {
              this.universityDetails = new UniversityData(university);
            });
          }
          this.getBachelors();
          this.getMasters();
          this.getDoctorals();
        });
      }
    });
  }

  getBachelors() {
    if (this.facultyDetails.bachelors.length > 0) {
      this.facultyDetails.bachelors.forEach(bachelorId => {
        this.firebaseService.getBacheloryById(bachelorId).then(bachelor => {
          this.bachelorsData.push(new BachelorData(bachelor));
          if (bachelor.courses && bachelor.courses.length > 0) {
            this.getCourses(bachelor.courses);
          }
        });
      });
    }
  }

  getMasters() {
    if (this.facultyDetails.masters.length > 0) {
      this.facultyDetails.masters.forEach(masterId => {
        this.firebaseService.getMasterById(masterId).then(master => {
          this.mastersData.push(new MasterData(master));
          if (master.courses && master.courses.length > 0) {
            this.getCourses(master.courses);
          }
        });
      });
    }
  }

  getDoctorals() {
    if (this.facultyDetails.doctorals.length > 0) {
      this.facultyDetails.doctorals.forEach(doctoralId => {
        this.firebaseService.getDoctoralById(doctoralId).then(doctoral => {
          this.doctoralsData.push(new DoctoralData(doctoral));
          if (doctoral.courses && doctoral.courses.length > 0) {
            this.getCourses(doctoral.courses);
          }
        });
      });
    }
  }

  getCourses(coursesIds: string[]) {
    coursesIds.forEach(courseId => {
      this.firebaseService.getCourseById(courseId).then(result => {
        this.courses.push(new CourseData(result));
      });
    });
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

  onNavigate(id: string) {
    this.router.navigateByUrl(`/university/${id}`);
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

}
