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
import React ,{useEffect, useState} from 'react'
import TabBar from './Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './router/indexRouter-v5'

// react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 语法： connect()(Test) 此时 Test 已经是 connect 的孩子组件
import {connect} from "react-redux"
function Test(props) {
    //  React-Redux 通过  connect 函数  给 App 根组件 返回公共的状态值 App 根组件 父传子 通过props访问获取状态
    const [isShow,setIsShow]=useState(props.hiddenTabBer);
    const [CityName,setCityName]=useState(props.CityName);
    //第一次默认执行 后续 根据注入的依赖是否发生变化才会执行
    useEffect(()=>{
        // 更新状态 隐藏或显示 底部 TabBar 组件
        setIsShow(props.hiddenTabBer)
        // 更新状态 显示选择的城市名称
        setCityName(props.CityName)
        // 注入依赖  依赖发送改变时useEffect才会再次执行
    },[props.hiddenTabBer,props.CityName])
    return (
        <div className='app-assembly'>
            <h1>02-(React-Redux)案例</h1>
            <div style={{ width: '400px', border: '1px solid red' ,height: '500px',}}>
                {/* 导入自定义 封装的路由组件  */}
                <MRouter>
                {/* */}
                <h4>地区-{CityName}</h4>
                    {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                    {isShow && <TabBar className='footer-tabs'></TabBar>}
                </MRouter>
            </div>
        </div>
    )
}
/*
 connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app) 此时 Test 已经是 connect 的孩子组件
 connect第二个参数: 对象 内部为回调函数 将来传给孩子的回调函数 子组件调用回调函数 通知reducer根据 action 修改状态  此时 Test 已经是 connect 的孩子组件

 isShowTabBar 自定义函数 返回一个 action 其实就是 对象 {type:'xxx',payload:'payload'} 通知reducer 函数 根据type修改状态
    类似 store.dispatch(action)
*/
// 写法1 ： 此时 Test 已经是 connect 的孩子组件 connect将UI组件（ Test 组件）变成 容器组件
// export default connect((state)=>{
//     // connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app)
//     // connect要求第一个参数 是一个函数 这个函数中有一个形参start（ 所有公共的状态） 并且这个函数必须有返回值 将来传给孩子的属性  此时 Test 已经是 connect 的孩子组件
//     return { 
//         // 控制TabBar组件是否显示
//         hiddenTabBer:state.TabBerReducer.hiddenTabBer,
//         CityName:state.CityReducer.CityName,
//     }
// },null)(Test);
// 写法2 ： 此时 Test 已经是 connect 的孩子组件 connect将UI组件（ Test 组件）变成 容器组件
const mapStateToProps=(state)=>{
     // connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app)
    // connect要求第一个参数 是一个函数 这个函数中有一个形参start（ 所有公共的状态） 并且这个函数必须有返回值 将来传给孩子的属性  此时 Test 已经是 connect 的孩子组件
    return { 
        // 控制TabBar组件是否显示
        hiddenTabBer:state.TabBerReducer.hiddenTabBer,
        CityName:state.CityReducer.CityName,
    }
}
export default connect(mapStateToProps,null)(Test)