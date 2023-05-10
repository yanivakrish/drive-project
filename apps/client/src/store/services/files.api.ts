import { serverApi } from './server.api';

export interface FileReponse {
  id: string;
  filename: string;
}

export const filesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<FileReponse[], void>({
      query: () => ({ url: 'get-files' }),
    }),
    // uploadFile: build.mutation<void, File>({
    //   query: (body) => ({
    //     url: 'upload-file',
    //     method: 'POST',
    //     body: { file: body },
    //     headers:{
    //     }
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const { useGetFilesQuery } = filesApi;
