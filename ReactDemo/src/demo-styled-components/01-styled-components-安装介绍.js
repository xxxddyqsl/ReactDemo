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
export default function Test() {
    /*
         styled-components 基本语法 生成一个组件(首字母大写)  自动生成class名 将背景样式 赋进去
         可以通过styled.footer 生成一个 标签 <footer></footer> 给该标签添加样式等
    */
    const StyledFooter= styled.footer`
        background:yellow;
        border:1px solid red;
        ul{
            display:flex;
            li{
                flex:1;
                border:1px solid ;
                padding:4px 0;
                text-align:center;

                // 类似 sacss 并且sacss 语法都是支持的 如下  &:hover 写法
                &:hover{
                    background:red;
                }
            }
        }
    `
    return (
        <div className='app-assembly'>
            <h1>01-styled-components-安装介绍+基本使用语法</h1>

            <StyledFooter>
                <ul>
                    <li>首页</li>
                    <li>列表</li>
                    <li>我的</li>
                </ul>
            </StyledFooter>
        </div>
    )
}
