import { UserType } from "../model/User";

const GET_USERS_URL = `https://6397758786d04c7633962b07.mockapi.io/users`;

export const fetchUsers = async (term?: string): Promise<UserType[]> => {
  return fetch(GET_USERS_URL, {
    method: "GET",
  }).then((response) => response.json());
};
