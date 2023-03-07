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

/*
 createTheme 创建主题
createTheme 接收一个对象 主题配置 参数如下：
   .palette
   .typography
   .spacing
   .breakpoints
   .zIndex
   .transitions
   .components

*/
/*
createTheme 创建主题下的typography属性 在增加 variant内属性的可选参数（样式） 因ts 语法检查比较多需要加上这一段声明 语法问题 js内无需

typography属性 增加 variant内属性的可选参数   声明开始
*/
declare module '@mui/material/styles' {
    interface TypographyVariants {
        // 对应是在typography 内增加的属性名 可选 ggFlex1
        ggFlex1: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        // 对应是在typography 内增加的属性名 可选 ggFlex1
        ggFlex1?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        // 对应是在typography 内增加的属性名 可选 ggFlex1
        ggFlex1: true;
    }
}
// typography属性 增加 variant内属性的可选参数   声明结束

// const theme = createTheme({
//     // 将原本 palette下的 primary 下的 main 属性的颜色样式替换掉了red['900'] 如下 子组件 <Button sx={{ p: 2, }}   variant="contained">Contained</Button>此时主色primary 背景 变成了red['900']
//     palette: {
//         primary: {
//             main: red['900'],
//         },
//         background:{
//             paper:'#3399FF',
//         }
//     },
// })

const theme = (success: boolean) => {
    const themeOptions = {
        // 将原本 palette下的 primary 下的 main 属性的颜色样式替换掉了red['900'] 如下 子组件 <Button sx={{ p: 2, }}   variant="contained">Contained</Button>此时主色primary 背景 变成了red['900']
        palette: {
            primary: {
                main: red['900'],
            },
            background: {
                //  设置组件paper 的背景色 
                paper: (success ? '#3399FF' : '#ffa936'),
            }
        },
        //给 组件Typography variant内属性 扩展增加 生成标签的默认样式 如增加一个 ggFlex1
        typography: {
            ggFlex1: {
                display: 'flex',
                color:"#333",
                fontSize: '32px',
                'div':{
                    margin:'10px',
                    //hover ggFlex1下 div 修改背景色
                    '&:hover':{
                        background:'red'
                    }
                },
                'div:hover':{
                    color:'#fff'
                }
            }
        },
    }
    // createTheme 创建主题
    const themes = createTheme(themeOptions);
    // 将 创建好的状态 
    return themes;
}
export default function App() {
    const [success, setSuccess] = useState(false)
    const handleChange = () => {
        setSuccess(!success);
    };
    return (
        /*
            ThemeProvider 组件提供主题 将自己创建的主题theme 提供出来 那ThemeProvider下的所有子组件都会把主题色更改 
            如  子组件 <Button sx={{ p: 2, }}   variant="contained">Contained</Button>此时主色primary 背景 变成了red['900']
        */
        <ThemeProvider theme={theme(success)}>
            {/* Paper 组件 主题的背景色  */}
            <Paper>
                <div className='app-assembly'>
                    <h1>03-react+ts-MUI-theme定制主题</h1>
                    {/*
                        Typography 组件 可生成标签
                        variant={'h1'} 生成标签的默认样式 当前为h1的默认样式 可用参数如下：
                        "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "inherit"

                        component={'div'}生成的标签名 当前是生成div标签
                    */}
                    <Typography variant={'h1'} component={'div'}>
                        h1. Heading
                    </Typography>
                    {/*
                        通过 createTheme 创建主题下的属性 typography  给 Typography 组件 的 variant 增加了 新的的 标签样式参数 ：ggFlex1 
                        默认样式 参数如下：
                        button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "inherit"
                    */}
                    <Typography variant={'ggFlex1'} component={'div'}>
                        <div>ggFlex1自定义的标签样式  -1 </div>
                        <div>ggFlex1自定义的标签样式  -2 </div>
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

                        <Button onClick={handleChange} variant="outlined">点击切换主题背景色</Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                    </Stack>
                </div>
            </Paper>
        </ThemeProvider>
    )
}