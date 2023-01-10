import React, { useState, useEffect } from 'react'

export default function Test() {
    const [isCreated,setIsCreated]=useState(true);
    
    return (
        <div className='app-assembly'>
            <h1>04-hooks-useEffect-销毁案例</h1>
            <button onClick={()=>{setIsCreated(false)}}>点击销毁组件时销毁定时器+销毁监听窗口大小</button>
            {isCreated&&<Child></Child>}
        </div>
    )
}

function Child(props){
    useEffect(()=>{
        window.onresize=()=>{
            console.log('onresize')
        }
        // var timer=setInterval(()=>{
        //     console.log('1111')
        // },1000)
        /*
            如果 useEffect 没有注入任何依赖(传入的空数组[]) 的情况下useEffect只执行一次 下方的 return()=>{}同样是只执行一次 并且是在组件销毁时 执行

            如果 useEffect 注入了依赖（[XXX]）那每次依赖改变 更新时 useEffect会执行并且下方的 return()=>{}同样也会再次执行次

            总结：
                1：在useEffect有依赖的情况下 return()=>{} 在更新和组件销毁时都会执行 （每次更新都会执行）

                2：在useEffect 没有依赖的情况下 return()=>{} 只有在组件销毁时会执行 （只执行一次）

        */
        return ()=>{
            // 销毁 监听窗口 大小
            window.onresize=null;
            // 销毁 定时器
            // clearInterval(timer)
            console.log('useEffect-组件销毁时触发')
        }
    },[])
    return(
        <div>Child</div>
    )
}