export interface Distribution {
    serialNumber: string;
    privateKey: boolean;
    keystore: boolean;
    truststore: boolean;
    hostname: string;
    destination: string;
}
