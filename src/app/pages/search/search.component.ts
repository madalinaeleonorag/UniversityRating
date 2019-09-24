import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export enum Categories {
  University = 'UNIVERSITY',
  Faculty = 'FACULTY',
  Bachelor = 'BACHELOR',
  Master = 'MASTER',
  Doctoral = 'DOCTORAL'
}

export enum Sorting {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING',
  Initial = 'NOSORT'
}

export enum InstitutionType {
  Private = 'PRIVATE',
  State = 'STATE'
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  categories: string[] = [];
  sortTypes: string[] = [];
  typeOfInstitution: string[] = [];

  constructor() {
    this.categories = Object.keys(Categories);
    this.sortTypes = Object.keys(Sorting);
    this.typeOfInstitution = Object.keys(InstitutionType);
  }

  ngOnInit() {
  }

}
