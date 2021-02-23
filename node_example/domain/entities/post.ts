import {User} from "./user.js"

export class Post {
    private id: number = 0;
    private content: string;
    private user: User;

    constructor(content:string,user: User){

        this.content = content;
        this.user = user;
    }

    public getId():number{
        return this.id;
    }

    public getContent():string{
        return this.content;
    }
    public setContent(content:string){
        this.content=content;
    }
    public getUser():User{
        return this.user;
    }
    public setUser(user:User){
        this.user=user;
    }

}