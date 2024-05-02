interface RawStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

interface Story extends Omit<RawStory, "time"> {
  time: string;
}

interface RawComment {
  by: string;
  id: number;
  kids?: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

interface Comment extends Omit<RawComment, "time"> {
  time: string;
}
