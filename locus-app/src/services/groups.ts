import { GroupType } from "../model/Group";

export const fetchGroups = async (): Promise<GroupType[]> => {
  return fetch("https://63433105ba4478d47849952e.mockapi.io/api/groups", {
    method: "GET",
  }).then((response) => response.json());
};
