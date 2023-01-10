import React, { useEffect, useState } from 'react'
/*

    mobx-react  - 安装介绍 @5 指定版本
    //  基于 mobx的核心库 需要 和 mobx是同一个版本
    安装： npm install --save mobx-react@5

    mobx-react 与 mobx 区别

    mobx ： 需要自己 订阅 和 取消订阅

    mobx-react ： 不用自己订阅 和 取消订阅
    构建一个 父组件-高阶级组件（mobx-react提供的）
*/
// 导入 mobx-react Provider mobx-react提供的高阶级组件（供应商组件）
import { Provider } from "mobx-react"
import store from './mobx/mobx-react-store'
function App() {

    return (
        <Provider store={store}>
            <div className='app-assembly'>
                <h1>04-Mobx-react安装介绍</h1>
            </div>
        </Provider>
    )
}
export default App