
export class User {
    constructor(private userName:string,
        private userPassword:string,
        private userEmail?:string,
        private userFirstName?:string,
        private userLastName?:string,
        private userRoleId?:number,
        private userId?:number
        ) {}
}