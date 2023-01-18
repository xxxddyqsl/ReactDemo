import React from 'react'
/*
    TypeScript - 介绍
    1.TypeScript的定位是静态类型语言，在写代码阶段就能检查错误，而非运行阶段
    2.类型系统是最好的文档，增加了代码的可读性和可维护性
    3.有一定的学习成本，需要理解接口（Interfaces），泛型（Generics）,类（Class）等
    4.ts最后被编译成js

    安装 react+ts 模板
    // reactts 为 创建的文件夹名称 在该文件夹下 生成模板
    npx create-react-app reactts --template typescript

    如打开tsx报错，可能是Vscode 版本太老
    1:升级vscode版本
    2：项目放在Vscode的根目录下  ctrl+shift+p  出现选择TypeScript的版本 点击使用vscode自带的ts版本

    创建.tsx文件 如test.tsx 并且必须有导出 如 export default {} 否则报错
*/
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>01-React+Ts介绍安装</h1>
        </div>
    )
}

