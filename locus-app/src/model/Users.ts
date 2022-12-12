import { fetchUsers } from "../services/users";
import { UserType } from "./User";

let instance: Users;

class Users {
  instance: Users | undefined = undefined;

  users: UserType[] | undefined = undefined;

  getUsers = async (term?: string) => {
    if (this.users) return this.users;
    else {
      await this.fetchUsers(term);
      return this.users;
    }
  };

  fetchUsers = async (term?: string) => {
    const users = await fetchUsers(term);
    this.users = users;
  };

  static getInstance = () => {
    if (instance) return instance;
    else {
      instance = new Users();
      return instance;
    }
  };
}

export default Users.getInstance();
