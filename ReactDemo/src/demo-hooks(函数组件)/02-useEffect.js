import React, { useState, useEffect } from 'react'
/*
函数组件 本身 是没有生命周期的 可通过 useEffect 模拟实现 class类 生命周期中的概念
    在 函数组件 中使用 使用 State Hooks钩子 状态记录值  必须导入 useEffect （函数组件的钩子） 或者 React.useEffect()

    异步 useEffect() 处理副作用 和 同步 useLayoutEffect() 同步执行副作用


 useEffect(() => {
    // 使用这个bom api更新网页标题
    document.title = `You clicked ${count} times`;
  },[依赖的 状态或者属性，如果传空数组表示不依赖 状态或者属性 并且useEffect钩子只会执行一次 ]);

*/
export default function Test() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState('hello world!');
    /*
        钩子 - useEffect
        第一个参数为 回调函数 需要执行的逻辑 （例如：对依赖的 状态 或者 属性 过滤逻辑等 ）  第一次 默认会执行一次
        第二个参数必须是数组的形式( 如[list]) 可注入多个依赖( 如[list,count])   需要依赖的 状态或者属性（依赖的 状态或者属性 发生改变时则useEffect再次执行，否则不触发useEffect执行），
        如果传空数组表示不依赖状态或者属性 并且useEffect钩子只会执行一次，如果此参数不穿则每次组件更新都会执行
     */
    useEffect(() => {

    }, [])
    /*
     第一次 执行一次
    并且多次点击都是 count==='test hello world!' 状态没有发生改变 则不会多次执行useEffect内的第一个参数：回调函数 减少了无意义的重复执行逻辑 请求接口 渲染dom
    当然此处是 count 首字母大写了 点击按钮修改的状态 并不等于 'Test hello world!' 所以会多次将 useEffect内的第一个参数：回调函数 执行 字符串截取首字母大写
    */
    useEffect(() => {
        // 使用这个bom api更新网页标题
        // document.title = `You clicked ${count} times`;
        // useEffect 触发 执行 的逻辑 字符串截取首字母大写+拼接后续字符串
        setCount(count.substring(0, 1).toUpperCase() + count.substring(1));
        console.log('useEffect 阻止无效更新')
        alert(1111)
        // [count] 注入useEffect第一个参数（回调函数） 执行的依赖
    }, [count]);
    return (
        <div className='app-assembly'>
        {console.log('count状态未 改变 useEffect 阻止无效更新')}

            <h1>02-hooks-useEffect</h1>
            <p>首字母大写:{count} </p>
            <button onClick={() => setCount('Test hello world!')}>
                修改count状态
            </button>
        </div>
    )
}
