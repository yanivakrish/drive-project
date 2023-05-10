import { serverApi } from './server.api';

export interface FileResponse {
  id: string;
  filename: string;
  email: string;
}

export const filesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<FileResponse[], { email: string }>({
      query: (body) => ({ url: 'get-files', method: 'POST', body }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetFilesQuery } = filesApi;
