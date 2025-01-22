export const responses = {
  successResponseOneObject: (data: {}) => {
    return Response.json(
      { apiVersion: "1.0", code: 200, message: "Success", data: data },
      { status: 200 }
    );
  },
  successResponseList: (data: {}) => {
    return Response.json(
      {
        apiVersion: "1.0",
        code: 200,
        message: "Success",
        data: {
          object: "List",
          items: data,
        },
      },
      { status: 200 }
    );
  },
  serverError: (error: any) => {
    return Response.json(
      {
        apiVersion: "1.0",
        message: "Internal Server Error",
        code: "500",
        reason: { error },
      },
      { status: 500 }
    );
  },
  recordExist: () => {
    return Response.json(
      {
        apiVersion: "1.0",
        message: "Record already exist",
        code: "409",
      },
      { status: 409 }
    );
  },
  notFoundError: () => {
    return Response.json(
      {
        apiVersion: "1.0",
        error: {
          message: "Record Not Found",
          status: "404",
        },
      },
      { status: 404 }
    );
  },
};
