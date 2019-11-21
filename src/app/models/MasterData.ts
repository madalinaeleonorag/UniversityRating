import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('MasterData')
export class MasterData {
    @JsonProperty('facultyId')
    facultyId: string = undefined;
    @JsonProperty('masterId')
    masterId: string = undefined;
    @JsonProperty('masterName')
    masterName: string = undefined;
    @JsonProperty('courses')
    courses: string[] = [];

    constructor(obj: any) {
        this.facultyId = obj ? (obj.facultyId ? obj.facultyId : undefined) : undefined;
        this.masterId = obj ? (obj.masterId ? obj.masterId : undefined) : undefined;
        this.masterName = obj ? (obj.masterName ? obj.masterName : undefined) : undefined;
        this.courses = obj ? (obj.courses ? obj.courses : []) : [];
    }
}
