import { LoginFormData } from '@/types/login';
import { selectData } from '@/types/order';
import { UserInfo } from '@/types/user';
import http from './index';

export const login =( data:LoginFormData) => http({url: '/login', method: "post", data});
export const getOrderList = (data:selectData) => http({url: '/getOrderList', method: "get", data});
export const getGoodList = (data:any) => http({url: '/goods/getGoodList', method: "get", data});
export const updateUser = (data:UserInfo) => http({url: '/updateUser', method:'post',data})
export const getTabBarList = () => http({url: '/goods/getTabBarList', method: 'get'})
export const getCategoryList = () => http({url: '/goods/getCategoryList', method:'get'})