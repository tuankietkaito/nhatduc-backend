export enum AccountRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum HttpResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_ALLOWED = 403,
  NOT_FOUND = 404,
  LOCKED = 423
}

export enum HttpResponseMessage {
  SUCCESS = 'Success',
  BAD_REQUEST = 'Parameter is not correct',
  UNAUTHORIZED = 'Authorization is failed',
  NOT_ALLOWED = 'Forbidden',
  NOT_FOUND = 'Resource not found',
  LOCKED = 'Unlocked code required'
}

export const HASH_ROUNDS = 10;
export const TOKEN_TTL = 7 * 24 * 60 * 60; /* 7 days */
