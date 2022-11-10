import create from 'zustand';

interface SearchStore {
  tag: string;
  keyword: string;
  setTag: (tag: string) => void;
  setKeyword: (keyword: string) => void;
}

export const searchStore = create<SearchStore>(set => ({
  tag: 'All',
  keyword: '',
  setKeyword: (keyword: string) =>
    set(state => ({
      keyword,
      tags: state.tag,
    })),
  setTag: (tag: string) =>
    set(state => ({
      keyword: state.keyword,
      tag,
    })),
}));
