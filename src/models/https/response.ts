// interface ResponseMdl<T> {
//   data: T[];
//   httpStatus: string;
//   message: string;
// }

// export default ResponseMdl;

export default class ResponseMdl<T> {
  data: T[];
  httpStatus: string;
  message: string;

  constructor(
    data: T[] = [],
    httpStatus: string = "404",
    message: string = ""
  ) {
    this.data = data;
    this.httpStatus = httpStatus;
    this.message = message;
  }

  isBadRes(): boolean {
    return this.httpStatus == "404" || this.data.length === 0;
  }
}


