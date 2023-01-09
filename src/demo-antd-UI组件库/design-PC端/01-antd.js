import React from 'react'
// 导入  antd UI组件库
import { Button,Row,Col } from 'antd'
// 导入  antd UI组件库 样式
// import 'antd/dist/antd'
/*
    antd PC端UI官网地址  https://ant.design/components/button-cn

    安装 antd UI组件库 npm install antd --save

    // 栅格系统 -  加起来等于24就可以
*/
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>01-antd-PC端-UI组件库-栅格系统</h1>
            <Row>
                <Col span={8}>col-111</Col>
                {/* 使用 offset 可以将列向右侧偏。例如，offset={8} 将元素向右侧偏移了 8 个列（column）的宽度。 */}
                <Col span={8} offset={8}>col-222</Col>
            </Row>
            {/*danger设置危险按钮红色  ghost 幽灵属性，使按钮背景透明  loading 设置按钮载入状态*/}
            {/* <Button type='primary' onClick={()=>{
                console.log('click')
            }} danger  ghost={true} loading={true}>primary Button</Button> */}
        </div>
    )
}
