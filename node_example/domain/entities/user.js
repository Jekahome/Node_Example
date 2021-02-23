export class User {
    constructor(id, email, name, password, created, role, authId) {
        this.id = 0;
        this.points = 0;
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.posts = Array();
        this.authId = authId;
        this.created = created;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getAuthId() {
        return this.authId;
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
    setPassword(passord) {
        this.password = passord;
    }
    getPosts() {
        return this.posts;
    }
    setPosts(posts) {
        this.posts = posts;
    }
    addPoint(point) {
        this.points += point;
        return true;
    }
    removePoint(point) {
        this.points -= point;
        return true;
    }
}
