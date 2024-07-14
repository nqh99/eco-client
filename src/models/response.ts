interface ResponseMdl<T> {
  data: T[];
  httpStatus: string;
  message: string;
}

export default ResponseMdl;
