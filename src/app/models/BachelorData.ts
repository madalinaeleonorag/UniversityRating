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
    @JsonProperty('semesters')
    semesters: number = undefined;
    @JsonProperty('years')
    years: number = undefined;

    constructor(obj) {
        this.facultyId = obj.facultyId;
        this.generalSkills = obj.generalSkills;
        this.name = obj.name;
        this.professionalPerspectives = obj.professionalPerspectives;
        this.semesters = obj.semesters;
        this.years = obj.years;
    }
}
