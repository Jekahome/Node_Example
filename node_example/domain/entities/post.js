export class Post {
    constructor(content, user) {
        this.id = 0;
        this.content = content;
        this.user = user;
    }
    getId() {
        return this.id;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
}
