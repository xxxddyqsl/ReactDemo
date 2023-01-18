import React from 'react'
/*
    路由安装 - 指定版本为 v5
    npm install --save react-router-dom@5
    

    在第三方库安装 完成之后 导入报错 如此时的 路由 import {HashRouter} from 'react-router-dom' 
    需要再次安装一下 说明文档 否则 React+ts的模板 无法找到 安装的路由
    安装 路由说明文档如下 加上 @types/在之前的命令前面 如下命令
    npm i --save-dev @types/react-router-dom@5
*/
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>01-react+ts-安装路由</h1>
        </div>
    )
}
