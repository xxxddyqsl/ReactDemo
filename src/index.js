// 导入 react 核心包 （17版本之前必须引入react 核心包否则找不到react报错 17版本之后可不引入）
import React from "react"
// 导入 react-dom 用于支持react操作DOM （18版本之前导入 import ReactDOM  from "react-dom" 即可 18版本 改版需要导入 import ReactDOM  from "react-dom/client" 并18版本后语法也所区别 下方有说明 ）
import ReactDOM from "react-dom/client"
// 导入 jsx 类组件 App.js 且 导入时首字母必须大写 否则下面调用解析 组件 会报错
import App from './App'
// import TestA from './demo/01-class类组件'
// 导入 jsx 类组件  使用 * as 设置别名 *表示所有 
// import * as TestB from './demo/02-函数组件'

// import TestC from './demo/03-组件嵌套'
// 导入 react-redux库  Provider 注入器 负责把我们的 store 注入到全局 ,这样哪个组件都能用 Provider 供应商组件 必须接收一个 store属性（必写） 花括号{}内的store 来自 自己封装导出的 store.js Redux核心库
import {Provider} from 'react-redux'
// 导入 redux存储器 react-redux 管理状态存储的容器 persistor 是( 使用persistStore 数据持久化存储的 store )  store ( 数据未持久化存储的 状态 store )
import { store, persistor} from './demo-(React-Redux)组件通信进阶/redux/combineReducers/store'
// 导入数据持久化 网关 接收 persistor 属性 花括号{}内的 persistor 是( 使用persistStore 数据持久化存储的 store )
import { PersistGate } from 'redux-persist/integration/react'
import reportWebVitals from './reportWebVitals';
// jsx 理解1：js+xml  理解2：是JavaScript的对象 
// 所以使用 React 和 jsx 需要经过编译的过程 jsx-使用react构造组件，bable进行编译（否则浏览器不识别）->JavaScript的对象->ReactDOM.createRoot(id).render()->DOM元素->插入页面

//  React 18版本前 语法 
// ReactDOM.render( <App />, document.getElementById('root'))

// React 18版本 将 ReactDOM.render 替换为 ReactDOM.createRoot 调用方法
const root = ReactDOM.createRoot(document.getElementById('root'));

// render()函数说明 把jsx元素渲染到页面中
// 参数1：jsx（react虚拟元素）
// 参数2：container（容器：想把元素放到哪个容器中）
// 参数三 callback（回调函数：当把内容放到页面中呈现的时候触发的回调函数,很少使用）

// console.log(App, TestA, TestB.appb(), TestC)

// 此写法可 不引入上方react 核心包 导入 App 在此处 React 内部会自动的实例化App 如( const App=new App({name:'react'}).render(); root.render(App) )   输出写法可单标签（ <App />） 或 双标签 （ <App> <App />）
// 测试例1 class类+函数组件：
// root.render( <React.StrictMode>  <App />  <TestA />  <TestB.appb /> </React.StrictMode>);
// 最好只有一个 根组件  如<App /> 渲染 01class类组件demo + 02函数组件demo+ 03组件嵌套demo
root.render(
   // React 18 componentDidMount重复执行两次的解决方案
   // <React.StrictMode> </React.StrictMode> 为开启 react 严格模式 都是会引起渲染完成后的生命周期componentDidMount 执行两次 需注释
   //<React.StrictMode>
   // Provider 供应商组件 必须接收一个 store属性（必写） 花括号{}内的store 来自 自己封装导出的 store.js Redux核心库
    <Provider store={store}>
        {/* PersistGate redux数据持久化  */}
        <PersistGate  loading={null} persistor={persistor}>
            <App />
       </PersistGate>
    </Provider>
   //</React.StrictMode>
);
// 最好只有一个 根组件  如<TestC /> 渲染 03组件嵌套demo
// root.render( <React.StrictMode>   <TestC /> </React.StrictMode>);


// 此写法必须引入上方 react 核心包  等价于 上方的想法 createElement 第一个参数 创建什么样的标签 第二个参数 设置标签属性 如id className title等  第三个参数 标签的内容 第四个参数可继续增加子元素
// 设置标签的class名需修改为className 否则与 函数组件class重名 引起报错
// root.render(
//     React.createElement(
//     'div',
//     {id:'APP-1',className:'cccc',title:'1111'},
//     '测试',
//     React.createElement(
//         'div',
//         {id:'APP-2',className:'cccc',title:'1111'},
//         '子元素测试',
//         React.createElement(
//             'div',
//             {id:'APP-3',className:'cccc',title:'1111'},
//             '孙子元素测试'
//             )
//         )
//     )
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
