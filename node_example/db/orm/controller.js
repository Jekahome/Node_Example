import { getConnectionManager } from "typeorm";
import { Users as UsersDB } from "~db/orm/entities/users";
import createConnections from "~db/orm/connection";
import { BadRequest } from "~db/orm/errors/index";
// С помощью EntityManager вы можете управлять (вставлять, обновлять, удалять, загружать и т. Д.) Любой сущностью.
// Repository - Обычное хранилище для любой сущности.
// TreeRepository- Репозиторий, расширения Repository используемых для древовидных объектов (например, объектов, отмеченных @Tree декоратором)
export class UserDTO {
    constructor(id, name, email, password, role, created, authId) {
        this.id = id;
        this.authId = authId;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
        this.created = created;
    }
}
class UsersAggregate {
    //userRepository: Repository<User>;
    constructor() {
        //this.users = Array();
        // https://typeorm.io/#/connection-api
        this.connection = createConnections.then(() => {
            return getConnectionManager().get(process.env.DB_CONNECTION_NAME);
            // this.userRepository = this.connection.getRepository(User);
            // this.userTreeRepository = getTreeRepository(User, "cockroach_haproxy");
        });
    }
    async getUsers() {
        return this.connection.then(async (connection) => {
            // save ------------------------------
            //   let user_save = new User("email@mail.com","new_name","password");
            //   connection.manager.save(user_save);
            //------------------------------------
            let userRepository = connection.getRepository(UsersDB);
            //let users = await userRepository.findByIds([1,2,3,4,5,6,7,8,9]);
            let users = await userRepository.find();
            let buff = Array();
            users.forEach(function (item, index, arr) {
                buff.push(new UserDTO(item.getId(), item.getName(), item.getEmail(), item.getPassword(), item.getRole(), item.getCreated(), item.getAuthId()));
            });
            return new Promise((res) => {
                res(buff);
            });
        });
    }
    createUserSocial(authId, email, name, role) {
        return this.connection.then(async (connection) => {
            //console.log("4) createUserSocial");
            let user = UsersDB.constructorSocial(email, name, role, authId);
            return connection.manager.save(user).then(user => {
                //console.log("5) UserDTO");
                return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreated(), user.getAuthId());
            }).catch(err => {
                throw new BadRequest("Bad request:" + err.message);
            });
        });
    }
    async createUser(email, name, password, role) {
        return this.connection.then(async (connection) => {
            let user = new UsersDB(email, name, password, role);
            return connection.manager.save(user).then(user => {
                return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreated(), user.getAuthId());
            }).catch(err => {
                throw new BadRequest("Bad request:" + err.message);
            });
        });
    }
    getUserSocialId(authId) {
        return this.connection.then(async (connection) => {
            return connection.getRepository(UsersDB)
                .createQueryBuilder()
                .select("users")
                .from(UsersDB, "users")
                .where("users.authId=:authId")
                .setParameters({ authId: authId })
                .getOne().then((user) => {
                if (user) {
                    //console.log("пользователь есть  user:",user);
                    return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreated(), user.getAuthId());
                }
                else {
                    //console.log("1) пользователя нет");
                    return null;
                }
            }).catch(err => {
                throw new BadRequest("Bad request:" + err.message);
            });
        });
    }
    getUserID(email, password) {
        return this.connection.then(async (connection) => {
            // SELECT "users"."id" AS "users_id" FROM "users" "users" WHERE "users"."email"=$1 and "users"."password"=$2
            return connection.getRepository(UsersDB)
                .createQueryBuilder("users")
                .select("users.id")
                .where("users.email=:email and users.password=:password")
                .setParameters({ email: email, password: password })
                .getOneOrFail().then((user) => {
                //console.log("user=",user);
                return user.getId();
            }, (error) => {
                //console.log("error=",error);
                return null;
            });
            // let userRepository = connection.getRepository(User);
            // let user  = userRepository.findOne({ email: email,password:password });
        });
    }
    getUser(id) {
        return this.connection.then(async (connection) => {
            return connection.getRepository(UsersDB)
                .createQueryBuilder()
                .select("users")
                .from(UsersDB, "users")
                .where("users.id=:id")
                .setParameters({ id: id })
                .getOne().then((user) => {
                if (user) {
                    return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCreated(), user.getAuthId());
                }
                else {
                    return null;
                }
            }).catch(err => {
                throw new BadRequest("Bad request:" + err.message);
            });
        });
    }
    isUniqueEmail(email) {
        return this.connection.then(async (connection) => {
            return connection.getRepository(UsersDB)
                .createQueryBuilder()
                .select("users.email")
                .from(UsersDB, "users")
                .where("users.email=:email")
                .setParameters({ email: email })
                .getOne().then((user) => {
                if (user) {
                    return false;
                }
                else {
                    return true;
                }
            }).catch(err => {
                throw new BadRequest("Bad request:" + err.message);
            });
        });
    }
}
let users = new UsersAggregate();
export { users };
/*
export  function  getUsers(): Promise<Array<UserDTO>> {
    let users = new UsersAggregate();
    return  users.getUsers();
}
*/
