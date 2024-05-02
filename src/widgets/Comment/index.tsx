import { Icon28UserOutline } from "@vkontakte/icons";
import { Avatar, Caption, RichCell } from "@vkontakte/vkui";
import { useState, type FC } from "react";
import { getComment } from "../../api";
import { decodeHtmlEntities, formatDate } from "../../utils/helpers";
import styles from "./styles.module.css";

type Props = {
  id: number;
  by: string;
  text: string;
  time: string;
  kids?: number[];
};

export const Comment: FC<Props> = ({ id, by, text, time, kids }) => {
  const [childComments, setChildComments] = useState<Comment[] | null>(null);
  const [isChildCommentsVisible, setChildCommentsVisible] = useState(false);
  const loadChildComments = async () => {
    if (!kids || kids.length === 0) return;
    const childCommentPromises = kids.map((kidId) => getComment(kidId));
    const rawChildComments = await Promise.all(childCommentPromises);
    const nonNullChildComments = rawChildComments.filter(
      Boolean
    ) as RawComment[];
    const transformedChildComments = nonNullChildComments.map(
      (childComment) => ({
        ...childComment,
        text: decodeHtmlEntities(childComment.text),
        time: formatDate(childComment.time),
      })
    ) as Comment[];
    setChildComments(transformedChildComments);
  };

  const onCommentClick = () => {
    if (!childComments) loadChildComments();
    setChildCommentsVisible((prev) => !prev);
  };
  return (
    <>
      <RichCell
        onClick={onCommentClick}
        key={id}
        before={
          <Avatar size={48}>
            <Icon28UserOutline fill="#99A2AD" width={28} height={28} />
          </Avatar>
        }
        text={text}
        caption={
          <>
            {`Posted on ${time}`}
            {kids && kids?.length > 0 && (
              <Caption>{`${kids.length} replies`}</Caption>
            )}
          </>
        }
        multiline
      >
        {by || "Anonym"}
      </RichCell>
      <div className={styles["child-comments-container"]}>
          {isChildCommentsVisible &&
            childComments?.map((comment) => (
              <Comment {...comment} key={comment.id} />
            ))}
      </div>
    </>
  );
};
