import React, { useState, useEffect } from 'react'
import styles from './Films.module.css'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
  // 导入 自己基于swiper插件二次封装的 轮播
import KSwiper, { SwiperItem } from '../../../encapsulation/轮播图'

import Nowplaying from './nowplaying'
import Comingsoon from './comingsoon'

const colors=  ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
export default function Index(props) {
  const [type, setType] = useState(0)
  return (
    <div className={'gg-flex-3 gg-flex-2 ' + styles.warper}>
      {console.log('Films==更新', type)}

      <div className={styles.banner}>
        {/* 轮播图 */}
        {/* loop 控制 swiper 插件 是否循环播放 */}
        <KSwiper loop={true}>
          {
            colors.map((color, index) => {
              console.log(index)

              return (
                <SwiperItem key={index}>
                  {/* //通过插槽 封装 可任意定义 轮播图片 或者 文字 */}
                  {/* <img src={item.imgUrl} style={ {width:'100%',height:'auto'} } alt={item.name} title={item.name}></img> */}
                  <div style={{ background: color, height: '130px' }} onClick={() => {
                    console.log(index)
                  }} >
                    {index + 1}
                  </div>
                </SwiperItem>
              )
            })
          }
        </KSwiper>
      </div>

      <ul className='gg-flex-3 tab' style={{ width: '100%', justifyContent: 'space-between' }}>
        <li className='gg-flex-1' onClick={() => {
          setType(0)
        }}>
          <NavLink to={'/films/nowplaying'} activeClassName={styles.active}>正在热映</NavLink>
        </li>
        <li className='gg-flex-1' onClick={() => {
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
