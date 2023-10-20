// 状态管理 管理 入口文件
import React from 'react'
// applyMiddleware - 应用中间件的意思 可以写多个中间件
import { createStore,combineReducers, applyMiddleware, compose, } from 'redux'

// 导入 Redux 中间件 redux-thunk 处理异步情况 -方式1：安装 npm install --save redux-thunk  redux-thunk 详细案例可见 getCinemaListAction.js
import reduxThunk from "redux-thunk"
// 导入 Redux 中间件 redux-promise 处理异步情况 -方式2：安装 npm install --save redux-promise  redux-promise 详细案例可见 getCinemaListAction.js
import reduxPromise from "redux-promise"

// 校验 值类型
import kerwinPropsType from 'prop-types'
// 只处理 tabber 相关状态函数
import TabBerReducer from './Reducers/TabBerReducer'
// 只处理 header 相关状态函数
import HeaderReducer from './Reducers/HeaderReducer'
// 只处理 城市 相关状态函数
import CityReducer from './Reducers/CityReducer'

// 只处理 影院 相关状态函数
import CinemaListReducer from './Reducers/CinemaListReducer'

// combineReducers 函数 合并 各自管理状态的多个reducer 函数
const reducer = combineReducers({
    TabBerReducer,
    HeaderReducer,
    CityReducer,
    CinemaListReducer
})
// 配置 Redux 开启调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 创建 Store 对象
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)) );
// export default function Store() {
//   return (
//     <div>store</div>
//   )
// }

export default store;
