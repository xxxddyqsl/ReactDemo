import React, { useEffect, useState } from 'react'
// import ReactTsRouter from './01-安装路由'
// ts路由
import IndexRouter from './router'
// axios 请求拦截 公共显示隐藏正在加载
import  '../utils/request'
// 导入 创建 声明好的Redux
import Store from  './redux/store'
import Styles from './views/Style.module.css'
// 导入 antd-mobile 移动端组件库
import {TabBar} from 'antd-mobile'
export default function App() {
    const [isShow,setIsShow] = useState(Store.getState().isShow)
    useEffect(()=>{
        // 订阅 - 收到状态更新自动调用 订阅
        var unsubscribe = Store.subscribe(()=>{
            console.log(Store.getState())
            // 更新状态 
            setIsShow(Store.getState().isShow)
        })
        return ()=>{
            // 取消订阅
            unsubscribe()
        }
    },[])
     
    return (
        <div >
            {/* <h1>react+ts路由-demo文件入口</h1> */}
            {/* <ReactTsRouter /> */}
            <IndexRouter/>
            {isShow&&<ul className={Styles.tabBar+' gg-flex-1'}>
                        <li>电影</li><li  >影院</li><li  >我的</li>
                    </ul>}
                    
        </div>
    )
}
