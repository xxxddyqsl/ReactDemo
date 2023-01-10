import React, { Component } from 'react'
import styles from './tabBar.module.css'
// 导入路由 声明式导航-NavLink
import { NavLink } from 'react-router-dom'
/*
    NavLink 会匹配到的to='/films' 自动给当前路由下的a标签增加或者删除 class='active' 选中的默认class样式名
    通过 activeClassName 属性 可自定义 class名 如   <NavLink activeClassName='active_demo' to='/films'>电影</NavLink>
*/
const TabBar = (props) => {
    return (
        <ul className={props.className} style={{ justifyContent: 'space-between' }}>
            <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
                <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/films'>电影</NavLink>
            </li>
            <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
                <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/cinemas'>影院</NavLink>
            </li>
            <li className={'footer-tabs-btn '} style={{ flex: '1', textAlign: 'center' ,padding: '0',}}>
                <NavLink  style={{ flex: '1', textAlign: 'center' ,textDecoration:'none',display:'block' ,padding: '4px',}} activeClassName='active_demo' to='/center'>我的</NavLink>
            </li>
        </ul>
    )
}
export default TabBar