import React ,{useEffect, useState} from 'react'
import TabBar from './Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5'
// 导入 创建 声明好的Redux
import Store from  './redux/store+redux原理解析'
export default function Test() {
    //  Store.getState() 读取最新的state值  通过Store.getState().hiddenTabBer
    const [isShow,setIsShow]=useState(Store.getState().hiddenTabBer);
   
    useEffect(() => {
     console.log('app 中订阅-销毁',Store.getState())
     // subscribe 订阅 - 每次订阅完之后会返回一个函数 这个函数就是取消订阅的唯一函数，通过var unsubscribe 一个变量接收这个 返回的取消函数  名称可任意命名 如：var unsubscribe = newStore.subscribe(()=>{})
     var unsubscribe = Store.subscribe(()=>{
        // Store 中state发生变化时触发 
            console.log('app 中订阅',Store.getState())
            setIsShow(Store.getState().hiddenTabBer)
    })
     // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
     return ()=>{
        // 取消订阅
        unsubscribe();
      }
    },[])
    
    return (
        <div className='app-assembly'>
            <h1>02-Redux案例</h1>
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
