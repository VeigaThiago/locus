import { UserType } from "../model/User";

const GET_USERS_URL = `https://6397758786d04c7633962b07.mockapi.io/users`;
import firestore from "@react-native-firebase/firestore";

export const fetchUsersMock = async (term?: string): Promise<UserType[]> => {
  return fetch(GET_USERS_URL, {
    method: "GET",
  }).then((response) => response.json());
};

export const fetchUsers = async (term?: string): Promise<UserType[]> => {
  const users = await firestore()
    .collection<UserType>("users")
    .where("name", ">=", term)
    .where("name", "<=", term + "\uf8ff")
    .get();
  return users.docs.map((doc) => doc.data());
};
