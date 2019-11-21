import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('BachelorData')
export class BachelorData {
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('generalSkills')
    generalSkills: string[] = [];
    @JsonProperty('name')
    name: string = undefined;
    @JsonProperty('professionalPerspectives')
    professionalPerspectives: string[] = [];
    @JsonProperty('courses')
    courses: string[] = [];
    @JsonProperty('semesters')
    semesters: number = undefined;
    @JsonProperty('years')
    years: number = undefined;
    @JsonProperty('bachelorId')
    bachelorId: number = undefined;

    constructor(obj: any) {
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.generalSkills = obj ? (obj.generalSkills ? obj.generalSkills : []) : [];
        this.name = obj ? (obj.name ? obj.name : undefined) : undefined;
        this.professionalPerspectives = obj ? (obj.professionalPerspectives ? obj.professionalPerspectives : []) : [];
        this.courses = obj ? (obj.courses ? obj.courses : []) : [];
        this.semesters = obj ? (obj.semesters ? obj.semesters : undefined) : undefined;
        this.years = obj ? (obj.years ? obj.years : undefined) : undefined;
        this.bachelorId = obj ? (obj.bachelorId ? obj.bachelorId : undefined) : undefined;
    }
}
