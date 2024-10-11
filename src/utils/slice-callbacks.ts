import { IApiResponse } from '@/interfaces/redux-slice.interfaces';

interface IExecCallbacks {
  successCallback?: (data: any) => {};
  failureCallback?: () => {};
}

export const execCallbacks = (response: IApiResponse, { successCallback, failureCallback }: IExecCallbacks) => {
  if (response.succeeded) {
    successCallback && successCallback(response.data);
  } else {
    failureCallback && failureCallback();
  }
};
