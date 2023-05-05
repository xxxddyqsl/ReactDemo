import React from 'react'
/*
    styled-components
    介绍： 它是通过javascript 改变css编写方式的 解决方案之一， 从根本上解决 常规css 编写的一些弊端。
    通过JavaScript来为 css 赋能，我们能达到常规css所不能处理的复杂逻辑，函数方法，复用，避免干扰。
    样式编写将依附在 jsx上面，html，css，js三者再次内聚。 all in js的思想


    安装 styled-components 模块
        安装： npm install --save styled-components

*/
import styled from "styled-components"
const Child=(props)=>{
    return (
        //  通过props.className 接收 StyledChild 内添加的样式
        <div className={props.className}>
            初始-Child子组件-无样式-通过styled高阶组件改造
            {/*  通过-插槽 props.children  将测试的 div 标签 插入*/}
            {props.children}
        </div>
    )
}

export default function Test() {
    // 将 无样式或者要调整样式的组件 Child 放入高阶组件 styled(Child) 中 并且添加一些样式 Child组件中 通过props.className 接收添加的样式
    const StyledChild= styled(Child)`
        width:100px;
        color:blue;
        background:${props=>props.bg};
    `;

    return (
        <div className='app-assembly'>
            <h1>03-styled-components-样式任意化组件-高阶组件</h1>
            {/* 无样式或者要调整样式的组件-通过styled高阶组件改造样式 */}
            <StyledChild bg={'red'}>
                {/*  通过-插槽 props.children  将测试的 div 标签 插入 styled高阶组件 生成的组件中*/}
                <div>测试插槽 是否可插入styled生成的组件中</div>
            </StyledChild>
        </div>
    )
}
