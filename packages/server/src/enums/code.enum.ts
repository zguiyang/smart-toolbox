/**
 * response code enums for global use
 * 0xxxx: global
 * @enum {string}
 * **/
export enum ResponseCodeEnums {
  // all success response code
  SUCCESS = '00000',
  // mongodb error response code
  DATABASE_ERROR = '00001',
  //  request error response code
  REQUEST_ERROR = '00002',
}

/**
 * response code enums for auth module
 * 1xxx: auth module
 * @enum {string}
 * **/
export enum AuthCodeEnums {
  NOT_FOUND_USER = '10000',
  INVALID_ACCOUNT = '10001',
  USER_DISABLED = '10002',
  INVALID_STATUS = '10003',
  INIT_USER_PASSWORD = '20006',
}

/**
 * response code enums for user module
 * 2xxx: user module
 * @enum {string}
 * **/
export enum UserCodeEnums {
  CREATE_FAILED = '20001',
  UPDATE_FAILED = '20002',
  DELETE_FAILED = '20003',
  UPDATE_PROFILE_FAILED = '20004',
  UPDATE_USER_STATUS_FAILED = '20005',
}

/**
 * response code enums for role module
 * 3xxx: user role module
 * @enum {string}
 * **/
export enum RoleCodeEnums {
  CREATE_FAILED = '30001',
  UPDATE_FAILED = '30002',
  DELETE_FAILED = '30003',
  ROLE_NOT_FOUND = '30004',
}

/**
 * response code enums for system-config module
 * @param {string}
 * 4xxx: system-config module
 **/
export enum SystemConfigCodeEnums {
  GET_FAILED = '40000',
  CREATE_FAILED = '40001',
  UPDATE_FAILED = '40002',
}
