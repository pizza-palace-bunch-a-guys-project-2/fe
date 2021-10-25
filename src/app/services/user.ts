export interface IUser {
    'userName': string;
    'userPassword': string;
}

export class User {
    constructor(public userName:string, public userPassword:string) {}
}