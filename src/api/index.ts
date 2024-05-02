import { ITEM_URL, NEW_STORIES_URL } from "./config";

const fetchData = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getStoryIds = async (): Promise<number[] | null> => {
  return fetchData<number[]>(NEW_STORIES_URL);
};

export const getStory = async (storyId: number): Promise<RawStory | null> => {
  return fetchData<RawStory>(`${ITEM_URL}${storyId}.json`);
};

export const getComment = async (commentId: number): Promise<RawComment | null> => {
  return fetchData(`${ITEM_URL}${commentId}.json`);
};
