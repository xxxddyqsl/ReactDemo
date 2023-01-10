import React from 'react'
/*
    antd 移动端UI官网地址 https://mobile.ant.design/zh/guide/quick-start

    安装 npm install --save antd-mobile
*/
// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { Button } from 'antd-mobile'
// import { DemoBlock } from 'demos'
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>01-antd-移动端-UI组件库-</h1>
            <Button color='danger' onClick={() => {
              alert('hello.')
            }}>Danger</Button>
        </div>
    )
}
