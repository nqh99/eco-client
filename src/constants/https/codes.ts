enum HttpStatusCodes {
  OK = 200,
  BAD_REQ = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_CONTENT = 422,
  INTERNAL_SERVICE_ERROR = 500,
}

const HttpStatusMessages: { [key in HttpStatusCodes]: string } = {
  [HttpStatusCodes.OK]: 'Fetch data successfully!',
  [HttpStatusCodes.BAD_REQ]:
    'Cannot not process the request due to something that is perceived to be a client error!',
  [HttpStatusCodes.UNAUTHORIZED]:
    'Must authenticate yourself to get the requested response!',
  [HttpStatusCodes.FORBIDDEN]: 'Does not have access rights to the content!',
  [HttpStatusCodes.NOT_FOUND]: 'Cannot find the requested resource!',
  [HttpStatusCodes.CONFLICT]: 'Conflicts with the current state of the server!',
  [HttpStatusCodes.UNPROCESSABLE_CONTENT]:
    'The request faces some semantic errors!',
  [HttpStatusCodes.INTERNAL_SERVICE_ERROR]: 'Internal service error!',
};

export { HttpStatusCodes, HttpStatusMessages };
