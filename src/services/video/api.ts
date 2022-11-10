import { videoData } from '../data';
import { TypeListResponse } from './../commonType';
import { TypeVideo } from './type';

interface GetVideoParams {
  filter: {
    tag: string;
    keyword: string;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}

export const getVideos = async (
  params: GetVideoParams
): Promise<TypeListResponse<TypeVideo>> => {
  const { tag, keyword } = params.filter;
  let result: TypeVideo[] = videoData;
  if (tag !== 'All') {
    result = videoData.filter(v => v.tags.includes(tag));
  }
  if (keyword !== '') {
    result = result.filter(v =>
      v.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
  }

  return Promise.resolve({
    data: result,
    page: 1,
    pageSize: 5,
    total: 3,
  });
};

export const getVideoById = async (id: number): Promise<TypeVideo> => {
  const result = videoData.find(v => v.id === id);
  return Promise.resolve(result || videoData[0]);
};
