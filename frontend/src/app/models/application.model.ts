import { Role } from './role.model';

export interface Application{
    applicationCode: string;
    applicationDesc: string;
    applicationId: number;
    applicationName: string;
    isVisible: boolean;
    roles: Role[];
}