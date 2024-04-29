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

export interface HomeProps extends NavIdProps {
  stories?: Story[] | null;
}

export const Home: FC<HomeProps> = ({ id, stories }) => {
  const routeNavigator = useRouteNavigator();
  return (
    <Panel id={id}>
      <PanelHeader>Hacker News</PanelHeader>
      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        {stories && stories.map((story) => (
          <CardGrid key={story.id} size="l">
            <ContentCard
              header={story.title}
              subtitle={story.score}
              caption={story.descendants}
            />
          </CardGrid>
        ))}
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("persik")}
          >
            Обновить
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
