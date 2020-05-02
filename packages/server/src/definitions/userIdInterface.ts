import { Request } from 'express';

export interface userIdInterface extends Request {
  req: {
    headers: {
      authentication: string;
    };
    connection: {
      context: {
        Authorization: string;
      };
    };
  };
}
