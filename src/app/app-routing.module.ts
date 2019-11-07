import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SearchComponent } from './pages/search/search.component';
import { UniversityComponent } from './pages/detailsPages/university/university.component';
import { FacultyComponent } from './pages/detailsPages/faculty/faculty.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'university/:id', component: UniversityComponent },
  { path: 'faculty/:id', component: FacultyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
