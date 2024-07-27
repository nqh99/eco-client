export default class ResponseMdl<T> {
  data?: T;
  httpStatus?: string;
  message?: string;

  constructor(data?: T, httpStatus?: string, message?: string) {
    this.data = data;
    this.httpStatus = httpStatus;
    this.message = message;
  }
}
