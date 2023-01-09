import React from 'react'
// 导入路由 
import { BrowserRouter, HashRouter, Route, Redirect, Switch,withRouter } from 'react-router-dom'

// 导入 展示的组件
import Films from '../views/Films'
import Cinemas from '../views/Cinemas'
import Center from '../views/Center'
// 导入 展示的404组件
import NotFound from '../views/NotFound'
// 导入 展示的详情页
import Detail from '../views/Detail'
import Login from '../views/Login'

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
/*
    1：什么是路由 默认path="/films" 都是模糊匹配
    路由是根据不同的 url 地址 展示不同的内容页面
    一个针对React而设计的路由解决方案，可以友好的帮你解决 React components 到 url 之间的同步映射关系

    路由安装 - 指定版本为 v5
    npm install --save react-router-dom@5

    HashRouter：
        是通过 hash 值来对路由进行控制。使用 HashRouter，路由会默认有个#。
    Route：
        路由，path属性表示路径，component属性表示路由到的内容，里面可以是组件也可以嵌套多个js标签。并且通过 component 加载组件 会当成子组件 默认传入了 props
        如果 Route 通过 render属性（ 内部是函数 ）路由拦截 加载的组件 如（<Center/>）不会被当成子组件 默认 props 属性是没有 值的 需要通过 手动传入 如下：
         <Route
        点击我的页面 Route 路由匹配到path属性内的路径 '/center'
        path={'/center'}
        render属性执行函数 进行 路由拦截 判断是否有登录 登录过进入Center我的页面 没有登录过进入 login登录页
        render={
            // render属性内函数的默认参数 props
            (props)=>{
            // 此时加载的 <Center/>不会被当成子组件 所以 <Center/>组件内的props是空对象 手动绑定默认参数 props 通过es6 （ {...props} ）展开默认参数 props 赋值给<Center/>组件内的props
             return 是否授权或登录 ? <Center {...props}/> :<Login/>
            }
        }>
        </Route>

    Redirect:
        路由重定向 在url内的路径 和 Route 中path属性的路径 都不匹配的情况下执行 Redirect 路由重定向
        from 属性  从哪里开始 例： from='/' 传入/ 或者from=''不写传空就是从根路径开始  to 自动到在 url #号后补上/films 路径 如默认http://localhost:3000/#/ 自动变成http://localhost:3000/#/films
        缺陷：from='/' 传入 / 为模糊查询 如 url 地址 输入  http://localhost:3000/#/cinemas/ 刷新 此时会匹配到 #号后的 / 并且进行路由重定向的地址 to属性 传入的地址
        解决方案： 使用<Switch> </Switch> 如下

    Switch：
        只渲染 匹配到的第一个 所以当 url地址输入http://localhost:3000/#/cinemas/ 匹配到/cinemas 后 刷新页面 就跳出了   不会在执行到Redirect


    通过 http://localhost:3000/#/cinemas 展示对应路由的页面
    一级路由 ： http://localhost:3000/#/cinemas
    多级路由： http://localhost:3000/#/cinemas/a
    只要匹配 <Route path='/films' component={Films}></Route> 中的 path 写的路径就可以展示对应的内容 如 path='/center/a'通过 http://localhost:3000/#/center/a

    将路由-封装成路由组件

*/
/*
1.params参数
            路由链接(携带参数)：<Link to='/detail/18'}>详情</Link>
            注册路由(声明接收)：<Route path="/detail/:name/:age" component={Test}/>
            接收参数：this.props.match.params - 刷新后参数消失
2.query 参数
            路由链接(携带参数)：<Link to={{pathname:'/detail',query:{name:'tom',age:18}}}>详情</Link>
            注册路由(声明接收)：<Route path={'/detail'} component={Detail}></Route>
            接收参数：this.props.location.query - 刷新后参数消失

3.state参数
            路由链接(携带参数)：<Link to={{pathname:'/detail',state:{name:'tom',age:18}}}>详情</Link>
            注册路由(无需声明，正常注册即可)：<Route path="/detail" component={Test}/>
            接收参数：this.props.location.state
            备注：刷新也可以保留住参数 (注意 外层需要嵌套 <BrowserRouter> </BrowserRouter>)
*/

