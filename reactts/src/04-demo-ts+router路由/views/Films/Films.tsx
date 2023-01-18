import React, { useEffect } from 'react'
// axios 已自带 axios 声明文件（预编译时用到） 不需要在安装  npm i --save-dev @types/axios 
import axios from 'axios'
import { Switch, Route, Redirect } from 'react-router-dom'
import Nowplaying from './Nowplaying'
import Comingsoon from './Comingsoon'
// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { Swiper, Toast,Tabs } from 'antd-mobile'
export default function Films(props:any) {
  
  return (
    <div>
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
