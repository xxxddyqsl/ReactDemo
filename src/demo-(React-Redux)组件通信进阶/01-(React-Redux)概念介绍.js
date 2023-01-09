import React from 'react'
/*
    React-Redux 是基于Redux工作的
    引言
    在前面我们学习了 Redux ，我们在写案例的时候，也发现了它存在着一些问题，例如组件无法状态无法公用，每一个状态组件都需要通过订阅来监视，
    状态更新会影响到全部组件更新，面对着这些问题，React 官方在 redux 基础上提出了 React-Redux 库
    在前面的案例中，我们如果把 store 直接写在了 React 应用的顶层 props 中，各个子组件，就能访问到顶层 props
    // 在根部组件 App 组件外包上一层 Provider 如<Provider store={store}> <App /> </Provider >
        <顶层组件 store={store}>
        <App />
        </顶层组件/>
    这就类似于 React-Redux

    开始使用 React-Redux
    当我们需要在React中使用Redux时，我们除了需要引入Redux核心库外，还需要引入react-redux库，以使React和redux适配，可以通过npm或yarn安装：

    如果没有 安装过 redux 需要安装 先安装 redux （redux 是 react-redux 的核心库） 然后在安装 react-redux 安装命令如下：

    没有安装过 redux： npm install --save redux react-redux

    前面已经安装过 redux 只需要 在安装 react-redux 库即可 安装命令如下：
    1.安装 npm install --save react-redux 引入然后在  react-redux

    React-Redux提供一个 Provider （供应商）组件 供应商组件负责把store 跨级给 connect 组件

    React-Redux 会给<App></App>组件生成一个 connect 函数 在用 connect 函数生成一个父组件 这个父组件负责帮你 订阅 取消订阅 ，订阅到这个值的改变时 利用父传子的方式，
    将值给子组件 例如通过 this.props.isShow 即可访问到该值

*/
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>01-(React-Redux)概念介绍</h1>
        </div>
    )
}
