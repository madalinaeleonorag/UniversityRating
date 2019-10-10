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
    @JsonProperty('bachelorId')
    bachelorId: number = undefined;

    constructor(obj, key) {
        this.facultyId = obj.facultyId;
        this.generalSkills = obj.generalSkills;
        this.name = obj.name;
        this.professionalPerspectives = obj.professionalPerspectives;
        this.semesters = obj.semesters;
        this.years = obj.years;
        this.bachelorId = key;
    }
}
