import { Icon24ExternalLinkOutline } from "@vkontakte/icons";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Div,
  Group,
  Header,
  Link,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  ScreenSpinner,
  Spacing,
  Text,
} from "@vkontakte/vkui";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { getComment, getStory } from "../../api";
import { formatDate } from "../../utils";
import { decodeHtmlEntities } from "../../utils/helpers";
import { Comment } from "../../widgets/Comment";

export const StoryPage: FC<NavIdProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const routeNavigator = useRouteNavigator();
  const params = useParams<"id">()!;
  const [story, setStory] = useState<Story>();
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const rawStory = await getStory(Number(params.id));
        if (rawStory) {
          if (rawStory.kids && rawStory.kids.length > 0) {
            const promises = rawStory.kids.map((commentId) =>
              getComment(commentId)
            );
            const commentsData = (await Promise.all(promises)).filter(
              Boolean
            ) as RawComment[];
            const nonNullComments = commentsData
              .sort((a, b) => b.time - a.time)
              .map((comment) => ({
                ...comment,
                text: decodeHtmlEntities(comment.text),
                time: formatDate(comment.time),
              })) as Comment[];
            setComments(nonNullComments);
          }
          const formattedTime = formatDate(rawStory.time);
          const story: Story = {
            ...rawStory,
            time: formattedTime,
          };
          setStory(story);
        }
      } catch (error) {
        console.error("Failed to fetch story or comments", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
      >
        {story?.title}
      </PanelHeader>
      {isLoading ? (
        <ScreenSpinner size="large" />
      ) : (
        <>
          <Group>
            <Div>
              <Link href={story?.url} target="_blank">
                {story?.url}
                <Icon24ExternalLinkOutline width={16} height={16} />
              </Link>
            </Div>
            <Div>
              <Text weight="1">by: {story?.by}</Text>
              <Spacing size={16} />
              <Text>{story?.time}</Text>
            </Div>
          </Group>
          <Group
            header={
              <Header mode="secondary">{`Comments (${
                story?.kids ? story?.kids.length : 0
              })`}</Header>
            }
          >
            {comments &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  by={comment.by}
                  text={comment.text}
                  time={comment.time}
                  kids={comment.kids}
                />
              ))}
          </Group>
        </>
      )}
    </Panel>
  );
};
