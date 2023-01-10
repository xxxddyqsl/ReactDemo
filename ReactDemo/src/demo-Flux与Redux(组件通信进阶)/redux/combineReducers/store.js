/*
      安装 npm install --save redux 引入 Redux
    import { createStore } from 'redux';

    createStore 用来创建一个Redux中的容器对象，它需要三个参数：reducer、preloadedState、enhancer。
    1. createStore( reducer, [preloadedState], enhancer)
    reducer 是一个函数，是state操作的整合函数，每次修改state时都会触发该函数，它的返回值会成为新的state。
    preloadedState 就是state的初始值，可以在这里指定也可以在reducer中指定。
    enhancer 增强函数用来对state的功能进行扩展，暂时先不理它

    Store.subscribe(()=>{})// 订阅state变化-state发生变化时，回调函数会自动调用
    Store.getState() 读取最新的state值 
    Store.dispatch()  视图发出 action 的唯一方法，该方法接受一个 action 对象作为参数： 通知修改state值


   Redux介绍及设计和使用的三大原则
    1： state 以单一对象存储在 store 对象中
    2：state 只读 （每次都会返回一个新的对象）
    3： 使用纯函数 reducer 执行 state 更新


   2： Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可


    3： Redux 中间件 例子可见：getCinemaListAction.js
    在 Redux 里， action 仅仅是携带了数据的普通对象如（{type:'XXX',payload:value}）。 
    action creator 返回的值是这个 action 类型的对象。然后通过 store.dispatch() 进行分发 通知。
    同步的情况下一切都很完美，但是 Redux 无法处理异步的情况。
    那么我们就需要在action 和 reducer 中间架起一座桥梁来处理异步，这就是 middleware
    方式1：安装 npm install --save redux-thunk  redux-thunk 详细案例可见 getCinemaListAction.js

    方式2：安装 npm install --save redux-promise  redux-promise 详细案例可见 getCinemaListAction.js


    // Redux 调试工具 - 支持 chrome 火狐 等浏览器 获取下载对应浏览器的工具
        打开下载地址 ：https://github.com/zalmoxisus/redux-devtools-extension 内有多个浏览器版本的对应工具
        chrome版例子：
        找到 1. For Chrome（ chrome版 ） 点击 last releases 跳转至 https://github.com/zalmoxisus/redux-devtools-extension/releases
        在 v2.17.0 下 点击展开 Assets 有一个 extension.zip 包 点击下载 解压
        2. 打开chrome 浏览器 ->更多->更多工具->拓展程序->点击 加载已解压的扩展程序 按钮 将解压的文件夹 放入 完成后可看到 Redux DevTools 2.17.0 
        3. 重启浏览器 F12 进入控制台 在 元素， 控制台，网络 等那 可见 Redux 按钮
         配置 Redux 在https://github.com/zalmoxisus/redux-devtools-extension/ 地址下找到 1.2 Advanced store setup （注：高级配置 异步+同步 都能观察到）
         案例如下方的 配置 Redux 开启调试工具

           const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
          const store = createStore(reducer,   preloadedState, composeEnhancers(
            applyMiddleware(...middleware)
        ));
*/
// applyMiddleware - 应用中间件的意思 可以写多个中间件
import { createStore,combineReducers, applyMiddleware, compose } from 'redux'
import CityReducer from './Reducers/CityReducer'
import TabBerReducer from './Reducers/TabBerReducer'
import CinemaListReducer from './Reducers/CinemaListReducer'
// 导入 Redux 中间件 redux-thunk 处理异步情况 -方式1：安装 npm install --save redux-thunk  redux-thunk 详细案例可见 getCinemaListAction.js
import reduxThunk from "redux-thunk"
// 导入 Redux 中间件 redux-promise 处理异步情况 -方式2：安装 npm install --save redux-promise  redux-promise 详细案例可见 getCinemaListAction.js
import reduxPromise from "redux-promise"
// 合并 各自管理的多个reducer 函数 固定语法 必须写在{xxx:xxx,xxxx}中
const reducer = combineReducers({
    // 写法1：键名：键值
    CityReducer:CityReducer,
    // 写法2：省略写法
    TabBerReducer,
    CinemaListReducer,
})
// 配置 Redux 开启调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(reduxThunk,reduxPromise)));
// 不开启 Redux 调试工具
// const store = createStore(reducer,applyMiddleware(reduxThunk,reduxPromise));
export default store
