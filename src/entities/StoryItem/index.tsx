import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
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

  return (
    <CardGrid
      key={id}
      size="l"
      onClick={() => routeNavigator.push(`/story-page/${id}`)}
    >
      <ContentCard
        className={styles["story-item"]}
        header={title}
        subtitle={`${by} ${time}`}
        caption={`score: ${score}`}
      />
    </CardGrid>
  );
};
