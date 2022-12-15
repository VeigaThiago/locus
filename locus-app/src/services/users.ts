import { UserType } from "../model/User";

import firestore from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserModel = {
  avatarUrl: string;
  name: string;
  email: string;
};

export const fetchUsers = async (term?: string): Promise<UserModel[]> => {
  const users = await firestore()
    .collection<UserType>("users")
    .where("name", ">=", term)
    .where("name", "<=", term + "\uf8ff")
    .get();
  return users.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getUser = async (userId: string): Promise<any> => {
  const user = await firestore()
    .collection<UserType>("users")
    .doc(userId)
    .get();
  const enrichedUser = await appendUserData({ ...user.data(), id: user.id });
  return enrichedUser;
};

const appendUserData = async (user: {
  id: string;
  name?: string | undefined;
  email?: string | undefined;
  avatarUrl?: string | undefined;
}) => {
  const [location, battery] = await Promise.all([
    await firestore().collection("customerLocation").doc(user.id).get(),
    await firestore().collection("batteryStatus").doc(user.id).get(),
  ]);

  return { ...user, ...location.data(), battery: battery.data() };
};

export const createUser = async (userData: FirebaseAuthTypes.User) => {
  return firestore().collection("users").doc(userData.uid).set({
    name: userData.displayName,
    email: userData.email,
    avatarUrl: userData.photoURL,
  });
};

export const updateUser = async ({
  id,
  ...props
}: {
  id: string;
  name?: string;
  email?: string;
}) => {
  return firestore()
    .collection("users")
    .doc(id)
    .update({
      ...props,
    });
};

export const allUserGroups = (userId: string) =>
  firestore().collection("groupsRequest").doc(userId).collection("status");

export const getUserPendingGroupsIds = async (
  userId: string
): Promise<string[]> => {
  const pendingGroups = await allUserGroups(userId)
    .where("pending", "==", true)
    .where("confirmed", "==", false)
    .get();
  return pendingGroups.docs.map((doc) => doc.id);
};

export const getUserConfirmedGroupsIds = async (
  userId: string
): Promise<string[]> => {
  const confirmedGroups = await allUserGroups(userId)
    .where("pending", "==", false)
    .where("confirmed", "==", true)
    .get();
  return confirmedGroups.docs.map((doc) => doc.id);
};

const allFriends = (userId: string) =>
  firestore().collection("friends").doc(userId).collection("status");

export const getUserPendingFriendsIds = async (
  userId: string
): Promise<string[]> => {
  const pendingGroups = await allFriends(userId)
    .where("pending", "==", true)
    .where("confirmed", "==", false)
    .get();
  return pendingGroups.docs.map((doc) => doc.id);
};

export const getUserConfirmedFriendsIds = async (
  userId: string
): Promise<string[]> => {
  const confirmedGroups = await allFriends(userId)
    .where("pending", "==", false)
    .where("confirmed", "==", true)
    .get();
  return confirmedGroups.docs.map((doc) => doc.id);
};

const userFriendRelation = (uid: string, fid: string) =>
  firestore().collection("friends").doc(uid).collection("status").doc(fid);

const friendUserRelation = (uid: string, fid: string) =>
  firestore().collection("friends").doc(fid).collection("status").doc(uid);

export const sendFriendRequest = async (uid: string, fid: string) => {
  await Promise.all([
    userFriendRelation(uid, fid).update({
      confirmed: true,
      pending: true,
    }),
    friendUserRelation(uid, fid).update({
      confirmed: false,
      pending: true,
    }),
  ]);
};

export const removeFriend = async (uid: string, fid: string) => {
  await Promise.all([
    userFriendRelation(uid, fid).delete(),
    friendUserRelation(uid, fid).delete(),
  ]);
};

export const acceptFriendRequest = async (uid: string, fid: string) => {
  await Promise.all([
    userFriendRelation(uid, fid).update({
      confirmed: true,
      pending: false,
    }),
    friendUserRelation(uid, fid).update({
      pending: false,
    }),
  ]);
};

export const rejectFriendRequest = async (uid: string, fid: string) => {
  return removeFriend(uid, fid);
};
