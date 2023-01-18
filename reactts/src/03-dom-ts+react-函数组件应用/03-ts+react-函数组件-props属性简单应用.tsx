import React from 'react'
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
    return (
        <div className='app-assembly'>
            <h1>03-ts+react-函数组件-props属性简单应用</h1>
            <Child name={'hello, world!'} />
        </div>
    )
}
interface IProps {
    // 必须有 name属性 类型为 string 字符串
    name: string,
}
// 写法1
// function Child(props: IProps) {
//     return (
//         <div>Child--{props.name.substring(0, 1).toUpperCase() + props.name.substring(1)}</div>
//     )
// }
// 写法2
const Child:React.FC<IProps> = (props)=>{
    return (
        <div>Child--{props.name.substring(0, 1).toUpperCase() + props.name.substring(1)}</div>
    )
}