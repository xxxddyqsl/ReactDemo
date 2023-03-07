import React from 'react'
/*
  MUI 的styled组件 类似 "styled-components"组件库的功能（案例 在ReactDemo项目文件夹下的demo-styled-components文件夹下可见）
  都可 生成一个 标签 <footer></footer> 给该标签添加样式等
*/
import {Button} from "@mui/material"
import { styled ,createTheme,ThemeProvider} from "@mui/system"

/*
  基础使用 - styled 以函数的形式创建 接受一个参数 可传入字符串 或 传入一个组件 如下
  创建一个 div 标签 -将要生成的标签名以字符串的形式传入（也可传入 组件）
*/
const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  padding: 8,
  borderRadius: 4,
})
// 基于 MUI Button组件改造 
const MyButton = styled(Button)({
  // 对原有的样式 fontSize 和 color 进行覆盖
  fontSize:'20px',
  color:'#b71c1c',
})
export default function App() {
  return (
    <div className='app-assembly'>
      <h1>04-react+ts-MUI-styled使用</h1>
      <MyComponent>styled-基础使用</MyComponent>
      {/* MyButton 继承了 所有的Button组件所有的功能属性  如可使用 原属性variant='contained'*/}
      <MyButton variant='contained'>styled-改造MUI-Button组件</MyButton>
    </div>
  )
}
