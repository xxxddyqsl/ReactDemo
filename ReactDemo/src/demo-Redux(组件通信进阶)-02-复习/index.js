import React, { useEffect, useState } from 'react'
import MRouter from './routers'
// react-redux 库  Provider 供应商组件    connect 函数生成一个父组件(高阶级组件) 语法： connect()(Test) 此时 Test 已经是 connect 的孩子组件
import {Provider,connect} from "react-redux"

// 导入封装的 公共处理状态 函数 入口文件
import  Store from './redux/store'
import TabBer from './Component/TabBer'
import Header from './Component/header'
 function Index(props) {
    // console.log('index=>',Store.getState().HeaderReducer)
    // Store.getState() 读取最新的state值  通过Store.getState().TabBarReducer 自己定义的键名TabBarReducer 才能获取到管理该reducer的状态
    const [isShow,setIsShow]=useState(Store.getState().TabBerReducer.isShow);
    const [headerSlot,setHeaderSlot]=useState(Store.getState().HeaderReducer);
    const [CityName,setCityName]=useState(Store.getState().CityReducer);
   
    useEffect(()=>{
        // 初始化 通过 subscribe 订阅 - 每次订阅完之后会返回一个函数 - 获取状态
        const unsubscribe = Store.subscribe(()=>{
             // Store 中 state 发生变化时触发
            setIsShow(Store.getState().TabBerReducer.isShow);
            setHeaderSlot(Store.getState().HeaderReducer);
            setCityName(Store.getState().CityReducer)
            // console.log('state变化了',  headerSlot);
        })
         // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
     return ()=>{
        // 取消订阅
        unsubscribe();
      }
    },[])
    return (
        <div className='app-assembly'>
            
            <h1>react-组件通信Redux-复习</h1>
            <div style={{ width: '400px', border: '1px solid red', height: '500px', }}>
                <MRouter>
                    
                    {/* Header 内具名插槽 - 使用索引并不正确 */}
                    {<Header CityName={CityName} leftSlot={headerSlot.leftSlot} centerSlot={headerSlot.centerSlot} rightSlot={headerSlot.rightSlot}> </Header>}
                    {/* isShow - 公共状态 插槽  插入 底部导航栏组件 */}
                    {isShow && <TabBer className='footer-tabs'></TabBer>}
                </MRouter>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    console.log('app根组件-start',state)
    return {
        a:'测试A-connect函数将app根组件包装成高阶级组件',
        b:"测试B-connect函数将app根组件包装成高阶级组件",
    }
};
// 
const Expr= connect(mapStateToProps)(Index)
function App(){
    return (
         // Provider 供应商组件 必须接收一个 store属性（必写） 花括号{}内的store 来自 自己封装导出的 store.js Redux核心库
        <Provider store={Store}>
            <Expr></Expr>
        </Provider>
    )
}
export default App