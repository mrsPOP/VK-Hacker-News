import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { ScreenSpinner, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { getStory, getStoryIds } from "./api";
import { News, Persik } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { formatDate } from "./utils";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.NEWS } = useActiveVkuiLocation();
  const [stories, setStories] = useState<Story[]>([]);
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  const fetchData = useCallback(async () => {
    setPopout(<ScreenSpinner size="large" />);
    try {
      const ids = await getStoryIds();
      if (ids) {
        const promises = ids.slice(0, 10).map((id) => getStory(id));
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

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <News id="news" stories={stories} onRefresh={fetchData} />
          <Persik id="story-page" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
