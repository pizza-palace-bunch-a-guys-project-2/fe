export class Order {

    constructor(public items:String[], public paymentDetails:String[], 
        public address:String, public total:number, public userId:number) {}

}