/*
    BrowserRouter 和 HashRouter 的区别
        它们的底层实现原理不一样
        对于 BrowserRouter 来说它使用的是 React 为它封装的 history API ，这里的 history 和浏览器中的 history 有所不同噢！通过操作这些 API 来实现路由的保存等操作，但是这些 API 是 H5 中提出的，因此不兼容 IE9 以下版本。

        对于 HashRouter 而言，它实现的原理是通过 URL 的哈希值，但是这句话我不是很理解，用一个简单的解释就是

        我们可以理解为是锚点跳转，因为锚点跳转会保存历史记录，从而让 HashRouter 有了相关的前进后退操作，HashRouter 不会将 # 符号后面的内容请求。兼容性更好！

        地址栏的表现形式不一样

        HashRouter 的路径中包含 # ，例如 localhost:3000/#/demo/test
        刷新后路由 state 参数改变

        在 BrowserRouter 中，state 保存在history 对象中，刷新不会丢失 注意 BrowserRouter 是真正向后端 发送请求要页面 后端没有对应的路径处理逻辑 就会404
        HashRouter 则刷新会丢失 state
*/


export default function indexRouter(props) {
    return (
        <div>
            {/* BrowserRouter   路由中没有# 如localhost:3000/films/nowplaying/ state 参数刷新不会丢失 是真正向后端 发送请求要页面 后端没有对应的路径处理逻辑 就会404
                HashRouter 路由会默认有个# 如localhost:3000/#/films/nowplaying/  state 参数刷新会丢失
             */}
            {/* <BrowserRouter> */}
            <HashRouter>
                <Switch>
                    {/*
                    path 属性 匹配URL地址中#号后的路径 可以任意命名
                    Route 路由 默认 都是模糊匹配
                    如url地址为 ：url http://localhost:3000/#/films/nowplaying/

                    <Route path='/films' component={Films}></Route>
                    <Route path='/films/nowplaying' component={Films}></Route>

                    上面有2个路由 path 分别为 '/films' 和 '/films/dom' 此时 path='/films'的路由和#号后的 /films/nowplaying/ 可以模糊匹配 上
                    所以   <Route path='/films' component={Films}></Route> 模糊匹配 条件满足 执行该路由 并且Switch跳出

                */}
                    <Route path='/films' component={Films}></Route>
                    <Route path='/cinemas' component={Cinemas}></Route>
                    {/* <Route path={'/center/a'} component={Center}></Route> */}


                    {/* <Route path={'/center'} component={Center}></Route> */}
                    {/*
                   Route  绑定render 路由拦截 - 进入我的页面 校验是否登录 未登录 跳转到登录页

                    方式1: 通过render 回调函数内的props 手动给 <Center/>  组件传入 props 及props内的history路由这些值
                        绑定render 属性里面是一个函数 必须有返回值 但是此时通过 render 函数 加载的组件 并没有将<Center/>组件 当成子组件 props 会丢失 需要通过 
                        render 函数有一个参 props 手动绑定传入 要加载的组件上 如（ <Center {...props} /> 通过es6语法 {...props} 展开参数props 传入 ） 否则 <Center/>组件内部 打印props 没有值返回空对象


                    方式2：通过 withRouter 可以帮助跨级 传输  props及history路由这些值
                        此时 <Center/>  组件内的 props 是个空对象并且没有 history路由的信息 在 <Center/> 组件内导出时 通过 withRouter(FilmItem)
                        此时 withRouter 会在 Center 外包装一层 并且提供 props及history路由的信息
                */}
                    <Route path={'/center'} render={(props) => {
                        // return 是否授权或登录?<Center/> :<Redirect to={'/login'} />
                        // 授权或登录 进入我的页面  没有 则  使用<Redirect to={'/login'}/> Redirect路由重定向到登录页

                        // 方式1: 通过render 回调函数内的props 手动给 <Center/>  组件传入 props 及props内的history路由这些值
                        // return isAuth() ? <Center {...props} /> : <Redirect to={'/login'} />

                        // 方式2： 在 <Center/> 组件内导出时 通过 withRouter(center)导出   withRouter 可以帮助跨级 传输  props及history路由这些值
                        return isAuth() ? <Center/> : <Redirect to={'/login'} />
                    }}></Route>
                    <Route path={'/login'} component={Login}></Route>
                    {/* /detail/:myid动态路由格式 :myid 占位符 :冒号固定写法表示模糊的一个值 （myid传入的参数 如id） 如传入的 路径为/detail/88912 这个为动态路由 打印 props 可接收获取的传入的参数 如果不是动态路由的格式没有占位符 props.match.params 内参数会是空的    */}
                    {/* 路由传参方式1：   params参数 - /detail/:myid 动态路由传参 */}
                    {/* <Route path={'/detail/:myid'} component={Detail}></Route> */}

                    {/*路由传参方式2： query 参数  如 props.history.push({pathname:'/detail', query:{myid:item.filmId}});   接收参数：this.props.location.query */}
                    {/* <Route path={'/detail'} component={Detail}></Route> */}

                    {/*路由传参方式3： state  参数  如 props.history.push({pathname:'/detail', state:{myid:item.filmId}});   接收参数：this.props.location.state */}
                    <Route path={'/detail'} component={Detail}></Route>

                    {/*
                    模糊匹配 - 外部还需要 嵌套 <Switch></Switch> 配合使用
                    Redirect路由重定向 from='/' 进行 万能匹配（模糊匹配）
                    from 属性  从哪里开始 例： from='/' 或者 不写传空就是从根路径开始  to 自动到在 url #号后补上/films 路径
                    模糊匹配-缺陷-1：from='/' 传入 / 为模糊查询 如 url 地址 输入  http://localhost:3000/#/cinemas/ 刷新 此时会匹配到 #号后的 / 并且进行路由重定向的地址 to属性 传入的地址，url地址的http://localhost:3000/#/films
                    解决方案 使用<Switch></Switch>

                    模糊匹配-缺陷-2 如此时 url 输入 http://localhost:3000/#/aaaa from='/' 进行了万能匹配（模糊匹配）会匹配到 #号后的 / 还是会进行路由重定向的地址 to属性 传入的地址，url地址的http://localhost:3000/#/films
                    解决方案 <Redirect exact/>绑上 exact 属性 模糊匹配 变成 精确匹配 必须是只有 / 时触发进行 Redirect路由重定向 如 http://localhost:3000/#/
                */}
                    {/* <Redirect from='/' to={'/films'} /> */}

                    {/*
                    Redirect路由重定向

                    精确匹配- 外部还需要 嵌套 <Switch></Switch> 配合使用
                        使用 exact属性 将Redirect 的from='/'  声明为精确匹配 必须是只有 / 时触发进行 Redirect路由重定向
                        如此时 url 输入 http://localhost:3000/#/aaaa 就可以
                */}
                    <Redirect from='/' to={'/films'} exact />

                    {/*
                    - 外部还需要 嵌套 <Switch></Switch> 配合使用
                    Route 路由不写 path属性 就是任何时候都满足显示 前提是前面的 3个Route 路由 和 Redirect路由重定向 都不匹配时才能执行到此处的 路由 显示自定义的404组件
                    否则 会匹配 弹出 执行 不到此处
                */}
                    <Route component={NotFound}></Route>
                </Switch>
                {/*
                        通过-插槽 props.children 将TabBar组件 插入 路由组件内 MRouter 显示的位置
                        因为 声明式导航 <NavLink></NavLink> 必须写在<HashRouter></HashRouter>内 如<HashRouter> <NavLink to='/films'></NavLink></HashRouter> 
                    */}
                {props.children}
            </HashRouter>
            {/* </BrowserRouter> */}
        </div>
    )
}