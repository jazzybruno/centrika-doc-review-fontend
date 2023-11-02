import { IModel } from "./base.type";

export interface IUser extends IModel {
    username:       string;
    phoneNumber:    string;
    email:          string;
    gender:         string;
    status:         string;
    verified:       boolean;
    activationCode: string;
    token:          null;
    department:     null;
    roles:          IRole[];
}

export interface IRole {
    id:       string;
    roleName: string;
}
