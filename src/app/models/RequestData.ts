import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('RequestData')
export class RequestData {
    @JsonProperty('address')
    address: string = undefined;
    @JsonProperty('contact')
    contact: string = undefined;
    @JsonProperty('descriptionFaculty')
    descriptionFaculty: string = undefined;
    @JsonProperty('descriptionUniversity')
    descriptionUniversity: string = undefined;
    @JsonProperty('email')
    email: string = undefined;
    @JsonProperty('facilities')
    facilities: string[] = [];
    @JsonProperty('locationUniversity')
    locationUniversity: string[] = [];
    @JsonProperty('logoFaculty')
    logoFaculty: string = undefined;
    @JsonProperty('logoUniversity')
    logoUniversity: string = undefined;
    @JsonProperty('nameFaculty')
    nameFaculty: string = undefined;
    @JsonProperty('nameUniversity')
    nameUniversity: string = undefined;
    @JsonProperty('phone')
    phone: string = undefined;
    @JsonProperty('photosUniversity')
    photosUniversity: string[] = [];
    @JsonProperty('status')
    status: string = undefined;
    @JsonProperty('typeUniversity')
    typeUniversity: string = undefined;
    @JsonProperty('userId')
    userId: string = undefined;
    @JsonProperty('websiteUniversity')
    websiteUniversity: string = undefined;

    constructor(obj: any) {
        this.address = obj ? (obj.address ? obj.address : undefined) : undefined;
        this.contact = obj ? (obj.contact ? obj.contact : undefined) : undefined;
        this.descriptionFaculty = obj ? (obj.descriptionFaculty ? obj.descriptionFaculty : undefined) : undefined;
        this.descriptionUniversity = obj ? (obj.descriptionUniversity ? obj.descriptionUniversity : undefined) : undefined;
        this.email = obj ? (obj.email ? obj.email : undefined) : undefined;
        this.logoFaculty = obj ? (obj.logoFaculty ? obj.logoFaculty : undefined) : undefined;
        this.logoUniversity = obj ? (obj.logoUniversity ? obj.logoUniversity : undefined) : undefined;
        this.nameFaculty = obj ? (obj.nameFaculty ? obj.nameFaculty : undefined) : undefined;
        this.nameUniversity = obj ? (obj.nameUniversity ? obj.nameUniversity : undefined) : undefined;
        this.phone = obj ? (obj.phone ? obj.phone : undefined) : undefined;
        this.status = obj ? (obj.status ? obj.status : undefined) : undefined;
        this.typeUniversity = obj ? (obj.typeUniversity ? obj.typeUniversity : undefined) : undefined;
        this.userId = obj ? (obj.userId ? obj.userId : undefined) : undefined;
        this.websiteUniversity = obj ? (obj.websiteUniversity ? obj.websiteUniversity : undefined) : undefined;
        this.facilities = obj ? (obj.facilities ? obj.facilities : []) : [];
        this.locationUniversity = obj ? (obj.locationUniversity ? obj.locationUniversity : []) : [];
        this.photosUniversity = obj ? (obj.photosUniversity ? obj.photosUniversity : []) : [];
    }
}
