
export interface Generator {
    x500Name: string;
    server: string;
    issuer: Issuer;
    destination: string;
    type: string;
}

export interface Issuer {
    serialNumber: string;
    x500Name: string;
}