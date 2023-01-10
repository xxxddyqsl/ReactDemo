import React, { useState } from 'react'
import TabBar from './components/TabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5' 
export default function Test() {
    const [Check,setCheck] = useState('films')
    const [Tabs,setTabs] = useState( [
        { id: 'films', mytext: '电影',path:'/films' },
        { id: 'cinema', mytext: '影院',path:'/cinema' },
        { id: 'center', mytext: '我的',path:'/center' }
    ])
    return (
        <div className='app-assembly'>
            <h1>03-route-声明式导航与编程式导航</h1>
           <div style={{width:'400px',border:'1px solid red'}}>
                {/* 导入自定义 封装的路由组件  */}
            <MRouter>
                {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                <TabBar className='footer-tabs'/>
            </MRouter>
           
           </div>
        </div>
    )
}
