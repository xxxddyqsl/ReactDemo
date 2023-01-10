import React from 'react'
// 导入路由 
import { BrowserRouter, HashRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom'

import Films from '../views/Films/Films'
import Cinemas from '../views/Cinemas/Cinemas'
import Center from '../views/Center/Center'

// 导入 展示的404组件
import NotFound from '../views/NotFound/NotFound'
// 导入 展示的详情页
import Detail from '../views/Detail/Detail'
import Login from '../views/Login/Login'
// 导入 城市切换页
import City from '../views/City/City'
// 导入 搜索页
import Search from '../views/Search/Search'
// 模拟 获取token 是否登录 或者 授权
const isAuth = function isAuth() {
    let token = localStorage.getItem('token');
    let is = false;
    if (token) {
        is = true;
    } else {
        is = false;
    }
    return is;
}
export default function indexRouterV5(props) {
    return (
        <div className='gg-flex-3 gg-flex-2' style={{height:'100%'}}>
            <HashRouter>
                <Switch>
                    <Route path={'/films'} component={Films}></Route>
                    {/* 需要加上 exact 精准匹配 否则 模糊匹配 会先匹配上 /Cinemas 进入影院 并且 触发switch 跳出  下方的 '/cinemas/search' 则匹配不到 */}
                    <Route path={'/Cinemas'} component={Cinemas} exact></Route>
                    <Route path={'/cinemas/search'} component={Search} ></Route>
                    <Route path={'/Center'} render={(props)=>{
                        // 当前路由为 我的页面 校验是否登录 此方式加载展示的 <Center/>组件 不为子组件 无props.history 路由这些值 ，没有登录 Redirect 路由重定向进入登录页
                        // 方式1 手动传入props参数
                        // return isAuth()?<Center {...props}/>:<Login/>
                        // 方式2 <Center/> 组件内导出时 通过 withRouter(center)导出   withRouter 可以帮助跨级 传输  props及history路由这些值
                        return isAuth()?<Center {...props}/>:<Redirect to={'/login'}/>
                    }}></Route>
                    <Route path={'/login'} component={Login}></Route>
                    {/* /detail/:myid动态路由格式 :myid 占位符 :冒号固定写法表示模糊的一个值 （myid传入的参数 如id） 如传入的 路径为/detail/88912 这个为动态路由 打印 props 可接收获取的传入的参数 如果不是动态路由的格式没有占位符 props.match.params 内参数会是空的    */}
                    {/* 路由传参方式1：   params参数 - /detail/:myid 动态路由传参 */}
                    <Route path={'/detail/:myid'} component={Detail}></Route>

                    {/*路由传参方式2： query 参数  如 props.history.push({pathname:'/detail', query:{myid:item.filmId}});   接收参数：this.props.location.query */}
                    {/* <Route path={'/detail'} component={Detail}></Route> */}

                    {/*路由传参方式3： state  参数  如 props.history.push({pathname:'/detail', state:{myid:item.filmId}});   接收参数：this.props.location.state */}
                    {/* <Route path={'/detail'} component={Detail}></Route> */}
                    <Route path={'/city'} component={City}></Route>
                   
                   
                     {/*  Redirect路由重定向
                     使用 exact属性 将Redirect 的from='/'  声明为精确匹配 必须是只有 / 时触发进行 Redirect路由重定向  */}
                    <Redirect from='/' to={'/films'} exact />

                </Switch>

                 {/* 通过-插槽 props.children 将TabBar组件 插入 路由组件内 MRouter 显示的位置
                        因为 声明式导航 <NavLink></NavLink> 必须写在<HashRouter></HashRouter>内 如<HashRouter> <NavLink to='/films'></NavLink></HashRouter> 
                    */}
                {props.children}
            </HashRouter>
        </div>
    )
}
