import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseService } from 'src/app/firebase/firebase-service.service';
import { BachelorData } from 'src/app/models/BachelorData';

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
  keywordsSearch = new FormControl();
  descriptionSearch = new FormControl();
  locations = new FormControl();
  facilities = new FormControl();
  locationsListList: string[] = [];
  facilitiesList: string[] = [];
  studyLevel: string;
  ratingType: string;
  institutionState: boolean;
  institutionPrivate: boolean;


  constructor(private firebaseService: FirebaseService) {
    this.categories = Object.keys(Categories);
    this.sortTypes = Object.keys(Sorting);
    this.typeOfInstitution = Object.keys(InstitutionType);

    this.universityName();
  }

  ngOnInit() {
  }

  getData() {
    // this.firebaseService.getBachelorsData().subscribe(result => console.log('getBachelorsData: ', result));
    // this.firebaseService.getDoctoralsData().subscribe(result => console.log('getDoctoralsData: ', result));
    // this.firebaseService.getFacultiesData().subscribe(result => console.log('getFacultiesData: ', result));
    // this.firebaseService.getMastersData().subscribe(result => console.log('getMastersData: ', result));
    // this.firebaseService.getUniversitiesData().subscribe(result => console.log('getUniversitiesData: ', result));
  }

  universityName() {
    const universityName = [];
    this.firebaseService.getUniversitiesData().subscribe(result => {
      // todo map to the model class
      // result.forEach(university: BachelorData => {
      //   console.log(university.nameUniversity)
      // });
    });
    return universityName;
  }

//    // return facilities
//    facilities() {
//     return this.$store.getters.facilities;
//   },
  // return universities names

//   // return universities locations
//   universityLocation() {
//     var universityLocation = ["Toate locatiile"];
//     this.$store.getters.universityData.forEach(university => {
//       universityLocation.push(university.locationUniversity[0]);
//     });
//     return universityLocation;
//   },
//   // return faculties names
//   facultyName() {
//     var facultyName = [];
//     this.$store.getters.facultyData.forEach(faculty => {
//       facultyName.push(faculty.nameFaculty);
//     });
//     return facultyName;
//   },
//   // FILTERS
//   dataFilter() {
//     var filteredData;
//     if (this.selectSearch === "university") {
//       // FILTER UNIVERSITY
//       filteredData = this.$store.getters.universityData.filter(university => {
//         return (
//           this.matchingLocations(
//             university.locationUniversity[0],
//             this.selectedLocation
//           ) &
//           this.matchingType(
//             university.typeUniversity,
//             this.typeStat,
//             this.typePrivat
//           ) &
//           this.matchingNames(university.nameUniversity, this.selectedName) &
//           this.matchingRatings(university.rating, this.selectedRatings) &
//           this.matchingFacilities(
//             university.facilitiesUniversity,
//             this.selectedFacilities
//           ) &
//           this.matchingDescription(
//             university.descriptionUniversity,
//             this.selectedDescription
//           )
//         );
//       });
//     } else if (this.selectSearch === "faculty") {
//       // FILTER FACULTY
//       filteredData = this.$store.getters.facultyData.filter(faculty => {
//         var universityIDs = [];
//         this.$store.getters.universityData.forEach(university => {
//           universityIDs.push(university.id);
//         });
//         var universityDetails = this.$store.getters.universityData[
//           universityIDs.indexOf(faculty.universityId)
//         ];
//         return (
//           this.matchingLocations(
//             faculty.locationFaculty,
//             this.selectedLocation
//           ) &
//           this.matchingType(
//             universityDetails.typeUniversity,
//             this.typeStat,
//             this.typePrivat
//           ) &
//           this.matchingNames(faculty.nameFaculty, this.selectedName) &
//           this.matchingRatings(faculty.rating, this.selectedRatings) &
//           this.matchingFacilities(
//             universityDetails.Facilities,
//             this.selectedFacilities
//           ) &
//           this.matchingDescription(
//             faculty.descriptionFaculty,
//             this.selectedDescription
//           )
//         );
//       });
//       // FILTER BACHELOR
//     } else if (this.selectSearch === "bachelor") {
//       return this.$store.getters.bachelorsData;
//       // FILTER MASTER
//     } else if (this.selectSearch === "master") {
//       return this.$store.getters.mastersData;
//     }
//     console.log(filteredData);
//     return this.sortByRatings(filteredData, this.selectedSort);
//   }
// },
// methods: {
//   roundgreen(value) {
//     return Math.round(value);
//   },
//   roundred(value) {
//     return 5 - Math.round(value);
//   },
//   matchingNames(name, selectedName) {
//     return selectedName
//       ? name.toLowerCase().includes(selectedName.toLowerCase())
//       : true;
//   },
//   matchingLocations(location, selectedLocation) {
//     return selectedLocation
//       ? selectedLocation === location ||
//           selectedLocation === "Toate locatiile"
//       : true;
//   },
//   matchingRatings(rating, selectedRatings) {
//     if (selectedRatings) {
//       if (selectedRatings === "6") {
//         return true;
//       } else {
//         return selectedRatings
//           ? selectedRatings <= Math.round(rating).toString()
//           : true;
//       }
//     } else {
//       return true;
//     }
//   },
//   matchingType(type, selectedStat, selectedPrivat) {
//     if (selectedStat === true && selectedPrivat === true) {
//       return true;
//     } else if (selectedStat === true) {
//       return selectedStat ? selectedStat === true && type === "Stat" : true;
//     } else if (selectedPrivat === true) {
//       return selectedPrivat
//         ? selectedPrivat === true && type === "Privat"
//         : true;
//     } else {
//       return false;
//     }
//   },
//   matchingFacilities(facilities, selectedFacilities) {
//     if (selectedFacilities) {
//       if (facilities) {
//         return selectedFacilities
//           ? facilities.filter(elem => {
//               return selectedFacilities.indexOf(elem) > -1;
//             }).length === selectedFacilities.length
//           : true;
//       } else {
//         return false;
//       }
//     } else {
//       return true;
//     }
//   },
//   matchingDescription(description, selectedDescription) {
//     let splittedDescription = selectedDescription.split(" ");
//     let splittedDescriptionLength = splittedDescription.length;
//     let results = [];
//     let counter = 0;
//     if (selectedDescription && selectedDescription !== "") {
//       splittedDescription.forEach(item => {
//         results.push(
//           item ? description.toLowerCase().includes(item.toLowerCase()) : true
//         );
//       });
//       results.forEach(result => {
//         if (result === true) {
//           counter = counter + 1;
//         }
//       });
//       if (counter === splittedDescriptionLength) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return true;
//     }
//   },
//   sortByRatings(data, sortType) {
//     let sortedData = data;
//     switch (sortType) {
//       case "Crescator":
//         sortedData.sort((a, b) => {
//           return a.rating - b.rating;
//         });
//         break;
//       case "Descrescator":
//         sortedData.sort((a, b) => {
//           return b.rating - a.rating;
//         });
//         break;
//     }
//     return sortedData;
//   }

}
