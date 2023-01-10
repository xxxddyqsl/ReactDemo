import React ,{useEffect, useState} from 'react'
import TabBar from './Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5'
// 导入 创建 声明好的 mobx
import Store from  './mobx/store'
import '../css/app.css'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听 类似订阅 需要取消订阅

    action,runInAction和严格模式（configure）

    configure({
        never 不使用严格模式
        always 开启严格模式 ， 开启严格模式后必须在 action 中修改 observable 转换成可观察的数据
        enforceActions:"always"
    })
*/
import {autorun} from 'mobx'
export default function App() {
   
    const [isShow,setIsShow]=useState(true);
    // autorun 监听 可观察数据 Store.hiddenTabBer 发生改变时自动执行
   
    useEffect(() => {
        console.log(Store)
        // autorun 监听 类似订阅 需要取消订阅
       var unsubscribe =  autorun(()=>{
            setIsShow(Store.hiddenTabBer)
        })
     return ()=>{
        // 取消订阅
        unsubscribe();
      }
    },[])
    
    return (
        <div className='app-assembly'>
            <h1>03-Mobx-替代redux案例</h1>
            {/* // store.subscribe 订阅  如 收到 回调 销毁底部 TabBar 组件 */}
            <div style={{ width: '400px', border: '1px solid red' ,height: '500px',}}>
                {/* 导入自定义 封装的路由组件  */}
                <MRouter>
                    {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                    {isShow && <TabBar className='footer-tabs'></TabBar>}
                </MRouter>
            </div>
        </div>
    )
}
