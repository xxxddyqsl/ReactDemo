/*
    1. 安装 npm install --save redux 引入 Redux
    import { createStore } from 'redux';

    createStore用来创建一个Redux中的容器对象，它需要三个参数：reducer、preloadedState、enhancer。
    2. createStore( reducer, [preloadedState], enhancer)
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


    Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可
*/
import {createStore,combineReducers} from 'redux'
interface IAction{
    //  必须有的属性
    type:string,
    // 可选的属性 非必填
    payload?:any
}
//reducer - 处理函数 prevState 老的状态    纯函数设计  action
// prevState={} 设置 初始值 action:IAction 通过接口IAction 约定 action的形状
const reducer = function (prevState:IPreloadedState=preloadedState,action:IAction){
    let {type}=action;
    let newState= {...prevState}
    switch (type) {
        case 'show':
            newState.isShow=true
            return newState;
        case 'hide':
            newState.isShow=false
            return newState;
        default:
             // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
    }
}
interface IPreloadedState{
    isShow:boolean,
    cityName:string,
    /*
        有n个属性 一个个写不现实 自己需要用到的数据可通过上方的方式定义值类型取出
       剩下的属性可通过 任意属性 自定义键值类型（[name]） 和 自定义 键key (key值any任意类型) 如  [propName: string]: any;
   */
    [propName: string]: any
}
// 公共状态 初始值 - 状态是存在浏览器的内存中 刷新页面才会丢失
const preloadedState:IPreloadedState = {
    // 默认值-显示底部 TabBer 组件
    isShow:true,
    // 默认值- 城市名
    cityName:'北京',
}
const store = createStore(reducer);
export default store