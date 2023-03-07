import React, { Component } from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import Cinemas from '../views/Cinema/Cinema'
/*
    路由安装 - 指定版本为 v5
    npm install --save react-router-dom@5

    在第三方库安装 完成之后 导入报错 如此时的 路由 import {HashRouter} from 'react-router-dom'
    需要再次安装一下 声明文件 否则 React+ts的模板 无法找到 安装的第三方库react-router-dom
    安装 路由声明文件如下 加上 @types/在之前的命令前面 如下命令
    npm i --save-dev @types/react-router-dom@5

    HashRouter 是通过 hash 值来对路由进行控制。使用 HashRouter，路由会默认有个#。

    Switch 条件满足 执行该路由 并且Switch跳出

    Route  路由，path属性表示路径，component属性表示路由到的内容，里面可以是组件也可以嵌套多个js标签。并且通过 component 加载组件 会当成子组件 默认传入了 props
*/
import Films from '../views/Films/Films'
import Cinema from '../views/Cinema/Cinema'
import Center from '../views/Center/Center'
import Detail from '../views/Detail/Detail'
import NotFound from '../views/NotFound/NotFound'
export default class IndexRouter extends Component {
  render() {
    return (
        <Switch>
            <Route path='/films' component={Films}></Route>
            <Route path='/cinema' component={Cinema}></Route>
            <Route path='/center' component={Center}></Route>
            <Route path='/detail/:myid' component={Detail}></Route>
            {/* Redirect路由重定向   exact 精确匹配 需配合Switch使用 将Redirect 的from='/'  声明为精确匹配 必须是只有 / 时触发进行 Redirect路由重定向*/}
            <Redirect from='/' to={'/films'} exact />
            {/*  Route 路由匹配不到  path属性    前面的 3个Route 路由 和 Redirect路由重定向 都不匹配时才能执行到此处的 路由 显示自定义的404组件 */}
            <Route component={NotFound}></Route>
        </Switch>
    )
  }
}
