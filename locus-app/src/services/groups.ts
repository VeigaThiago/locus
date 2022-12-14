import firestore from "@react-native-firebase/firestore";
import { GroupType } from "../model/Group";

type GroupModel = {
  name: string;
  id: string;
  owner: string;
  participants: string[];
};

export const fetchGroups = async (): Promise<GroupType[]> => {
  const groups = await firestore().collection<GroupType>("groups").get();
  return groups.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const fetchGroup = async (gid: string): Promise<GroupModel> => {
  const group = await firestore()
    .collection<GroupModel>("groups")
    .doc(gid)
    .get();
  return { ...group.data(), id: group.id };
};
