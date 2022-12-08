import { Request, Response } from "express";

class Handler {
  //Response failed
  static failed = async (values: any, message: string, res: Response) => {
    try {
      var data = {
        status: 400,
        message: message,
        results: {
          data: values || {},
        },
      };
    } catch (error) {
      console.log(error);
    }

    res.send(data);
  };

  //Response Success
  static success = async (values: any, message: string, res: Response) => {
    try {
      var data = {
        status: 200,
        message: message,
        results: {
          data: values || {},
        },
      };
    } catch (error) {
      console.log(error);
    }

    res.send(data);
  };

  //Response validation
  static validation = async (values: any, message: string, res: Response) => {
    try {
      var data = {
        status: 412,
        message: message,
        results: {
          data: values || {},
        },
      };
    } catch (error) {
      console.log(error);
    }

    res.send(data);
  };

  static auth = async (values: any, message: string, res: Response) => {
    try {
      var data = {
        status: 401,
        message: message,
        results: {
          data: values || {},
        },
      };
    } catch (error) {
      console.log(error);
    }

    res.send(data);
  };

  static pagination = async (
    values: any,
    message: string,
    res: Response,
    req: any
  ) => {
    let limit = parseInt(req.query.limit);
    if (!limit) {
      limit = 10;
    }
    let pageCount = Math.ceil(values.length / limit);
    let page = parseInt(req.query.page);
    let count = Math.ceil(values.length);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }

    try {
      var data = {
        status: 200,
        message: message,
        results: {
          data: values.slice(page * limit - limit, page * limit),
          pagination: {
            total_data: count,
            total_page: pageCount,
            next_page: pageCount - page++,
          },
        },
      };
    } catch (err) {
      console.log(err);
    }

    res.send(data);
  };
}
export default Handler;
