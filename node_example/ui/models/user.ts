import {IUser} from "~use_cases/mod-export";

export class User{
    public name:string;
    public email:string;
    public password:string;
    public id:number;
    constructor(user:IUser){
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
        this.id = user.getId();
    }
};