import axios from 'axios';

export const baseUrl = 'http://localhost:4000';
 
//axios 的实例及拦截器配置 http://localhost:3000/#/recommend
const axiosInstance = axios.create ({
  baseURL: baseUrl
});

//拦截器，在then和catch处理前拦截它们
axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);


export {
  axiosInstance
};