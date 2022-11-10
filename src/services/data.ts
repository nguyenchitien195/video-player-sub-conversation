import { TypeVideo } from './video/type';

export const tagData: string[] = [
  'cartoon',
  'naruto',
  'trailer',
  'movie',
  'kung fu',
];

export const videoData: TypeVideo[] = [
  {
    // 1:32
    id: 1,
    tags: ['cartoon', 'naruto', 'trailer'],
    conversations: [
      {
        speaker: 'No one',
        text: 'This is naruto trailer',
        time: 0,
      },
      {
        speaker: 'No one',
        text: 'The dark movie',
        time: 2,
      },
      {
        speaker: 'No one',
        text: 'This is a Shark man',
        time: 12,
      },
      {
        speaker: 'No one',
        text: 'Someone is on the electric pole',
        time: 17,
      },
      {
        speaker: 'No one',
        text: 'Someone smile',
        time: 21,
      },
      {
        speaker: 'Animal',
        text: [
          {
            value: 'Woooooooooo',
            description: 'Wooooooo is the sound of animal',
          },
        ],
        time: 24,
      },
      {
        speaker: 'No one',
        text: 'The man is using his hand to make color',
        time: 33,
      },
      {
        speaker: 'No one',
        text: 'Two men are playing with fire',
        time: 40,
      },
      {
        speaker: 'The man',
        text: 'Arigato nupakachi hamehame',
        time: 55,
      },
      {
        speaker: 'Itachi',
        text: "Let's fly",
        time: 59,
      },
      {
        speaker: "Who's know",
        text: 'Open the eyes',
        time: 64,
      },
    ],
    mediaUrl: 'https://www.youtube.com/watch?v=ofzlco57gP0&wmode=opaque&rel=0',
    thumbUrl: 'https://i3.ytimg.com/vi/ofzlco57gP0/maxresdefault.jpg',
    description: 'Naruto trailer description',
    title:
      'Naruto: The Movie | Teaser Trailer (2023) - First Look - Live Action - "Concept"',
  },
  {
    // 5:19
    id: 2,
    tags: ['movie', 'kung fu'],
    conversations: [],
    mediaUrl: 'https://www.youtube.com/watch?v=XePRxozV1yY',
    thumbUrl: 'https://i3.ytimg.com/vi/XePRxozV1yY/maxresdefault.jpg',
    description: 'Kung Fu hustle movie description',
    title: 'Full Kung Fu Fight Scene HD | Kung Fu Hustle',
  },
  {
    // 1:47
    id: 3,
    tags: ['cartoon', 'naruto', 'trailer'],
    conversations: [],
    mediaUrl: 'https://www.youtube.com/watch?v=t0_qPFHEm-g',
    thumbUrl: 'https://i3.ytimg.com/vi/t0_qPFHEm-g/maxresdefault.jpg',
    description: 'Naruto trailer description',
    title: 'NARUTO: The Movie "New Trailer" (2022) Live Action "Concept"',
  },
];
