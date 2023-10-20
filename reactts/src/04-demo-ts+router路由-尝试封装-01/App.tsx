import React from 'react'
// 路由文件配置数据
import RouterConfig from './routers/config'
import MyRouter from './routers'
import { BrowserRouter, } from 'react-router-dom'
export default function App() {
  return (
    <>
     <BrowserRouter >
        <MyRouter  RouterConfig={RouterConfig}></MyRouter>
        {/* <MyRouter ></MyRouter> */}
      </BrowserRouter>
     
    </>
  )
}
