import React, { useReducer, useEffect } from 'react'
import ChildA from './Subcomponent/ChildA'
import ChildB from './Subcomponent/ChildB'
import ChildC from './Subcomponent/ChildC'
/*
    useReducer() + React.createContext() 理论 概念解析
*/
// 状态处理函数
const reducer = (prevState, action) => {
    //深度拷贝 es6 展开对象 赋值给临时变量 避免直接操作状态 注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    let newState = { ...prevState }
    switch (action.type) {
        case 'modifyChildB':
            // 方式1：说明案例 在10-useReducer-父子通信中可见 - 此方式 有缺陷 如果有多个状态 修改一个个写出来 并且保持其他状态的值不变 直接返回一个对象 会覆盖之前声明的 状态对象initialState 内容
            // return { stateChildB: 'ChildA点击修改了子组件-ChildB' };

            // 方式2：说明案例 在10-useReducer-父子通信中可见 指定需要修改状态对象key 然后返回整个对象 只改变了 需要改变状态 其他状态不变
            newState.stateChildB = action.value || 'ChildA点击修改了子组件-ChildB'
            return newState;
        case 'modifyChildC':
            // 方式2：说明案例 在10-useReducer-父子通信中可见 指定需要修改状态对象key 然后返回整个对象 只改变了 需要改变状态 其他状态不变
            newState.stateChildC = action.value || 'ChildA点击修改了子组件-ChildC'
            return newState;
        default:
            // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
    }

}
// 状态声明对象
const initialState = {
    stateChildB: '子组件-ChildB',
    stateChildC: '子组件-ChildC',
}
// 创建context对象 （供应商） 通过 使用export 声明 可导出  子组件需要导入调用
export const GlobalContext = React.createContext();

export default function Test() {
    // 在 根组件 中 声明 useReducer 函数 其他子组件共享
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        console.log("阻止无效更新")
    }, [state])
    return (
        // 在 根组件 中 声明 GlobalContext.Provider（供应商 ）  提供服务 传入(将上方的 状态state 和 修改状态的函数dispatch) 
        <GlobalContext.Provider value={
            {
                state: state,
                dispatch: dispatch,
            }
        }>
            {console.log('useEffect注入依赖 阻止无效更新')}
            <div className='app-assembly'>
                <h1>11-useReducer+useContext-父子通信案例</h1>
                {/*
                    方式1：通过 传入 匿名函数callback给子组件 ChildA  子组件通过属性props.callback调用 传入参数msg 给父组件的dispatch修改状态函数  触发父组件的 reducer状态处理函数修改状态 
                    方式1：缺点无法进行层级太深（超过2层） ， 只适用于父子组件通信 无法进行父组件和孙子组件通信

                    推荐使用-方式2： ChildA子组件中 useContext 获取父组件声明的 GlobalContext （  React.createContext(); ）  获取父组件GlobalContext.Provider的 供应商提供的服务 value,
                    const value = useContext(GlobalContext); value中提供的服务 （state 和 dispatch ） 提供获取 value.dispatch 来修改状态
                    方式2的优点：不用管有多少层级（如进行父组件和孙子组件通信） 直接通过 const value = useContext(GlobalContext); 获取服务
                */}
                <ChildA callback={(msg) => { dispatch(msg) }} ></ChildA>
                {/* 获取父组件状态 提供props.state */}
                <ChildB state={state}></ChildB>
                {/* 获取父组件状态 使用方式2的方式：   useContext 获取父组件声明的 GlobalContext */}
                <ChildC></ChildC>
            </div>
        </GlobalContext.Provider>
    )
}
