import firestore from "@react-native-firebase/firestore";
import { GroupType } from "../model/Group";

type GroupModel = {
  name: string;
  id: string;
  owner: string;
  participants: string[];
};

const userGroupRequest = (uId: string, gId: string) =>
  firestore()
    .collection("groupsRequest")
    .doc(uId)
    .collection("status")
    .doc(gId);

const groupDoc = (gid: string) =>
  firestore().collection<GroupModel>("groups").doc(gid);

export const createGroup = async ({
  name,
  owner,
  participants,
}: {
  name: string;
  owner: string;
  participants: string[];
}) => {
  const group = await firestore().collection("groups").add({
    name,
    owner,
    participants,
  });
  await userGroupRequest(owner, group.id).set({
    confirmed: true,
    pending: false,
  });
  return { id: group.id, ...(await group.get()).data() };
};

export const acceptGroupRequest = async (uid: string, gid: string) => {
  await userGroupRequest(uid, gid).update({ confirmed: true, pending: false });
  await groupDoc(gid).update({
    participants: firestore.FieldValue.arrayUnion(uid),
  });
};

export const rejectGroupRequest = async (uid: string, gid: string) => {
  await userGroupRequest(uid, gid).update({ confirmed: false, pending: false });
};

export const sendGroupRequest = async (uId: string, gId: string) => {
  await userGroupRequest(uId, gId).set({
    confirmed: false,
    pending: true,
  });
};

export const fetchGroups = async (): Promise<GroupType[]> => {
  const groups = await firestore().collection<GroupType>("groups").get();
  return groups.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const fetchGroup = async (gid: string): Promise<GroupModel> => {
  const group = await groupDoc(gid).get();
  return { ...(group.data() as GroupModel), id: group.id };
};
