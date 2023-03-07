import React from "react"
// 导入 react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 这个父组件负责帮你 订阅 取消订阅 ，订阅到这个值的改变时 利用父传子的方式，将值给子组件 例如通过 this.props.isShow 即可访问到该值
import {connect} from "react-redux"
// 导入 axios 请求拦截器 触发正在加载
import  './util/request'

import TestA from './demo/01-class类组件'
// 导入 jsx 类组件  使用 * as 设置别名 *表示所有 下方使用时需要 <TestB.appb></TestB.appb>
// import * as TestB from './demo/02-函数组件' 
// 导入 appb 使用 as 设置别名 为TestB
import {appb as TestB} from './demo/02-函数组件'
import  TestC from './demo/03-组件嵌套'
import  TestD from './demo/04-事件绑定'
import  TestE from './demo/05-ref的应用'
import  TestF from './demo/06-state+setState类状态的更新应用'
import  TestG from './demo/07-todolist案例循环渲染'
import  TestH from './demo/08-选项卡案例demo'
import  TestI from './demo/09-setState同步异步'
import  TestJ from './demo/10-betterScroll滚动插件'
import  TestK from './demo/11-类组件属性props组件复用性'
import  TestL from './demo/12-函数组件属性props组件复用性'
import  TestN from './demo/13-属性(props)vs状态(state)'
import  TestO from './demo/14-受控组件和非受控组件'
import  AdvancedA from './demo-Advanced(通信部分)/01-父子通信-抽屉显示隐藏效果'
import  AdvancedB from './demo-Advanced(通信部分)/02-非受控选项卡功能案例'
import  AdvancedC from './demo-Advanced(通信部分)/03-受控选项卡功能案例'
import  AdvancedD from './demo-Advanced(通信部分)/04-父子通信版-表单域组件'
import  AdvancedE from './demo-Advanced(通信部分)/05-ref版-表单域组件'
import  AdvancedF from './demo-Advanced(通信部分)/06-非父子组件通信状态提升（中间人模式）'
import  AdvancedG from './demo-Advanced(通信部分)/07-非父子组件通信订阅发布模式'
import  AdvancedH from './demo-Advanced(通信部分)/08-非父子组件通信context'
import  AdvancedI from './demo-Advanced(通信部分)/09-插槽'
import  AdvancedJ from './demo-Advanced(通信部分)/10-插槽-抽屉显示隐藏效果'
import  LifecycleA from './demo-Advanced(生命周期)/01-生命周期'
import  LifecycleB from './demo-Advanced(生命周期)/02-生命周期-更新阶段性能优化-1'
import  LifecycleC from './demo-Advanced(生命周期)/03-生命周期-销毁阶段'
import  LifecycleD from './demo-Advanced(生命周期)/04-生命周期-getSnapshotBeforeUpdate'
import  LifecycleE from './demo-Advanced(生命周期)/05-生命周期-更新阶段性能优化-2'
import  LifecycleF from './demo-Advanced(生命周期)/06-swiper轮播图-同步'
import  LifecycleG from './demo-Advanced(生命周期)/07-swiper轮播图-异步'
import  LifecycleH from './demo-Advanced(生命周期)/08-swiper轮播图-组件+插槽'
import  HooksA from './demo-hooks(函数组件)/01-useState'
import  HooksB from './demo-hooks(函数组件)/02-useEffect'
import  HooksC from './demo-hooks(函数组件)/03-useEffect-注入依赖案例'
import  HooksD from './demo-hooks(函数组件)/04-useEffect-销毁案例'
import  HooksE from './demo-hooks(函数组件)/05-useEffect-useLayoutEffect区别与使用时机'
import  HooksF from './demo-hooks(函数组件)/06-useCallback-记忆函数'
import  HooksG from './demo-hooks(函数组件)/07-useMemo'
import  HooksH from './demo-hooks(函数组件)/08-useRef'
import  HooksI from './demo-hooks(函数组件)/09-useContext-context组件通信'
import  HooksJ from './demo-hooks(函数组件)/10-useReducer-父子通信'
import  HooksK from './demo-hooks(函数组件)/11-useReducer+useContext-通信'
import  HooksL from './demo-hooks(函数组件)/12-useReducer+useContext-通信案例'
import  HooksN from './demo-hooks(函数组件)/13-自定义hooks'
import  RouteA from './demo-路由/01-route-v5介绍'
import  RouteB from './demo-路由/02-route-v5-路由封装成组件'
import  RouteC from './demo-路由/03-route-v5-声明式导航与编程式导航'
import  ReverseProxyA from './demo-反向代理/01-反向代理'
import CssModuleA from './demo-css文件局部隔离/index'
import ReduxA from './demo-Flux与Redux(组件通信进阶)/01-Flux及Redux介绍'
import ReduxB from './demo-Flux与Redux(组件通信进阶)/02-Redux案例'
import ReduxC from './demo-Flux与Redux(组件通信进阶)/03-Redux扩展-combineReducers'


