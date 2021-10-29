
export class User {
    constructor(private userName:string,
        private userPassword:string,
        private userEmail?:string,
        private userFirstName?:string,
        private userLastName?:string,
        private userAddress?:string,
        private userCity?:string,
        private userState?:string,
        private userZip?:string,
        private userId?:number,
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