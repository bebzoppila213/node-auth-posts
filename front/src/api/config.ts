export const SERVER_URL = "http://localhost:8083/api/v1/"
export const SERVER_MEDIA = "http://localhost:8083/"
export type CommonResponseData<B extends Boolean, T> = {
    messages: string;
    ok: B;
    data: T;
  };