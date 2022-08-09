import { post, get } from './request'

const prefix:string = "/user"
export const list = () => get(prefix + "/list")