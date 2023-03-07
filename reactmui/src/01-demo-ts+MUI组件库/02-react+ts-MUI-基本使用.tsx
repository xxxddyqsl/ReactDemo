import React, { useState } from 'react'
 
import {  Button, IconButton, Stack, Typography,   } from "@mui/material";
//  MUI 组件库 带的 图标库
import { PhotoCamera } from '@mui/icons-material';
// MUI 组件库 带的颜色库 并且每一个 色号 都标出来给你 如下 red[900]  文档地址 ：https://material.io/inline-tools/color/
import { orange, red, } from '@mui/material/colors';

 
export default function App() {
 
    return (
        <div className='app-assembly'>
        <h1>02-react+ts-MUI-基本使用</h1>
        {/*
            Typography 组件 可生成标签
            variant={'h1'} 生成标签的默认样式 当前为h1的默认样式 可用参数如下：
            "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "inherit"

            component={'div'}生成的标签名 当前是生成div标签
        */}
        <Typography variant={'h1'} component={'div'}>
            h1. Heading
        </Typography>
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
            {/* 图标类型的按钮 */}
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>
        </Stack>
    </div>
    )
}