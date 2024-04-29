import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Button,
  CardGrid,
  ContentCard,
  Div,
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import { FC } from "react";
import styles from "./styles.module.css";

export interface NewsProps extends NavIdProps {
  stories?: Story[] | null;
  onRefresh: () => void;
}

export const News: FC<NewsProps> = ({ id, stories, onRefresh }) => {
  const routeNavigator = useRouteNavigator();
  const onStoryClick = () => {
    routeNavigator.push("persik");
  };
  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Div>
        <Button stretched size="l" mode="secondary" onClick={onRefresh}>
          Обновить
        </Button>
      </Div>
      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        {stories &&
          stories.map((story) => (
            <CardGrid key={story.id} size="l" onClick={onStoryClick}>
              <ContentCard
                className={styles["story-item"]}
                header={story.title}
                subtitle={`${story.by} ${story.time}`}
                caption={`score: ${story.score}`}
              />
            </CardGrid>
          ))}
      </Group>
    </Panel>
  );
};
