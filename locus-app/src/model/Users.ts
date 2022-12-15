import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createUser, fetchUsers, getUser } from "../services/users";

let instance: Users;

class Users {
  instance: Users | undefined = undefined;

  fetchUsers = async (term?: string) => fetchUsers(term);

  createUser = async (user: FirebaseAuthTypes.User) => createUser(user);

  getUser = async (uid: string) => getUser(uid);

  static getInstance = () => {
    if (instance) return instance;
    else {
      instance = new Users();
      return instance;
    }
  };
}

export default Users.getInstance();
