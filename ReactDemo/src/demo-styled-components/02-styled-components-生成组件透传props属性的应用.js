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
export default function Test(props) {
    /*
        将input 封装成一个统一的样式化组件 styled-components 基本语法 生成一个组件(首字母大写) 自动生成class名 将背景样式 赋进去
        可以通过styled.input 生成原生的 input 标签 并且 该标签的原生属性 都支持
        
    */
    const StyledInput = styled.input`
        outline:none;
        height:22px;
        border-radius:6px;
        border-bottom:1px solid red;
    `;
    const StyledDiv= styled.div`
        width:100px;
        height:100px;
        // 通过 props 接收 传入的 自定义属性背景色 bg 语法 如（props=>props.bg） 并且如果没有传入自定义属性bg 显示默认的颜色'yellow'
        background:${props=>props.bg || 'yellow'};
    `
    return (
        <div className='app-assembly'>
            <h1>02-styled-components-生成组件透传props属性的应用</h1>
            <StyledInput type={'text'} placeholder='请输入'></StyledInput>
             {/* 生成原生的 div 标签  传入 自定义属性背景色 bg*/}
             <StyledDiv bg={'blue'}></StyledDiv>
        </div>
    )
}
