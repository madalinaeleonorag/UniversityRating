import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('MasterData')
export class MasterData {
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('id')
    id: string = undefined;
    @JsonProperty('name')
    name: string = undefined;
    @JsonProperty('courses')
    courses: string[] = [];

    constructor(obj: any) {
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.id = obj ? (obj.id ? obj.id : undefined) : undefined;
        this.name = obj ? (obj.name ? obj.name : undefined) : undefined;
        this.courses = obj ? (obj.courses ? obj.courses : []) : [];
    }
}