import ReactReduxA from './demo-(React-Redux)组件通信进阶/01-(React-Redux)概念介绍'
import ReactReduxB from './demo-(React-Redux)组件通信进阶/02-(React-Redux)案例'
import ReactReduxC from './demo-(React-Redux)组件通信进阶/03-(React-Redux)原理+组件封装高阶函数'
import ReactReduxD from './demo-(React-Redux)组件通信进阶/04-redux持久化'

import AntdUIPCA from './demo-antd-UI组件库/design-PC端/01-antd'
import AntdUIPCB from './demo-antd-UI组件库/design-PC端/02-antd-UI组件库-Layout布局'

import AntdUIMobileA from './demo-antd-UI组件库/mobile-移动端/01-antd'
import AntdUIMobileB from './demo-antd-UI组件库/mobile-移动端/02-antd-mobile案例'

import ImmutableA from './demo-Immutable-深度或浅拷贝库/01-immutable-安装介绍'
import ImmutableB from './demo-Immutable-深度或浅拷贝库/02-immutable-基础-map'
import ImmutableC from './demo-Immutable-深度或浅拷贝库/03-immutable-基础-List'
import ImmutableD from './demo-Immutable-深度或浅拷贝库/04-immutable-进阶-复杂数据'
import ImmutableE from './demo-Immutable-深度或浅拷贝库/05-immutable-进阶-fromJS处理复杂数据'

import MobxA from './demo-Mobx-通信状态管理/01-Mobx安装介绍'
import MobxB from './demo-Mobx-通信状态管理/02-Mobx使用'
import MobxC from './demo-Mobx-通信状态管理/03-Mobx-替代redux案例'
import MobxReactA from './demo-(Mobx-react)-通信状态管理/01-Mobx-react安装介绍'

import TsA from './demo-TS/01-Ts介绍'
import StyledComponentsA from './demo-styled-components/01-styled-components-安装介绍'
import StyledComponentsB from './demo-styled-components/02-styled-components-生成组件透传props属性的应用'
import StyledComponentsC from './demo-styled-components/03-styled-components-样式任意化组件-高阶组件'
// 导入的文件，需要在src目录下 (之前引入 // import '../public/css/app.css' public下的css文件时引起报错) ，解决办法可将文件移到src目录下 或配置 webpack.config.js内的new ModuleScopoPlugin 内容全部注释，重启项目即可
// 引发的原因是ModuleScopePlugin这个插件功能是为了防止用户引入src目录之外的文件导致不可预期的结果。因为babel都是通过src目录内文件进行入口转义的，如果你引入了src目录外，例如src1，这样这个文件就不能经过babel转义。除非你保证你引入文件已经经过转义，所以你可以不使用该插件进行限制。
import './css/app.css'
// function app(){
//     console.log('Hello, world!',);
//     return (
//         <h1>Hello, world!</h1>
//     )
// }
// class Test {
//     constructor(){
//         this.a='Test类测试'
//     }
//     testA(data){
//         console.log((data||'')+'testA')
//     }
// }
// // class 类 app 继承（含 内部变量 函数）上方的  Test 类 
// class app extends Test{
//     constructor(){
//         super();  //ES6 要求，子类的构造函数必须执行一次super函数
//         this.msg='app类输出：'
//     }
//     testB(){
//         // super在普通方法之中，指向 Test.prototype， 所以super.a 就相当于 Test.prototype.a
//         console.log('app继承：',super.a);
//         super.testA(this.msg);
        
//     }
//     testC(){
//         return (<h1>Hello, world!</h1>)
//     }
// }


