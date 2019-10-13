import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './pages/search/search.component';
import { UniversityComponent } from './pages/detailsPages/university/university.component';
import { BachelorComponent } from './pages/detailsPages/bachelor/bachelor.component';
import { DoctoralComponent } from './pages/detailsPages/doctoral/doctoral.component';
import { FacultyComponent } from './pages/detailsPages/faculty/faculty.component';
import { MasterComponent } from './pages/detailsPages/master/master.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'university/:id', component: UniversityComponent },
  { path: 'bachelor/:id', component: BachelorComponent },
  { path: 'doctoral/:id', component: DoctoralComponent },
  { path: 'faculty/:id', component: FacultyComponent },
  { path: 'master/:id', component: MasterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
