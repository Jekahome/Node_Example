var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Users_1;
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let Users = Users_1 = class Users {
    constructor(email, name, password, role) {
        this.id = 0;
        this.email = email;
        this.name = name;
        this.password = password;
        this.authId = "";
        this.created = Date.now() + "";
        this.role = role;
    }
    static constructorSocial(email, name, role, authId) {
        let user = new Users_1(email, name, "", role);
        user.setAuthId(authId ? authId : "");
        return user;
    }
    getId() {
        return this.id;
    }
    getAuthId() {
        return this.authId;
    }
    setAuthId(authId) {
        this.authId = authId;
    }
    getRole() {
        return this.role;
    }
    getCreated() {
        return this.created;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "authId", void 0);
__decorate([
    Column({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    Column({ type: "varchar", width: 100 }),
    __metadata("design:type", String)
], Users.prototype, "created", void 0);
__decorate([
    Column({ type: "varchar", default: "" }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
Users = Users_1 = __decorate([
    Entity({ name: "users" }),
    __metadata("design:paramtypes", [String, String, String, String])
], Users);
export { Users };
