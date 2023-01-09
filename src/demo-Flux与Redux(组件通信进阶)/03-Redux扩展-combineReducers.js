/*
    1. 安装 npm install --save redux 引入 Redux
    import { createStore } from 'redux';

    createStore用来创建一个Redux中的容器对象，它需要三个参数：reducer、preloadedState、enhancer。
    2. createStore( reducer, [preloadedState], enhancer)
    reducer 是一个函数，是state操作的整合函数，每次修改state时都会触发该函数，它的返回值会成为新的state。
    preloadedState 就是state的初始值，可以在这里指定也可以在reducer中指定。
    enhancer 增强函数用来对state的功能进行扩展，暂时先不理它

    Store.subscribe(()=>{})// 订阅state变化-state发生变化时，回调函数会自动调用
    Store.getState() 读取最新的state值 
    Store.dispatch()  视图发出 action 的唯一方法，该方法接受一个 action 对象作为参数： 通知修改state值


   Redux介绍及设计和使用的三大原则
    1： state 以单一对象存储在 store 对象中
    2：state 只读 （每次都会返回一个新的对象）
    3： 使用纯函数 reducer 执行 state 更新


    Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可
*/
import React ,{useEffect, useState} from 'react'
import TabBar from './Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5'
// 导入 创建 声明好的Redux
import Store from  './redux/combineReducers/store'
export default function Test() {
    console.log('app 中订阅',Store.getState())
    //  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().TabBarReducer 自己定义的键名TabBarReducer 才能获取到管理该reducer的状态
    const [isShow,setIsShow]=useState(Store.getState().TabBerReducer.hiddenTabBer);
    const [CityName,setCityName]=useState(Store.getState().CityReducer.CityName);
    useEffect(()=>{
    // subscribe 订阅 - 每次订阅完之后会返回一个函数 这个函数就是取消订阅的唯一函数，通过var unsubscribe 一个变量接收这个 返回的取消函数  名称可任意命名 如：var unsubscribe = newStore.subscribe(()=>{})
    var unsubscribe = Store.subscribe(()=>{
        // Store 中state发生变化时触发
            console.log('state变化了',  Store.getState().TabBerReducer.hiddenTabBer)
            setIsShow(Store.getState().TabBerReducer.hiddenTabBer);

         //  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态 
         setCityName(Store.getState().CityReducer.CityName)
    })
     // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
     return ()=>{
        // 取消订阅
        unsubscribe();
      }
    },[])
    return (
        <div className='app-assembly'>
            <h1>03-Redux扩展-combineReducers</h1>
            <div style={{ width: '400px', border: '1px solid red' ,height: '500px',}}>
                
                {/* 导入自定义 封装的路由组件  */}
                <MRouter>
                {/* */}
                <h4>地区-{CityName}</h4>
                    {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                    {isShow && <TabBar className='footer-tabs'></TabBar>}
                </MRouter>
            </div>
        </div>
    )
}
