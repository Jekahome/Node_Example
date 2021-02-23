import {Post} from "~domain/entities/post"
import {IUser,Point} from "~domain/interfaces/user";

export class User implements IUser{
    private id: number = 0;
    private authId: string|null;
    private email: string;
    private name: string;
    private password: string;
    private points: Point = 0;
    private posts: Array<Post>;
    private created: string;
    private role: string;

    constructor(id: number,email:string,name:string,password:string,created: string,role: string, authId: string|null){
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.posts = Array<Post>();
        this.authId = authId;
        this.created = created;
        this.role = role;
    }

    public getId():number{
        return this.id;
    }
    public getAuthId():string|null{
        return this.authId;
    }
    public getEmail():string{
        return this.email;
    }
    public setEmail(email:string):void{
        this.email=email;
    }
    public getName():string{
        return this.name;
    }
    public setName(name:string):void{
        this.name=name;
    }
    public getPassword():string{
        return this.password;
    }
    public setPassword(passord:string){
        this.password=passord;
    }
    public getPosts():Array<Post>{
        return this.posts;
    }
    public setPosts(posts:Array<Post>):void{
        this.posts=posts;
    }

    addPoint(point:Point):boolean{
        this.points+=point;
        return true;
    }

    removePoint(point:Point):boolean{
        this.points-=point;
        return true;
    }
}

