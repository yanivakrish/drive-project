import { serverApi } from './server.api';

export interface FileResponse {
  id: string;
  filename: string;
}

export const filesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<FileResponse[], void>({
      query: () => ({ url: 'get-files' }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetFilesQuery } = filesApi;
