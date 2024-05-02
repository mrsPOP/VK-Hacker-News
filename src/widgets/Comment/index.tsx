import { RichCell, Avatar } from "@vkontakte/vkui";
import { Icon28UserOutline } from "@vkontakte/icons";
import type { FC } from "react";

type Props = {
  id: number;
  by: string;
  text: string;
  time: string;
};

export const Comment: FC<Props> = ({ id, by, text, time }) => {
  return (
    <RichCell
      key={id}
      before={
        <Avatar size={48}>
          <Icon28UserOutline fill="#99A2AD" width={28} height={28} />
        </Avatar>
      }
      text={text}
      caption={`Posted on ${time}`}
      multiline
    >
      {by || "Anonym"}
    </RichCell>
  );
};
