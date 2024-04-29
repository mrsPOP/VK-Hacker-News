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

interface Story extends Omit<RawStory, 'time'> {
  time: string;
}
