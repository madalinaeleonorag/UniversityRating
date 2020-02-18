import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  user: any;
  isUserSubscription: Subscription;

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {
  }

  @Input() firstPage: boolean;

  ngOnInit() {
    this.isUserSubscription = this.authService.isUserAuthenticatedObservable.subscribe(result => {
      this.user = result;
    });
  }

  goToHomepage() {
    this.router.navigateByUrl('/');
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  goToUserDetails() {
    this.router.navigateByUrl('/userdetails');
  }

  goToRequests() {
    this.router.navigateByUrl('/universityRequests');
  }
  logOutUser() {
    this.authService.logOut();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '50vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.setUser(result.user.uid);
      }
    });
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: '80vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.setUser(result.user.uid);
      }
    });
  }
}
