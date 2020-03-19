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
import { ReviewData } from 'src/app/models/ReviewData';
import { UserData } from 'src/app/models/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddProgramDialogComponent } from 'src/app/components/add-program-dialog/add-program-dialog.component';

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
  reviewsData: ReviewData[];
  facultyId: string;
  user: UserData;
  userCanEdit: boolean;
  editEnabled: boolean;
  isUserSubscription: Subscription;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      this.facultyId = params.get('id');
      if (this.facultyId) {
        this.firebaseService.getFacultyById(this.facultyId).subscribe(data => {
          this.facultyDetails = new FacultyData(data);
          this.buildForm();
          if (this.facultyDetails.universityId) {
            this.firebaseService.getUniversityById(this.facultyDetails.universityId).subscribe(university => {
              this.universityDetails = new UniversityData(university);
              if (university) {
                this.userEditable();
              }
            });
          }
          this.getReviews();
          this.getBachelors();
          this.getMasters();
          this.getDoctorals();
        });
      }
    });
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = new UserData(result);
      if (result) {
        this.userEditable();
        this.showAddNewComment(this.reviewsData);
      }
    });
  }

  private buildForm() {
    this.form = new FormGroup({
      nameFaculty: new FormControl(this.facultyDetails.nameFaculty, [Validators.required]),
      studyGuide: new FormControl(this.facultyDetails.studyGuide, [Validators.required]),
      facultyId: new FormControl(this.facultyDetails.facultyId, [Validators.required]),
      descriptionFaculty: new FormControl(this.facultyDetails.descriptionFaculty, [Validators.required]),
    });
  }

  saveDetails() {
    this.editEnabled = !this.editEnabled;
    this.firebaseService.saveFacultyDetails(this.form.value);
  }

  editDetails() {
    this.editEnabled = !this.editEnabled;
    this.userEditable();
  }

  userEditable() {
    this.userCanEdit = this.user && this.universityDetails ? this.user.universityId === this.universityDetails.universityId : false;
  }

  getBachelors() {
    this.bachelorsData = [];
    if (this.facultyDetails.bachelors.length > 0) {
      this.facultyDetails.bachelors.forEach(bachelorId => {
        this.firebaseService.getBacheloryById(bachelorId).subscribe(bachelor => {
          const data = new BachelorData(bachelor);
          this.bachelorsData.push(new BachelorData(bachelor));
          if (data.courses && data.courses.length > 0) {
            this.getCourses(data.courses);
          }
        });
      });
    }
  }

  getReviews() {
    this.firebaseService.getReviewsData().subscribe(data => {
      this.reviewsData = [];
      data.forEach(review => {
        const reviewDetails = new ReviewData(review);
        if (reviewDetails.facultyId === this.facultyId && reviewDetails.status !== 'declined') {
          this.reviewsData.push(reviewDetails);
        }
      });
      this.showAddNewComment(this.reviewsData);
    });
  }

  addProgramDialog(type: string) {
    const dialogRef = this.dialog.open(AddProgramDialogComponent, {
      width: '50vw',
      disableClose: true,
      data: type
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firebaseService.setNewProgramForUniversity(this.facultyDetails,
        result.name, type);
    });
  }

  getMasters() {
    this.mastersData = [];
    if (this.facultyDetails.masters.length > 0) {
      this.facultyDetails.masters.forEach(masterId => {
        this.firebaseService.getMasterById(masterId).subscribe(master => {
          const data = new MasterData(master);
          this.mastersData.push(new MasterData(master));
          if (data.courses && data.courses.length > 0) {
            this.getCourses(data.courses);
          }
        });
      });
    }
  }

  getDoctorals() {
    this.doctoralsData = [];
    if (this.facultyDetails.doctorals.length > 0) {
      this.facultyDetails.doctorals.forEach(doctoralId => {
        this.firebaseService.getDoctoralById(doctoralId).subscribe(doctoral => {
          const data = new MasterData(doctoral);
          this.doctoralsData.push(new DoctoralData(doctoral));
          if (data.courses && data.courses.length > 0) {
            this.getCourses(data.courses);
          }
        });
      });
    }
  }

  showAddNewComment(data: any) {
    if (data && data.filter((item: ReviewData) => item.userId === this.user.id).length === 0) {
      const newCommentForPresentLoggedInUser = {
        facultyId: this.facultyId,
        userId: this.user.id,
        date: new Date(),
        status: 'approved',
        stars: 5
      }
      this.reviewsData.push(new ReviewData(newCommentForPresentLoggedInUser));
      console.log(this.reviewsData)
    }
  }

  getCourses(coursesIds: string[]) {
    coursesIds.forEach(courseId => {
      this.firebaseService.getCourseById(courseId).subscribe(result => {
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
