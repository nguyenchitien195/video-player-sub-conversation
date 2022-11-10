export interface HighlightKeyword {
  value: string;
  description: string;
}

export type HighlightSentence = string | HighlightKeyword;

export interface TypeVideo {
  id: number;
  tags: string[];
  title: string;
  description: string;
  thumbUrl: string;
  mediaUrl: string;
  conversations: {
    speaker: string;
    time: number;
    text: string | HighlightSentence[];
  }[];
}
