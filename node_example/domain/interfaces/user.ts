import {Post} from "~domain/entities/post"

export type Point = number;
export type UserId = number;

export interface IUser {

    getId():number;
    getEmail():string;
    setEmail(email:string):void;
    getName():string;
    setName(name:string):void;
    getPassword():string;
    getPosts():Array<Post>;

    addPoint(point:Point):boolean;
    removePoint(point:Point):boolean;

}

export interface IUsers<IUser> {
    getUsers(): Promise<Array<IUser>>;
    getUserSocial(authId: string):Promise<IUser|null>;
    createUser(email:string,name:string,password:string,role:string): Promise<IUser>;
    createUserSocial(authId:string,email:string,name:string,role:string): Promise<IUser>;
    getUserID(email:string,password:string):Promise<UserId|null>;
    getUser(id:UserId):Promise<IUser|null>;
    isUniqueEmail(email:string):Promise<boolean>;

}

