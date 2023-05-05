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
const ChildButton = (props) => {
  return (
    // 通过props.className 接收styled 内添加的样式
    <button className={props.className}>
      {props.text}
    </button>
  )
}
export default function Test() {
  const StyledButton = styled(ChildButton)`
    outline: 0;
    border: 0;
    padding:10px 8px;
    color:${props => props.color};
    margin:0px 20px;
    border-radius:4px;
    background:#17ba77;
  `;
  // 复用性 - 继承按钮-StyledButton组件及样式 在此基础上 加以改造样式 生成定制的样式
  const StyledButton2 = styled(StyledButton)`
        background:red;
  `;
  // 复用性 - 继承按钮-StyledButton组件及样式 在此基础上 加以改造样式 生成定制的样式
  const StyledButton3 = styled(StyledButton)`
        background:yellow;
  `;
  return (
    <div className='app-assembly'>
      <h1>04-styled-components-样式扩展-复用性</h1>
      <StyledButton color={'blue'} text={'按钮-StyledButton'}></StyledButton>
      <StyledButton2 color={'#fff'} text={'继承按钮-StyledButton组件并且加以改造样式'}></StyledButton2>
      <StyledButton3 color={'#333'} text={'继承按钮-StyledButton组件并且加以改造样式'}></StyledButton3>
    </div>
  )
}
