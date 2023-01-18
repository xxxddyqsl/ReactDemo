import React, { Component } from 'react'


/*
    react 类组件 在Component<约定属性,约定状态>  后面通过 泛型（Generics）写法 约定 属性或状态， 第一个泛型是约定属性，第二个泛型是约定状态
    写法如下:
    export default class App extends Component<any,IState>
    当前并没有需要 约束属性 所以 通过any不约定属性 ，但是此处我们需要约定状态的类型，因此传入了下方的接口 IState 来约定状态

    在设置状态初始值时就开始 约束是否是 接口IState约定的形状
    state = {
        // 如此时 设置 name 状态初始值不是约定的 string 类型 报错：不能将类型“{ name: number; }”分配给类型“Readonly<IState>”。属性“name”的类型不兼容。不能将类型“number”分配给类型“string”
        // name:100,
    }
    在修改状态值时就也会进行 约束是否是接口IState约定的形状
    this.setState({
         // 如此时 修改 name 状态不是约定的 string 类型 报错： 不能将类型“number”分配给类型“string”
        name:1,
    })
*/
interface IState{
    name:string,
}
export default class App extends Component<any,IState> {
    state = {
        name:'hello, world!',
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>01-ts+react-类组件-state状态简单应用</h1>
                <div>{this.state.name.substring(0,1).toLocaleUpperCase()+this.state.name.substring(1)}</div>
                <button onClick={()=>{
                    this.setState({
                        name:'xiaomnig',
                    })
                }}>click</button>

            </div>
        )
    }
}