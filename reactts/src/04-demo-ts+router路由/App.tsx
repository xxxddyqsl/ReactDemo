import React from 'react'
// import ReactTsRouter from './01-安装路由'
// ts路由
import IndexRouter from './router'
import {HashRouter} from 'react-router-dom'
// axios 请求拦截 公共显示隐藏正在加载
import  '../utils/request'
export default function App() {
    return (
        // 根目录外层 包上 HashRouter 是通过 hash 值来对路由进行控制。使用 HashRouter，路由会默认有个#。  否则 props 无 props及history路由这些值*/}
        <HashRouter >
            {/* <h1>react+ts路由-demo文件入口</h1> */}
            {/* <ReactTsRouter /> */}
            <IndexRouter/>
        </HashRouter> 
    )
}
