import React, { useState, useEffect } from 'react'
import styles from './Films.module.css'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

import Nowplaying from './nowplaying'
import Comingsoon from './comingsoon'

// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { Swiper, Toast,Tabs } from 'antd-mobile'
import axios from 'axios'
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
        <div
            className={styles.content}
            style={{ background: color, height: '130px' }}
            onClick={() => {
                Toast.show(`你点击了卡片 ${index + 1}`)
            }}
        >
            {index + 1}
        </div>
    </Swiper.Item>
))
export default function Films(props) {
    const [type, setType] = useState(0);
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        console.log(props)
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"163954165652311270166529","bc":"110100"}',
                'X-Host': 'mall.cfg.common-banner'
            },
            params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 7398342 }
        }).then((res) => {
            console.log(res.data)
            if (res.data && res.data.status === 0) {

                setBanners(res.data.data)
            }
        }).catch(err => console.log(err))
        // 传入空数组 不依赖任何状态 只执行一次
    }, [])
    return (
        <div className={'gg-flex-3 gg-flex-2 ' + styles.warper}>
            {console.log('Films==更新', type)}
            {/*  轮播图组件 autoplay是否自动切换默认false  autoplayInterval自动切换的间隔，单位为 ms 默认5ms， loop是否循环默认false  */}
            <Swiper autoplay={true} loop={true} >
                {
                    banners.map((item, index) => {
                        return (
                            <Swiper.Item key={item.bannerId} >
                                <img src={item.imgUrl} alt={item.name} style={{ width: '100%' }} onClick={() => {
                                    Toast.show(`你点击了卡片 ${item.name}`)
                                }}></img>
                            </Swiper.Item>
                        )
                    })
                }
            </Swiper>
            {/* <div className={styles.banner}>
                轮播图
            </div> */}
            {/* <ul className='gg-flex-3 tab' style={{ width: '100%', justifyContent: 'space-between' }}>
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
            </ul> */}
            {/* position:'sticky' 粘性定位 距离顶部0px时 吸顶 */}
            <div style={{ width: '100%',position:'sticky',top:0,background:'#fff',zIndex:1,}}>
                {/* activeKey-当前激活Tabs面板的key对应Tabs.Tab 组件上的key相同的key 则显示选中状态   props.location.pathname 获取当前匹配的路由路径*/}
                <Tabs style={{ }} activeKey={props.location.pathname} onChange={(value)=>{
                    // value 就是 Tabs.Tab 组件上的key
                    console.log(value)
                    // 路由 跳转
                    props.history.push(value)
                }}>
                    <Tabs.Tab title='正在热映' key='/films/nowplaying'> </Tabs.Tab>
                    <Tabs.Tab title='即将上映' key='/films/comingsoon'></Tabs.Tab>
                </Tabs>

            </div>
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
