import {IUser, UserId} from "../domain/interfaces/user";
export {EmailExists} from "~use_cases/errors/index";
export {IUser,IUsers} from "~domain/interfaces/user";
export {userHundler} from "~use_cases/controllers/users";


export interface IUsersDTO<T> {
    getUsers(): Promise<Array<T>>;
    createUser(email:string,name:string,password:string,role:string): Promise<T>;
    createUserSocial(authId:string,email:string,name:string,role:string):Promise<T>;
    getUserID(email:string,password:string):Promise<number|null>;
    getUser(id:number):Promise<T|null>;
    isUniqueEmail(email:string):Promise<boolean>;
}