import config from "~config";
import * as fortune from "~lib/fortune.js";
import {mail} from "~lib/email.js";
import {userController}   from "~ui/controllers/user.js";
import credentials from "~root/credentials.js";


const controllers = {user:userController};
export {config,fortune,mail,credentials,controllers};