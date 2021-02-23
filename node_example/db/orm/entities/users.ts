import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name:"users"})
export class Users {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: "varchar", length: 100, unique: true, nullable: true})
    authId: string;

    @Column({ type: "varchar", length: 150, unique: true })
    email: string;

    @Column({length: 100})
    name: string;

    @Column()
    password: string;

    @Column({ type: "varchar", width: 100 })
    created: string;

    @Column({type: "varchar", default:""})
    role: string;

    constructor(email:string,name:string,password:string,role:string){
        this.email = email;
        this.name = name;
        this.password = password;
        this.authId = "";
        this.created =  Date.now()+"";
        this.role = role;
    }
    public static constructorSocial(email:string,name:string,role:string,authId:string|null):Users{
         let user = new Users(email,name,"",role);
         user.setAuthId(authId?authId:"");
         return user;
    }
    public getId():number{
        return this.id;
    }
    public getAuthId():string|null{
        return this.authId;
    }
    private setAuthId(authId:string){
         this.authId = authId;
    }
    public getRole():string{
        return this.role;
    }
    public getCreated():string{
        return this.created;
    }
    public getEmail():string{
        return this.email;
    }
    public setEmail(email:string){
        this.email=email;
    }
    public getName():string{
        return this.name;
    }
    public setName(name:string){
        this.name=name;
    }
    public getPassword():string{
        return this.password;
    }
    public setPassword(password:string){
        this.password=password;
    }

}

