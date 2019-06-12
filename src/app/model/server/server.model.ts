import { ServerType } from '../enums/server-type.model';

export interface Server {
    id: number;
    name: string;
    address: string;
    type: ServerType;
}
