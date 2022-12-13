import { fetchUsers } from "../services/users";

let instance: Users;

class Users {
  instance: Users | undefined = undefined;

  fetchUsers = async (term?: string) => {
    const users = await fetchUsers(term);
    console.log(users);
    return users;
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
