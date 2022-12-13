import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createUser, fetchUsers } from "../services/users";
import { UserType } from "./User";

let instance: Users;

class Users {
  instance: Users | undefined = undefined;

  fetchUsers = async (term?: string) => {
    const users = await fetchUsers(term);
    console.log(users);
    return users;
  };

  createUser = async (user: FirebaseAuthTypes.User) => createUser(user);

  static getInstance = () => {
    if (instance) return instance;
    else {
      instance = new Users();
      return instance;
    }
  };
}

export default Users.getInstance();
