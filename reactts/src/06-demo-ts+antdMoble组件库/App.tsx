import React, { useEffect, useState } from 'react'
// import ReactTsRouter from './01-安装路由'
// ts路由
import IndexRouter from './router'
// axios 请求拦截 公共显示隐藏正在加载
import '../utils/request'
// 导入 创建 声明好的Redux
import Store from './redux/store'
import Styles from './views/Style.module.css'
import { withRouter, useHistory, RouteComponentProps, HashRouter } from 'react-router-dom'
// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { TabBar, Badge  } from 'antd-mobile'
/*
    NavLink 会匹配到的to='/films' 自动给当前路由下的a标签增加或者删除 class='active' 选中的默认class样式名
    通过 activeClassName 属性 可自定义 class名 如   <NavLink activeClassName='active_demo' to='/films'>电影</NavLink>
*/
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
  } from 'antd-mobile-icons'
function App(props:any) {
    const [isShow, setIsShow] = useState(Store.getState().isShow)
    const history = useHistory(); console.log(history,props)
    useEffect(() => {


        // 订阅 - 收到状态更新自动调用 订阅
        var unsubscribe = Store.subscribe(() => {
            console.log(Store.getState())
            // 更新状态 
            setIsShow(Store.getState().isShow)
        })
        return () => {
            // 取消订阅
            unsubscribe()
        }
    }, [])

    return (
        <div >
             {/* 最外层 HashRouter 是通过 hash 值来对路由进行控制。使用 HashRouter，路由会默认有个#。  否则 props 无 props及history路由这些值*/}
            <HashRouter>
                {/* <h1>react+ts路由-demo文件入口</h1> */}
                {/* <ReactTsRouter /> */}
                <IndexRouter>
                    {/* {isShow && <ul className={Styles.tabBar + ' gg-flex-1'}>
                        <li>电影</li><li  >影院</li><li  >我的</li>
                    </ul>} */}
                    {isShow && <NewTest></NewTest>}
                </IndexRouter>
            </HashRouter>
        </div>
    )
}
const NewTest=withRouter(Test)
const tabs = [
    {
      key: '/films',
      title: '电影',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/cinema',
      title: '影院',
      icon: <UnorderedListOutline />,
      badge: '5',
    }, 
    {
      key: '/center',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
function Test (props:RouteComponentProps) {
    // 方式1 字符串匹配 返回一级路由 匹配TabBar的activeKey属性 选中状态
    // const pathname = props.location.pathname.indexOf('/films')>=0?'/films': props.location.pathname.indexOf('/cinemas')>=0?'/cinemas': props.location.pathname.indexOf('/center')>=0?'/center':'';
    // 方式2 字符串截取 + 拼接 / 返回一级路由 匹配TabBar的activeKey属性 选中状态
    const pathname = "/"+props.location.pathname.split('/')[1];

    const setRouteActive = (value:any) => {
        props.history.push(value)
      }
    return (
        <>
        {/* activeKey-当前激活Tabs面板的key对应Tabs.Tab 组件上的key相同的key 则显示选中状态   props.location.pathname 获取当前匹配的路由路径*/}
        <TabBar  className={Styles.tabBar } activeKey={pathname} onChange={value=>setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
        </>
        // <ul className={props.className} style={{ justifyContent: 'space-between' }}>
        //     <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
        //         <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/films'>电影</NavLink>
        //     </li>
        //     <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
        //         <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/cinemas'>影院</NavLink>
        //     </li>
        //     <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
        //         <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/center'>我的</NavLink>
        //     </li>
        // </ul>
    )
}

export default App

