import React, { useEffect, useState } from 'react'
import TabBar from './Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5'
// mobx-react 在函数组件中使用 需要自己 导入 创建 声明好的 mobx  类组件不需要高阶级组件会传到类组件的属性props中
import Store from  './mobx/store'
import '../css/app.css'
/*

    mobx-react  - 安装介绍 @5 指定版本
    //  基于 mobx的核心库 需要 和 mobx是同一个版本
    安装： npm install --save mobx-react@5

    mobx-react 与 mobx 区别

    mobx ： 需要自己 订阅 和 取消订阅

    mobx-react ： 不用自己订阅 和 取消订阅
    构建一个 父组件-高阶级组件（mobx-react提供的）
*/
/*
    导入 mobx-react

    Provider   mobx-react提供的高阶级组件（供应商组件）

    inject 函数 帮助获取 store 值 传入Provider上绑定的属性 store={store} 字符串 
*/
import {autorun} from 'mobx'

import { inject ,observer,Observer} from "mobx-react"

// mobx-react在-类组件中写法  inject ,observer
/*
    1. 在根组件外包上 <Provider  store={store}><App />/Provider>

    2. inject 注入 Provider上绑定的属性 store={store} store 字符串
    // @ 装饰器语法 @表示增强的 一种特殊的语法规范 需要配置 支持装饰器语法  具体配置步骤 在  './mobx/store' 可见
    // 此处 未配置 @ 装饰器语法 浏览器无法识别 会报错
    // @inject('store')
    //inject 会将 store 直接通过 @observer 传给子组件App  子组件通过属性props.store 获取状态
    // @observer
    // 类组件写法

*/
// class App extends React.Component {
//     componentDidMount(){
//         console.log(this.props)
//     }
//     render(){
//         return(
//             <div className='app-assembly'>
//             <h1>01-Mobx-react安装介绍</h1>
//             {/* // store.subscribe 订阅  如 收到 回调 销毁底部 TabBar 组件 */}
//             <div style={{ width: '400px', border: '1px solid red' ,height: '500px',}}>
//                 {/* 导入自定义 封装的路由组件  */}
//                 <MRouter>
//                     {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
//                     {isShow && <TabBar className='footer-tabs'></TabBar>}
//                 </MRouter>
//             </div>
//         </div>
//         )
//     }
// }

// mobx-react在-函数组件中写法 - Observer
/*
    Observer会帮你继续订阅 和 取消订阅 每次监听到值时会直接回调内部的 箭头函数

    mobx-react在-函数组件中使用 函数组件就不需要组件useState声明状态了 通过自己导入Store直接Store.hiddenTabBer使用状态 Observer会监听 每次监听到值时会直接回调内部的 箭头函数

    Observer内部必须是 箭头函数的写法 如下
        <Observer>
            {
                ()=>{
                    return <div>{Store.hiddenTabBer}<div>
                }
            }
        </Observer>
*/
function App(props) {
//    
    const [isShow,setIsShow]=useState(true);
    // autorun 监听 可观察数据 Store.hiddenTabBer 发生改变时自动执行
   
    useEffect(() => {
        // console.log(Store.hiddenTabBer)
        // autorun 监听 类似订阅 需要取消订阅
    //    var unsubscribe =  autorun(()=>{
    //         setIsShow(Store.hiddenTabBer)
    //     })
     return ()=>{
    //     // 取消订阅
    //     unsubscribe();
      }
    },[])
    
    return (
        <div className='app-assembly'>
            <h1>01-Mobx-react安装介绍</h1>
            <Observer>
                {
                    ()=>{
                        {/* // store.subscribe 订阅  如 收到 回调 销毁底部 TabBar 组件 */}
                        return  <div style={{ width: '400px', border: '1px solid red' ,height: '500px',}}>
                        {/* 导入自定义 封装的路由组件  */}
                        <MRouter>
                            {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                            {Store.hiddenTabBer && <TabBar className='footer-tabs'></TabBar>}
                        </MRouter>
                    </div>
                    }
                }
            </Observer>
        </div>
    )
}
export default  App