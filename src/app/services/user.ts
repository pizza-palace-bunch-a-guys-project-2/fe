
export class User {
    constructor(public userName:string,
        public userPassword:string,
        public userEmail?:string,
        public userFirstName?:string,
        public userLastName?:string,
        public userAddress?:string,
        public userCity?:string,
        public userState?:string,
        public userZip?:string,
        public userId?:number,
        ) {};

    haveEmptyStrings():boolean {
        return (this.userName === '')||
                (this.userPassword === '')||
                (this.userEmail === '')||
                (this.userFirstName === '')||
                (this.userLastName === '')||
                (this.userAddress === '')||
                (this.userCity === '')||
                (this.userState === '')||
                (this.userZip === '');
    }
}