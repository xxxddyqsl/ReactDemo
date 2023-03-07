import React, { useState } from 'react'
/*
    TypeScript - 介绍
    1.TypeScript的定位是静态类型语言，在写代码阶段就能检查错误，而非运行阶段
    2.类型系统是最好的文档，增加了代码的可读性和可维护性
    3.有一定的学习成本，需要理解接口（Interfaces），泛型（Generics）,类（Class）等
    4.ts最后被编译成js

    安装 react+ts 模板
    // reactts 为 创建的文件夹名称 在该文件夹下 生成模板
    npx create-react-app reactmui --template typescript


    如打开tsx报错，可能是Vscode 版本太老
    1:升级vscode版本
    2：项目放在Vscode的根目录下  ctrl+shift+p  出现选择TypeScript的版本 点击使用vscode自带的ts版本

    创建.tsx文件 如test.tsx 并且必须有导出 如 export default {} 否则报错

    安装 MUI
    MUI 定制能力更强一点

    文档地址 https://mui.com/material-ui/getting-started/installation/

    安装 命令 yarn add @mui/material @emotion/react @emotion/styled
     @mui/material  当前 版本为5.11.6

     yarn start 启动项目
*/
import { createTheme, ThemeProvider, Button, IconButton, Stack, Typography, Paper, } from "@mui/material";
//  MUI 组件库 带的 图标库
import { PhotoCamera } from '@mui/icons-material';
// MUI 组件库 带的颜色库 并且每一个 色号 都标出来给你 如下 red[900]  文档地址 ：https://material.io/inline-tools/color/
import { orange, red, } from '@mui/material/colors';

export default function App() {

    return (
        <div className='app-assembly'>
        <h1>01-react+ts-安装MUI</h1>
        {/* Stack 布局方式 */}
        <Stack spacing={2} direction={'row'}>
            <Button variant="text">Text</Button>
            {/*
                sx= {{color:'red'}} 可以理解为  类似 style= {{color:'red'}} 的拓展
                并且比起 style 还做了一些拓展 支持缩写 如 m 代表 margin、mt 代表 margin-top、 p 代表 padding、
                如 sx={{p:2}}(注：也可以使用常规的sx={{p:"2rem"}}) 那这个Button 标签padding 变大了 并且这个大是 整数倍的大 比如说 1 就是这个button的原始尺寸 p:2就是2倍的padding
            */}
            <Button sx={{ p: 2, }} variant="contained">Contained</Button>
            {/* red 为 MUI 组件库带的颜色库 并且赶紧不同数值 显示对应如red颜色900数值的具体代表的颜色   */}
            <Button sx={{ color: red['900'], }} variant="outlined">Outlined</Button>

            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>
        </Stack>
    </div>
    )
}