// 创建 类组件 固定必须继承 React.Component 否则只是普通的类函数
class app extends React.Component{
    componentDidMount(){
        console.log('app根组件',this.props)
    }
    // render 固定写法 实例化之后 React 会自动调用 render() 函数
    render() {
        // jsx 写法 无需加单双引号 或es6的字符串模板(``)否则 报错 无法编译解析 并且JSX 表达式必须具有一个父元素 错误语法（ <h1>Hello, world</h1><div>测试</div> ）
        // return ( 
        //     <div>
        //         <h1>Hello, world</h1>
        //     </div>
        // );
        return ( 
            <div>
                <TestA></TestA>
                 {/* <TestB.appb></TestB.appb> = <TestB></TestB> */}
                <TestB></TestB>
                <TestC></TestC>
                <TestD></TestD>
                <TestE/>
                <TestF/>
                <TestG/>
                <TestH/>
                <TestI/>
                <TestJ/>
                <TestK/>
                <TestL/>
                <TestN/>
                <TestO/>
                <AdvancedA/>
                <AdvancedB/>
                <AdvancedC/>
                <AdvancedD/>
                <AdvancedE/>
                <AdvancedF/>
                <AdvancedG/>
                <AdvancedH/>
                <AdvancedI/>
                <AdvancedJ/>
                <LifecycleA/>
                <LifecycleB/>
                <LifecycleC/>
                <LifecycleD/>
                <LifecycleE/>
                <LifecycleF/>
                <LifecycleG/>
                <LifecycleH/>
                <HooksA/>
                <HooksB/>
                <HooksC/>
                <HooksD/>
                <HooksE/>
                <HooksF/>
                <HooksG/>
                <HooksH/>
                <HooksI></HooksI>
                <HooksJ/>
                <HooksK/>
                <HooksL/>
                <HooksN/>
                <RouteA/>
                <RouteB/>
                <RouteC/>
                <ReverseProxyA/>
                <CssModuleA/>
                <ReduxA/>
                <ReduxB/>
                <ReduxC/>
                <ReactReduxA></ReactReduxA>
                <ReactReduxB />
                <ReactReduxC />
                <ReactReduxD />
                <AntdUIPCA />
                <AntdUIPCB/>
                <AntdUIMobileA/>
                
                <AntdUIMobileB/>

                <ImmutableA></ImmutableA>
                <ImmutableB/>
                <ImmutableC/>
                <ImmutableD/>
                <ImmutableE/>

                <MobxA/>
                <MobxB/>
                <MobxC/>
                <MobxReactA></MobxReactA>

                <TsA/>

                <StyledComponentsA/>
                <StyledComponentsB/>
                <StyledComponentsC/>
            </div>
        );
      }
}
// export default 方式导出（只能导出一个类或函数）  类组件app  （index.js页导入时可任意命名导出变量名）
/*
    react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 语法1： connect()(app) 或者 语法2：connect(app)
    connect()(app)有2个参数  connect(函数将来传给孩子的属性,将来传给孩子的回调函数) 此时app已经是 connect 的孩子组件

    语法1： connect()(app) 先执行了connect() 并且在函数内部可定制返回值（要求第一个参数必须也是一个函数这个函数必须有返回值 然后在调用 (app)将app根组件包装成 高阶级组件 ） 语法要求例子如下：
    connect(
        // connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app)
        // connect要求第一个参数 是一个函数 这个函数中有一个形参start（ 所有公共的状态） 并且这个函数必须有返回值 将来传给孩子的属性
        (start)=>{
            // 返回值 是什么 app 组件身上就会得到这个属性， 其实就是把 connect 传的这个回调函数（第一个参数 ）在这里执行 并且把 a b这个两个属性值传给了app组件而已
        return {
            a:1,
            b:2,
        }
    },
    // connect第二个参数:对象 内部为回调函数  将来传给孩子的回调函数 子组件调用回调函数 通知reducer根据 action 修改状态 如下
    {
        a(){},
        b(){},
    }
    )(app)

    语法2：connect(app)  connect函数将app根组件包装成 高阶级组件
*/
// 写法1： 此时app已经是 connect 的孩子组件
// export default connect((state)=>{
//     console.log('app根组件-start',state)
//     return {
//         a:'测试A-connect函数将app根组件包装成高阶级组件',
//         b:"测试B-connect函数将app根组件包装成高阶级组件",
//     }
// })(app)
// 写法2 ： 此时app已经是 connect 的孩子组件
const mapStateToProps=(state)=>{
    console.log('app根组件-start',state)
    return {
        a:'测试A-connect函数将app根组件包装成高阶级组件',
        b:"测试B-connect函数将app根组件包装成高阶级组件",
    }
};
// 写法2： 此时app已经是 connect 的孩子组件
export default connect(mapStateToProps)(app)

// export 方式导出（可导出多个类或函数） index.js页导入时如以下3种方式：
// 方式1::index.js页导入时不可以任意命名导出变量名 必须与 类名或函数名一致  如在index.js页 导入 import { a,b,e,c } t from './App'  调用时 a() 、b() 、new c() 、e
// 方式2 :: 可用 * as 设置别名 *表示所有 如在index.js页 导入 import * as test from './App' 调用时 test.a()、 test.b()、 test.e 、 new test.c()
// 方式3 :: 可用 as 设置别名  如在index.js页 导入 import {  a,b,c,e  as aa,bb,ee,cc  } from './App' 调用时  a() 、bb() 、 等
// export function a(){
//     console.log('测试a函数')
// }
// export class c{ cc(){console.log('测试cc函数')}}
// export let e=3;
// export function b(){
//     console.log('测试b函数')
// }