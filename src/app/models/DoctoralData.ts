import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('DoctoralData')
export class DoctoralData {
    @JsonProperty('id')
    id: string = undefined;
    @JsonProperty('name')
    name: string = undefined;
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('courses')
    courses: string[] = [];

    constructor(obj: any) {
        this.id = obj ? (obj.id ? obj.id : undefined) : undefined;
        this.name = obj ? (obj.name ? obj.name : undefined) : undefined;
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.courses = obj ? (obj.courses ? obj.courses : []) : [];
    }
}
