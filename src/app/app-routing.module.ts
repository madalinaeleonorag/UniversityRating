import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './pages/search/search.component';
import { UniversityComponent } from './pages/detailsPages/university/university.component';
import { FacultyComponent } from './pages/detailsPages/faculty/faculty.component';
import { AuthorRightsComponent } from './pages/author-rights/author-rights.component';
import { TermsandconditionsComponent } from './pages/termsandconditions/termsandconditions.component';
import { ConfidentialityComponent } from './pages/confidentiality/confidentiality.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'university/:id', component: UniversityComponent },
  { path: 'faculty/:id', component: FacultyComponent },
  { path: 'authorrights', component: AuthorRightsComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: 'confidentiality', component: ConfidentialityComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'userdetails', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
