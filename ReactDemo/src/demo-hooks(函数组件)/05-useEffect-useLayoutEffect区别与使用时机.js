import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

/*
    useEffect 和 useLayoutEffect 的区别
    简单来说就是调用的时机不同  useLayoutEffect和原来的 componentDidMount 和 componentDidUpdate 一致，在React完成DOM更新后马上同步调用的代码，会阻塞页面渲染，
    而useEffect 是合在整个页面渲染完才会调用的代码

    官方建议优先使用 useEffect
    在实际使用时如果想避免 页面抖动 （在 useEffect中修改dom很可能出现）的话，可以把需要操作DOM的代码 放在 useLayoutEffect 中，在useLayoutEffect里面做DOM操作，
    这些dom修改会和 React做出的更改的一起被一次性渲染到屏幕上，只有一次回流，重绘的代价

    首先要说明的是，useLayoutEffect和useEffect很像，函数签名也是一样。唯一的不同点就是useEffect是异步执行，而useLayoutEffect是同步执行的。 当函数组件刷新（渲染）时，包含useEffect的组件整个运行过程如下：

    useEffect是异步执行，而且是在渲染被绘制到屏幕之后执行。流程如下:
        1: 触发组件重新渲染（通过改变组件state或者组件的父组件重新渲染，导致子节点渲染）。
        2: 组件函数执行。
        3: 组件渲染后呈现到屏幕上。
        4:  useEffect hook执行。

    useLayoutEffect是同步执行，时机在渲染之后但在屏幕更新之前。 流程如下:
        1:触发组件重新渲染（通过改变组件state或者组件的父组件重新渲染，导致子组件渲染）。
        2: 组件函数执行。
        3:useLayoutEffect hook执行, React等待useLayoutEffect的函数执行完毕。
        4:组件渲染后呈现到屏幕上。

    useEffect异步执行的优点是，react渲染组件不必等待useEffect函数执行完毕，造成阻塞。
    百分之99的情况，使用useEffect就可以了，唯一需要用到useLayoutEffect的情况就是，在使用useEffect的情况下，我们的屏幕会出现闪烁的情况（组件在很短的时间内渲染了两次）。
*/

export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>05-hooks-useEffect和useLayoutEffect的区别与使用时机</h1>
            <ChildUseEffect />
            <div style={{color:'red'}}>使用useEffect时-可以清楚的看到有一个一闪而过的变化.</div>
            <br></br><br></br>
            <ChildUseLayoutEffect />
            <div style={{color:'red'}}>使用useLayoutEffect时-可以看出,每次刷新,页面基本没变化.</div>
        </div>
    )
}
function ChildUseEffect(props) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (value === 0) {
            setValue(10 + Math.random() * 200);
        }
    }, [value]);
    console.log("render", value);
    return (
        <div>
            <div>  value: {value}</div>
            <button onClick={() => setValue(0)}>useEffect时点击</button>
        </div>
    );
}

function ChildUseLayoutEffect(props) {
    const [value, setValue] = useState(0);
    useLayoutEffect(() => {
        if (value === 0) {
            setValue(10 + Math.random() * 200);
        }
    }, [value]);
    return (
        <div>
            <div>  value: {value}</div>
            <button onClick={() => setValue(0)}>useLayoutEffect时点击</button>
        </div>
    )
}