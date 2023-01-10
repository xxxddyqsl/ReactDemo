import React from 'react'

import Navbar from './Subcomponent/Navbar'
import Sidebar from './Subcomponent/Sidebar'

export default function TestFu(props) {
  return (
    <div  className='app-assembly'>
        <h1>12-函数组件属性props组件复用性</h1>
        {/* 类组件 - 导航栏 */}
        <Navbar text={'函数组件导航栏'} />
        {/* 函数组件 - 侧边栏 */}
        <Sidebar bg={'burlywood'} position={{position:'absolute',top:'0px'}} about='left' />
    </div>
  )
}
