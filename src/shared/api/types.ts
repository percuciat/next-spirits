export interface IApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
}

export type TApiResponse<T = unknown> =
  | IApiSuccessResponse<T>
  | IApiErrorResponse;
