import React, { useState, useReducer } from 'react'
/*
    为了解决复杂State带来的不便，React为我们提供了一个新的使用State的方式。Reducer横空出世，
    reduce单词中文意味减少，而reducer我觉得可以翻译为“当你的state的过于复杂时，
    你就可以使用的可以对state进行整合的工具”。当然这是个玩笑话，个人认为Reducer可以翻译为“整合器”，
    它的作用就是将那些和同一个state相关的所有函数都整合到一起，方便在组件中进行调用。

     const [state, dispatch] = useReducer(reducer, initialState)

    useReducer 参数：
        reducer : 整合函数
                    对于我们当前state的所有操作都应该在该函数中定义
                    该函数的返回值，会成为state的新值
                    reducer在执行时，会收到两个参数：
                    state 当前最新的state
                    action 它需要一个对象
                    在对象中会存储dispatch所发送的指令

        initialState : state的初始值，作用和useState()中的值是一样
       useReducer的 返回值 （如   const [state, dispatch] = useReducer(reducer, initialState)）：
            数组：
            第一个参数，state 用来获取state的值
            第二个参数，dispatch 修改的派发器
            通过派发器可以发送操作state的命令
            具体的修改行为将会由另外一个函数(reducer)执行

*/
/*
    useReducer钩子 第一个参数 ： reducer 函数（函数名可以自定义和useReducer(reducer) 内的第一个参数名称相同就可以 ） 可以理解为专门在外面 管理状态的 处理函数
  reducer的第一个参数   prevState 老的上一次的状态值 获取到 ，第二个参数 下方调用dispatch函数时 传入的对象 并且需要 return 返回
*/
const reducer = (prevState, action) => {
    console.log(prevState, action)
    //深度拷贝 es6 展开对象 赋值给临时变量 避免直接操作状态 注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    let newState = { ...prevState }
    // 获取 调用 dispatch 函数 传入的参数 根据参数 判断执行对应逻辑 修改状态 return 返回
    switch (action.type) {
        case "minus":
            // 方式1：返回一个对象 对象格式包含了 状态名称count ：状态值 prevState.count - 1 此方式 有缺陷 如果有多个状态 修改一个个写出来 并且保持其他状态的值不变 直接返回一个对象 会覆盖之前声明的 状态对象initialState 内容
            // return { count: prevState.count - 1 };
            /*
            方式2：将状态prevState 深度拷贝给临时变量 newState 通过临时变量直接操作对应的状态 newState.count--; return 返回 临时变量 newState
            （其实返回的newState也是对象 格式也是同上例 {状态key： 状态新的值} ）
            指定需要修改状态对象key 然后返回整个对象 只改变了 需要改变状态 其他状态不变
            */
            newState.count--;
            return newState;
        case "add":
            // 方式1：返回一个对象 对象格式包含了 状态名称count ：状态值 prevState.count + 1 此方式 有缺陷 如果有多个状态 修改一个个写出来 并且保持其他状态的值不变 直接返回一个对象 会覆盖之前声明的 状态对象initialState 内容
            // return { count: prevState.count + 1 };
            /*
           方式2：将状态prevState 深度拷贝给临时变量 newState 通过临时变量直接操作对应的状态 newState.count++; return 返回 临时变量 newState
           （其实返回的newState也是对象 格式也是同上例 {状态key： 状态新的值} ）
           指定需要修改状态对象key 然后返回整个对象 只改变了 需要改变状态 其他状态不变
           */
            newState.count++;
            return newState;
        case "pushList":
                newState.list.push(newState.ref.value);
                newState.ref.value='';
            return newState;
        default:
            // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
        // throw new Error();
    }
}
// useReducer钩子 第二个参数 ： 外部初始状态值（就是个对象） 可多个状态
const initialState = {
    count: 0,
    list:[1,2,3],
    ref:'',
}
export default function Test() {
    /*
    useReducer的返回值 （返回值 同useState 类似） 可以自定义名称返回值
        state 状态值
        dispatch 改变状态的唯一方法
    */
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div className='app-assembly'>
            <h1>10-useReducer-状态管理</h1>

            <div>
            <button onClick={() => {
                // 调用  dispatch 时 会把对象（{type:'minus'} ）  传入外部定义的 处理函数 reducer(state) 中
                dispatch(
                    { type: 'minus' }
                )
                console.log(state)
            }}>-</button>
            {state.count}
            <button onClick={() => {
                dispatch(
                    { type: 'add' }
                )
            }}>+</button>
            </div>
            <div>
                <List state={state} dispatch={dispatch} ></List>
            </div>
        </div>
    )
}

function List(props){
    return (
        <>
            <input type='text'  ref={(ele)=>props.state.ref=ele} />
            {
                props.state.list?.map((item,index)=><div key={index}>{item}</div>)
            }
            <button onClick={()=>{

                props.dispatch(
                    { type: 'pushList' }
                )
                console.log(props.state.ref)
            }}>添加List</button>
        </>
    )
}