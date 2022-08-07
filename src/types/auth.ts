/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-07 21:38:26
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-07 21:38:40
 */
export interface UserCreateRequest{
  username: string, 
  password:string,
  mail: string,
  code: string,
};

export type UserLoginRequest = {
  username: string, 
  password: string
};