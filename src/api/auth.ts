/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:24:29
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 18:34:23
 */
import { post } from './request'

const prefix:string = "/auth";

export const getToken = (username: string, password: string) => post( prefix + "/token", { username, password});
