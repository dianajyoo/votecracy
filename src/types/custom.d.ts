declare namespace Express {
  export interface Request {
    address?: string;
  }
}

declare namespace NodeJS {
  export interface Global {
    address?: string;
  }
}
