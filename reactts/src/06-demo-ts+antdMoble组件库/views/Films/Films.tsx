import React, { useEffect, useState,createRef} from 'react'
// axios 已自带 axios 声明文件（预编译时用到） 不需要在安装  npm i --save-dev @types/axios 
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import Nowplaying from './Nowplaying'
import Comingsoon from './Comingsoon'
// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { Swiper, Toast, Tabs, SwiperRef,Button } from 'antd-mobile'
export default function Films(props: any) {
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
  //createRef 获取元素  SwiperRef 组件库 定义的接口形状
  const ref= createRef<SwiperRef>()
  return (
    <div>
      <Swiper autoplay={true} loop={true} ref={ref}>
        {
          banners.map((item: any, index) => {
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
      <Button color='danger' onClick={()=>{
        // 调用antd组件内的 方法    ref.current? 可选链 如果不是存在调用 初始加载是 可能是undefined
         ref.current?.swipePrev()
        console.log(ref)
      }}>上一个 </Button>
      <Button color='primary' onClick={()=>{
         // 调用antd组件内的 方法    ref.current? 可选链 如果不是存在调用 初始加载是 可能是undefined
         ref.current?.swipeNext()
         console.log(ref,props)
      }}>下一个 </Button>
      <div style={{ width: '100%', position: 'sticky', top: 0, background: '#fff', zIndex: 1, }}>
        {/* activeKey-当前激活Tabs面板的key对应Tabs.Tab 组件上的key相同的key 则显示选中状态   props.location.pathname 获取当前匹配的路由路径*/}
        <Tabs style={{}} activeKey={props.location.pathname} onChange={(value) => {
          // value 就是 Tabs.Tab 组件上的key
          console.log(value)
          // 路由 跳转
          props.history.push(value)
        }}>
          <Tabs.Tab title='正在热映' key='/films/nowplaying'> </Tabs.Tab>
          <Tabs.Tab title='即将上映' key='/films/comingsoon'></Tabs.Tab>
        </Tabs>

      </div>
      {/* <ul className='gg-flex-3' style={{ justifyContent: 'space-between' }}>
        <li className='' onClick={()=>{
          // 编程式路由导航-push跳转
          // props.history.push('/films/nowplaying')
          console.log(props)
        }}>正在热映</li>
        <li>即将上映</li>
      </ul> */}
      <Switch>
        <Route path={'/films/nowplaying'} component={Nowplaying}></Route>
        <Route path={'/films/comingsoon'} component={Comingsoon}></Route>
        {/*   路由重定向 - 万能匹配  默认打开  正在热映路由  */}
        <Redirect to={'/films/nowplaying'} from='/films'></Redirect>
      </Switch>
    </div>
  )
}
