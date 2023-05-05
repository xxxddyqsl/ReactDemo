import React from 'react'
import styled, { keyframes } from 'styled-components'
const rotate360 = keyframes`
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(360deg);
    }
`
export default function Test() {
    const StyledDiv=styled.div`
            display:flex;
            align-items: center;
            justify-content: center;
            width:100px;
            height:100px;
            color:#fff;
            padding:10px;
            border-radius:10px;
            background:blue;
            animation:${rotate360} 10s linear infinite;
    `
    return (
        <div className='app-assembly'>
            <h1>05-styled-components-动画样式</h1>
            <StyledDiv className='keyHighlight'>
                <div>测试插槽 是否可插入styled生成的组件中</div>
            </StyledDiv>
        </div>
    )
}
