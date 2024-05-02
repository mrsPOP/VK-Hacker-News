import { fetchData } from ".";
import { ITEM_URL, NEW_STORIES_URL } from "./config";

export const getStoryIds = async (): Promise<number[] | null> => {
  return fetchData<number[]>(NEW_STORIES_URL);
};

export const getStory = async (storyId: number): Promise<RawStory | null> => {
  return fetchData<RawStory>(`${ITEM_URL}${storyId}.json`);
};