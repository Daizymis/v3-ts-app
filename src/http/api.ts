import { LoginFormData } from '@/types/login';
import { selectData } from '@/types/order';
import http from './index';

export const login =( data:LoginFormData) => http({url: '/login', method: "post", data});
export const getOrderList = (data:selectData) => http({url: '/getOrderList', method: "get", data});
export const getGoodList = (data:any) => http({url: '/getGoodList', method: "get", data});