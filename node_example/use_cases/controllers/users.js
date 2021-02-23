import { users } from "~db/mod-export";
import { User as UserDomain } from "~domain/entities/user";
import { EmailExists } from "~use_cases/errors/index";
// Если вам нужны пользователи то возьмите вот этот интерфейс IUsers и реализуйте его !
class UserHundler {
    getUsers() {
        return users.getUsers().then(list => {
            return list.map(user_dto => {
                return this.userDTOToUser(user_dto);
            });
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    createUser(email, name, password, role) {
        return users.isUniqueEmail(email).then(res => {
            if (res === true) {
                console.log("4545444545");
                return users.createUser(email, name, password, role).then(user_dto => {
                    return this.userDTOToUser(user_dto);
                }).catch(err => {
                    console.log("232323232323");
                    console.error(err);
                    throw new Error("Bad request");
                });
            }
            else {
                throw new EmailExists("This email already exists.");
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
    }
    createUserSocial(authId, email, name, role) {
        return users.isUniqueEmail(email).then(res => {
            if (res === true) {
                return users.createUserSocial(authId, email, name, role).then(user_dto => {
                    return this.userDTOToUser(user_dto);
                }).catch(err => {
                    console.error(err);
                    throw new Error("Bad request");
                });
            }
            else {
                throw new EmailExists("This email already exists.");
            }
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    getUserSocial(authId) {
        return users.getUserSocialId(authId).then(user_dto => {
            //console.log("2) user_dto:",user_dto);
            if (user_dto) {
                return this.userDTOToUser(user_dto);
            }
            return null;
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    getUserID(email, password) {
        return users.getUserID(email, password).then((id) => {
            if (id !== null) {
                return this.UserIdToNumber(id);
            }
            else {
                return null;
            }
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    getUser(id) {
        return users.getUser(this.UserIdToNumber(id)).then(user_dto => {
            if (user_dto)
                return this.userDTOToUser(user_dto);
            else
                return null;
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    getUserCookieUser(id) {
        return this.getUser(this.NumberToUserId(id)).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    isUniqueEmail(email) {
        return users.isUniqueEmail(email).then(res => {
            return res;
        }).catch(err => {
            console.error(err);
            throw new Error("Bad request");
        });
    }
    userDTOToUser(user_dto) {
        return new UserDomain(user_dto.id, user_dto.email, user_dto.name, user_dto.password, user_dto.created, user_dto.role, user_dto.authId);
    }
    UserIdToNumber(id) {
        return id;
    }
    NumberToUserId(id) {
        return id;
    }
}
const userHundler = new UserHundler();
export { userHundler };
/*
 Логика слоя должна заключаться в том как пользоваться моделями базнеса по его сценариям !
 */
