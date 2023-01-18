import React from 'react'
// import ReactTsRouter from './01-安装路由'
// ts路由
import IndexRouter from './router'
// axios 请求拦截 公共显示隐藏正在加载
import  '../utils/request'
export default function App() {
    return (
        <div >
            {/* <h1>react+ts路由-demo文件入口</h1> */}
            {/* <ReactTsRouter /> */}
            <IndexRouter/>
        </div>
    )
}
