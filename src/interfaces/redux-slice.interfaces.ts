export interface IReduxInitialState {
  error?: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  user: any | null;
}


export interface IApiPayload<T> {
  payload: T;
  successCallback?: (data: any | T, ...args: any) => any;
  failureCallback?: (...args: any) => any;
}


export interface IApiResponse {
  succeeded: boolean;
  message: string;
  data?: any;
  totalRecords?: number;
}