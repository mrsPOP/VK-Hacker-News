import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { ScreenSpinner, SplitCol, SplitLayout, View } from "@vkontakte/vkui";
import { ReactNode, useEffect, useState } from "react";
import { getStoryIds, getStory } from "./api";

import { Home, Persik } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [stories, setStories] = useState<Story[] | null>([]);
  const [popout, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const ids = await getStoryIds();
        if (ids) {
          const promises = ids.slice(0, 10).map(id => getStory(id));
          const storiesData = await Promise.all(promises);
          const validStories = storiesData.filter(story => story !== null) as Story[];
          setStories(validStories);
        }
      } catch (error) {
        console.error(error);
      }
      setPopout(null);
    }

    fetchData();
  }, []);
  
  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" stories={stories} />
          <Persik id="persik" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
