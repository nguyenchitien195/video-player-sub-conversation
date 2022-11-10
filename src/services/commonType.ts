export interface TypeListResponse<DataObj> {
  page: number;
  pageSize: number;
  total: number;
  data: DataObj[];
}
