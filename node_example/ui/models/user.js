export class User {
    constructor(user) {
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
        this.id = user.getId();
    }
}
;
