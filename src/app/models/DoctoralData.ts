import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('DoctoralData')
export class DoctoralData {
    @JsonProperty('doctoralId')
    doctoralId: string = undefined;
    @JsonProperty('doctoralName')
    doctoralName: string = undefined;
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('courses')
    courses: string[] = [];

    constructor(obj: any) {
        this.doctoralId = obj ? (obj.doctoralId ? obj.doctoralId : undefined) : undefined;
        this.doctoralName = obj ? (obj.doctoralName ? obj.doctoralName : undefined) : undefined;
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.courses = obj ? (obj.courses ? obj.courses : []) : [];
    }
}
