import {
  useRouteNavigator
} from "@vkontakte/vk-mini-apps-router";
import { CardGrid, ContentCard } from "@vkontakte/vkui";
import type { FC } from "react";
import styles from "./styles.module.css";

type Props = {
  id: number;
  title: string;
  by: string;
  score: number;
  time: string;
};

export const StoryItem: FC<Props> = ({ id, title, by, time, score }) => {
  const routeNavigator = useRouteNavigator();
  const onStoryClick = () => {
    routeNavigator.push(`/story-page/${id}`);
  };
  return (
    <CardGrid key={id} size="l" onClick={onStoryClick}>
      <ContentCard
        className={styles["story-item"]}
        header={title}
        subtitle={`${by} ${time}`}
        caption={`score: ${score}`}
      />
    </CardGrid>
  );
};

export default StoryItem;
