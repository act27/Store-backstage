import axios from "axios"
import { ElMessage, ElLoading } from 'element-plus'
import store from '../store/index.js'
// 使用create创建axios实例
let loadingObj = null
const Service = axios.create({
    timeout:8000,
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    headers:{
        "Content-type":"application/json;charset=utf-8",
        "Authorization":store.state.uInfo.userInfo.token
    }
})
// 请求拦截-增加loading,对请求做统一处理
Service.interceptors.request.use(config=>{
    loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      return config
})
// 响应拦截 对返回值做统一处理 
Service.interceptors.response.use(response=>{
    loadingObj.close()
    const data = response.data
    if(data.meta.status > 201){
        // 请求出错
        ElMessage.error(data.meta.msg || "服务器错误")
        return data
    }
    return data
},err=>{
    loadingObj.close()
    console.log(err);
    ElMessage({
        message	:"服务器错误",
        type:"error",
        duration:2000

    })
})

// post请求
export const post=config=>{
    return Service({
        ...config,
        method:"post",
        data:config.data
    })
}
// get请求
export const get=config=>{
    return Service({
        ...config,
        method:"get",
        params:config.data
    })
}
// put请求
export const put=config=>{
    return Service({
        ...config,
        method:"put",
        data:config.data
    })
}
// delete请求
export const del=config=>{
    return Service({
        ...config,
        method:"delete"
    })
}