import {
  Button,
  Div,
  Group,
  Header,
  NavIdProps,
  Panel,
  PanelHeader,
} from "@vkontakte/vkui";
import { FC } from "react";
import StoryItem from "../../widgets/StoryItem";

export interface NewsProps extends NavIdProps {
  stories?: Story[] | null;
  onRefresh: () => void;
}

export const News: FC<NewsProps> = ({ id, stories, onRefresh }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Div>
        <Button stretched size="l" mode="secondary" onClick={onRefresh}>
          Update
        </Button>
      </Div>
      <Group header={<Header mode="secondary">Latest News</Header>}>
        {stories &&
          stories.map((story) => (
            <StoryItem
              key={story.id}
              id={story.id}
              by={story.by}
              score={story.score}
              time={story.time}
              title={story.title}
            />
          ))}
      </Group>
    </Panel>
  );
};
