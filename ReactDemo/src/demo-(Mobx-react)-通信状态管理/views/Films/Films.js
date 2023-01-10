import React, { useState, useEffect } from 'react'
import styles from './Films.module.css'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

import Nowplaying from './nowplaying'
import Comingsoon from './comingsoon'
export default function Films(props) {
    const [type, setType] = useState(0);
    // useEffect(()=>{
    // 创建
    // console.log('create')
    //     if(props.history.location.pathname==='/films/nowplaying'){
    //         setType(0)
    //     }else{
    //         setType(1)
    //     }
    // 销毁
    //   return()=>{
    // console.log('destroy')
    // }
    //     console.log('Films==>',props.history)
    // 传入空数组 不依赖任何状态 只执行一次
    // },[])
    return (
        <div className={'gg-flex-3 gg-flex-2 '+styles.warper}>
            {console.log('Films==更新',type)}

            <div className={styles.banner}>
                轮播图
            </div>
            <ul className='gg-flex-3 tab' style={{ width: '100%', justifyContent: 'space-between' }}>
                <li className='gg-flex-1' onClick={()=>{
                      setType(0)
                }}>
                    <NavLink to={'/films/nowplaying'} activeClassName={styles.active}>正在热映</NavLink>
                </li>
                <li className='gg-flex-1' onClick={()=>{
                      setType(1)
                }}>
                    <NavLink to={'/films/comingsoon'} activeClassName={styles.active}>即将上映</NavLink>
                </li>
            </ul>

            <Switch>
                <Route path={'/films/nowplaying'} component={Nowplaying}></Route>
                <Route path={'/films/comingsoon'} component={Comingsoon}></Route>
                {/*
                  路由重定向 - 万能匹配
                  如果 url 地址 为http://localhost:3000/#/films 触发路由重定向 进入  http://localhost:3000/#/films/nowplaying/
              */}
                <Redirect from='/films' to={'/films/nowplaying'} />
            </Switch>
        </div>
    )
}
