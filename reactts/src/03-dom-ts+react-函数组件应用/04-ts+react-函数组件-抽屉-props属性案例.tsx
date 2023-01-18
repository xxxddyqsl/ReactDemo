import React, { useState } from 'react'
/*
    react 函数组件 通过 interface接口 约定属性
    写法1如下:
    function Child(props:IProps){
        return (
            <div>Child--</div>
        )
    }
    直接在形参后面 通过 :IProps （接口名）约定属性
    通过 IProps 接口 约定传入 props属性及 属性类型

    // 写法2
    const Child:React.FC<IProps> = (props)=>{
        return (
            <div>Child--{props.name.substring(0, 1).toUpperCase() + props.name.substring(1)}</div>
        )
    }
    React.FC<>是函数式组件在TypeScript使用的一个泛型，FC就是FunctionComponent的缩写，事实上React.FC可以写成React.FunctionComponent。
*/
export default function App() {
    const [isShow,steIsShow]=useState<boolean>(true)
    return (
        <div className='app-assembly'>
            <h1>04-ts+react-函数组件-抽屉-props属性案例</h1>
            <Navbar title={'首页'} Callback={()=>{steIsShow(!isShow)}}></Navbar>
            {isShow&&<Sidebar/>}
        </div>
    )
}
interface IProps{
    title?:string,//可选属性 可不传
    Callback:()=>void,
}
// 函数组件 - 通过 IProps （接口名）约定属性
const Navbar:React.FC<IProps>=(props)=>{
    return(
        <div>
            Navbar--{props.title}
            <button onClick={()=>props.Callback()}>click-Sidebar组件是否显示</button>
        </div>
    )
}
function Sidebar(){
    return(
        <div>Sidebar--</div>
    )
}