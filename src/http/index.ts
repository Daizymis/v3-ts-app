import axios from "axios";
import {ElMessage} from 'element-plus'

enum MSGS {
    "操作成功"= 200,
    "登录失败" = 201
}

const http = axios.create({
//   baseURL: "http://localhost:3000/api",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset:utf-8",
  },
});
http.interceptors.request.use(config => {
    (config.headers || {}).token = localStorage.getItem('token') || '';
    return config;
})

http.interceptors.response.use(res => {
    const code:number = res.data?.code;
    if (code !== 200) {
        ElMessage.error(MSGS[code]);
        return Promise.reject(res.data);
    }
    return res;
}, err => {
    ElMessage.error(`Oops, this is a error message: ${err}`);
})

export default http;