import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('UniversityData')
export class UniversityData {
    @JsonProperty('descriptionUniversity')
    descriptionUniversity: string = undefined;
    @JsonProperty('facilitiesUniversity')
    facilitiesUniversity: string[] = [];
    @JsonProperty('facultiesUniversity')
    facultiesUniversity: string[] = [];
    @JsonProperty('locationUniversity')
    locationUniversity: any = undefined;
    @JsonProperty('logoUniversity')
    logoUniversity: string = undefined;
    @JsonProperty('mission')
    mission: string = undefined;
    @JsonProperty('nameUniversity')
    nameUniversity: string = undefined;
    @JsonProperty('photosUniversity')
    photosUniversity: string = undefined;
    @JsonProperty('rating')
    rating: number = undefined;
    @JsonProperty('strategicProgram')
    strategicProgram: string[] = [];
    @JsonProperty('typeUniversity')
    typeUniversity: string = undefined;
    @JsonProperty('universityId')
    universityId: string = undefined;
    @JsonProperty('values')
    values: string[] = [];
    @JsonProperty('vision')
    vision: string = undefined;
    @JsonProperty('websiteUniversity')
    websiteUniversity: string = undefined;
    @JsonProperty('address')
    address: string = undefined;
    @JsonProperty('fax')
    fax: string = undefined;
    @JsonProperty('phone')
    phone: string = undefined;

    constructor(obj: any) {
        this.descriptionUniversity = obj ? (obj.descriptionUniversity ? obj.descriptionUniversity : undefined) : undefined;
        this.facilitiesUniversity = obj ? (obj.facilitiesUniversity ? obj.facilitiesUniversity : []) : [];
        this.facultiesUniversity = obj ? (obj.facultiesUniversity ? obj.facultiesUniversity : []) : [];
        this.locationUniversity = obj ? (obj.locationUniversity ? obj.locationUniversity : []) : [];
        this.logoUniversity = obj ? (obj.logoUniversity ? obj.logoUniversity : undefined) : undefined;
        this.mission = obj ? (obj.mission ? obj.mission : undefined) : undefined;
        this.nameUniversity = obj ? (obj.nameUniversity ? obj.nameUniversity : undefined) : undefined;
        this.photosUniversity = obj ? (obj.photosUniversity ? obj.photosUniversity : undefined) : undefined;
        this.rating = obj ? (obj.rating ? obj.rating : undefined) : undefined;
        this.strategicProgram = obj ? (obj.strategicProgram ? obj.strategicProgram : []) : [];
        this.typeUniversity = obj ? (obj.typeUniversity ? obj.typeUniversity : undefined) : undefined;
        this.universityId = obj ? (obj.universityId ? obj.universityId : undefined) : undefined;
        this.values = obj ? (obj.values ? obj.values : []) : [];
        this.vision = obj ? (obj.vision ? obj.vision : undefined) : undefined;
        this.websiteUniversity = obj ? (obj.websiteUniversity ? obj.websiteUniversity : undefined) : undefined;
        this.address = obj ? (obj.address ? obj.address : undefined) : undefined;
        this.fax = obj ? (obj.fax ? obj.fax : undefined) : undefined;
        this.phone = obj ? (obj.phone ? obj.phone : undefined) : undefined;
    }
}
