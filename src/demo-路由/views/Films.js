import React, { useEffect, useState, useMemo } from 'react'
// 导入 自己基于swiper插件二次封装的 轮播
import KSwiper, { SwiperItem } from '../../encapsulation/轮播图'
import axios from 'axios'

// 导入路由 
import { HashRouter, Route, Redirect, Switch, NavLink } from 'react-router-dom'

// 导入 嵌套的路由 - 显示的组件
import Nowplaying from './films/Nowplaying'
import Comingsoon from './films/Comingsoon'

/*
    编程式路由导航
        借助this.prosp.history对象上的API对操作路由跳转、前进、后退
        -this.prosp.history.push()
        -this.prosp.history.replace()
        -this.prosp.history.goBack()
        -this.prosp.history.goForward()
        -this.prosp.history.go(1)

        //push跳转+携带params参数
        // this.props.history.push(`/films/nowplaying/${id}/${title}`)

        //push跳转+携带search参数
        // this.props.history.push(`/films/nowplaying?id=${id}&title=${title}`)

        //push跳转+携带state参数
        this.props.history.push(`/films/nowplaying`,{id,title})

        //replace跳转+携带params参数
        //this.props.history.replace(`/films/nowplaying/${id}/${title}`)

        //replace跳转+携带search参数
        // this.props.history.replace(`/films/nowplaying?id=${id}&title=${title}`)

        //replace跳转+携带state参数
        this.props.history.replace(`/films/nowplaying`,{id,title})
*/


// 自定义 hooks - 获取轮播图数据
function useBannerList() {
    const [BannerList, setBannerList] = useState([]);
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'GET',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"163954165652311270166529","bc":"110100"}',
                'X-Host': 'mall.cfg.common-banner'
            },
            params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 7398342 }
        }).then(res => {
            if (res.data.status === 0) {
                // 更新 状态值 调整react 更新dom
                setBannerList(res.data.data)
            }
            // console.log(res)
        }).catch(err => {
            // console.log(err)
        })
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, [])
    // 返回获取到的列表数据
    // 必须return 返回一个对象 通过es6 结构的方式取出 如 const { CinemaList } = useCinemaList();
    return {
        BannerList
    }
}

export default function Films(props) {
    // 自定义 hooks - 轮播图
    const { BannerList } = useBannerList();
    const [type, setType] = useState(0);
    return (
        <div style={{ width: '400px', }}>

            <div>
                {/* loop 控制 swiper 插件 是否循环播放 */}
                <KSwiper loop={true}>
                    {/* 插槽 */}
                    {/* 将插入的 <div className='swiper-slide'>1111</div> 继续封装*/}
                    {/* <SwiperItem>1111</SwiperItem>
                    <SwiperItem>
                        <img src={require('../../public/favicon.ico')} style={ {width:'30px',height:'30px'} } alt='' title='插槽：复用性'></img>
                        <span>2222</span>
                    </SwiperItem>
                    <SwiperItem>333</SwiperItem> */}
                    {BannerList.map((item, index) => {
                        return (
                            <SwiperItem key={item.bannerId}>
                                {/* //通过插槽 封装 可任意定义 轮播图片 或者 文字 */}
                                <img src={item.imgUrl} style={{ width: '100%', height: 'auto' }} alt='' title={item.name}></img>
                            </SwiperItem>
                        )
                    })}
                </KSwiper>
            </div>
            <ul className='gg-flex-3' style={{ justifyContent: 'space-between' }}>
                <li onClick={() => {
                    setType(0);
                    // 编程式路由导航-push跳转
                    props.history.push('/films/nowplaying')
                }} style={{ padding: '3px 6px', backgroundColor: type === 0 ? 'teal' : '', borderRadius: '2px', border: '1px solid' }}>正在热映</li>
                <li onClick={() => { setType(1)}} style={{ padding: '3px 6px', backgroundColor: type === 1 ? 'teal' : '', borderRadius: '2px', border: '1px solid' }}>
                {/* 声明式路由导航- NavLink 跳转 */}
                    <NavLink activeClassName='ccc' to={'/films/comingsoon'}>即将上映</NavLink>
                </li>
                {/* <li onClick={() => {
                    setType(1)
                    // 编程式路由导航-replace跳转
                    props.history.replace('/films/comingsoon')
                }} style={{ padding: '3px 6px', backgroundColor: type === 1 ? 'teal' : '', borderRadius: '2px', border: '1px solid' }}>即将上映</li> */}
                
            </ul>
            {console.log(props.history)}

            {/*
              路由配置 - 嵌套路由- 必须写在父组件的里面
  
              注意：如果要做 嵌套路由 那父组件的路由 就不能进行精确匹配
              如 url地址为 http://localhost:3000/#/films/nowplaying/ 父组件路为精确匹配 此时匹配不到父组件的路由 <Route path='/films' component={Films}></Route>
                  那嵌套在父组件内的 嵌套路由更匹配不到
              大概流程
              1：先匹配到 进入父组件一级路由 <Route path='/films' component={Films}></Route> （无exact属性 为模糊匹配 ） 展示该路由 需要展示 组件内容
              2：父组件 Films 组件内部的路由再次匹配  获取url地址 再次进行匹配 path和url 模糊匹配上 然后展示 组件内容 如上url地址 http://localhost:3000/#/films/nowplaying/
              匹配到嵌套路由的  <Route path={'/films/nowplaying'} component={Nowplaying}></Route> 后面的 <Route path={'/films/comingsoon'} component={Comingsoon}></Route> 则不展示
          */}
            {/*
              Switch 只能匹配一次
              路由匹配到第一个时 执行 然后立马跳出 不在往下匹配执行路由
          */}
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
