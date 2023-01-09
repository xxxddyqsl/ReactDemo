import React from 'react'
/*
    redux数据持久化
    安装  npm install --save redux-persist
    介绍：
    我们经常会通过redux以及react-redux来存储和管理全局数据。但是通过redux存储全局数据时，会有这么一个问题，如果用户刷新了网页，那么我们通过redux存储的全局数据就会被全部清空，比如登录信息等。

    redux-persist 持续数据化失效的经历  案例 CityReducer.js 中可见说明
        解构返回了一个新的对象 newState ，直接重置了为初始状态
*/
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>04-redux数据持久化</h1>
            <div> redux-persist持续数据化失效的经历  案例 CityReducer.js 中可见说明
        解构返回了一个新的对象 newState ，直接重置了为初始状态引发持续数据化失效</div>
        </div>
    )
}
