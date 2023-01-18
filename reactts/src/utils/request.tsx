import { Toast } from "antd-mobile";
import axios from "axios";
/*
文档地址  https://github.com/axios/axios#interceptors 
*/
// 添加 axios 请求拦截器
axios.interceptors.request.use(function(config){
    // 发起请求前 显示正在加载
    Toast.show({
        icon:'loading',
        content:'加载中...',
        //  duration 设置显示时长  0不隐藏
        duration:0,
      })
    // 在发送axios 请求之前触发
    return config
},function(error){
    // 处理请求错误
    return Promise.reject(error);
})

axios.interceptors.response.use(function(response){
     // 发起请求成功后 清除 正在加载
    Toast.clear()
    // 发起axios请求成功后触发
    return response
},function(error){
     // 发起请求失败后 清除 正在加载
     Toast.clear()
    // 处理请求错误
    return Promise.reject(error);
})
