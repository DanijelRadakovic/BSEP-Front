import { CerType } from './enums/cer-type.model';

export interface CertificateRequest {
    subjectDN: SubjectDN;
    issuerSN: String;
    type: CerType;
}

export interface SubjectDN {
    commonName: String;
    organization: String;
    country: String;
    organizationUnit: String;
    surname: String;
    givenName: String;
    gender: String;
    email: String;
    placeOfBirth: String;
    street: String;
    localityName: String;
    postalCode: String;
    countryOfCitizenship: String;
    countryOfResidence: String;
}
