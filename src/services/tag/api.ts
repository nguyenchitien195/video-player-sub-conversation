import { tagData } from './../data';
import { TypeListResponse } from '../commonType';

export const getTags = async (): Promise<TypeListResponse<string>> => {
  return Promise.resolve({
    data: tagData,
    page: 1,
    pageSize: 100,
    total: 100,
  });
};
