import { useState, useEffect, useCallback, ReactNode, useRef } from "react";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { ScreenSpinner, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { getStory, getStoryIds } from "./api";
import { News, StoryPage } from "./panels";
import { VIEW_PANELS } from "./routes";
import { formatDate } from "./utils";

export const App = () => {
  const { panel: activePanel = VIEW_PANELS.NEWS } = useActiveVkuiLocation();
  const [stories, setStories] = useState<Story[]>([]);
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  );
  const intervalIdRef = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    setPopout(<ScreenSpinner size="large" />);
    try {
      const ids = await getStoryIds();
      if (ids) {
        const promises = ids.slice(0, 100).map((id) => getStory(id));
        const storiesData = await Promise.all(promises);
        const validStories = storiesData.reduce((acc, rawStory) => {
          if (rawStory) {
            const formattedTime = formatDate(rawStory.time);
            const story: Story = {
              ...rawStory,
              time: formattedTime,
            };
            acc.push(story);
          }
          return acc;
        }, [] as Story[]);
        setStories(validStories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPopout(null);
    }
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    intervalIdRef.current = window.setInterval(() => fetchData(), 60 * 1000);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    resetInterval();

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [fetchData, resetInterval]);

  const refreshData = useCallback(() => {
    fetchData();
    resetInterval();
  }, [fetchData, resetInterval]);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <News id="news" stories={stories} onRefresh={refreshData} />
          <StoryPage id="story-page" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
