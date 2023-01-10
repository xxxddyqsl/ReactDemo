import React, { Component } from 'react'
// 导入路由 
import {HashRouter,Route} from 'react-router-dom'

import Films from './views/Films'
import Cinemas from './views/Cinemas'
import Center from './views/Center'
/*
    1：什么是路由 
    路由是根据不同的 url 地址 展示不同的内容页面
    一个针对React而设计的路由解决方案，可以友好的帮你解决 React components 到 url 之间的同步映射关系

    路由安装 - 指定版本为 v5
    npm install --save react-router-dom@5

    HashRouter 是通过 hash 值来对路由进行控制。使用 HashRouter，路由会默认有个#。
    Route：路由，path属性表示路径，element属性表示路由到的内容，里面可以是组件也可以嵌套多个js标签。

    通过 http://localhost:3000/#/cinemas 展示对应路由的页面
    一级路由 ： http://localhost:3000/#/cinemas 
    多级路由： http://localhost:3000/#/cinemas/a
    只要匹配 <Route path='/films' component={Films}></Route> 中的 path 写的路径就可以展示对应的内容 如 path='/center/a'通过 http://localhost:3000/#/center/a

*/
export default class Test extends Component {
    render() {
        return (
            <div className='app-assembly'>
                <h1>01-route-路由版本 v5 介绍</h1>
                <HashRouter>
                    {/* path URL地址中输入的路径 可以任意命名   */}
                    <Route path='/films' component={Films}></Route>
                    <Route path='/cinemas' component={Cinemas}></Route>
                    <Route path={'/center/a'} component={Center}></Route>
                </HashRouter>
            </div>
        )
    }
}
