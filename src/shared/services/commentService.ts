import { fetchData } from ".";
import { ITEM_URL } from "./config";

export const getComment = async (commentId: number): Promise<RawComment | null> => {
  return fetchData(`${ITEM_URL}${commentId}.json`);
};