import React, { Component } from 'react'
/*
    react 类组件 在Component<约定属性,约定状态>  后面通过 泛型（Generics）写法 约定 属性或状态， 第一个泛型是约定属性，第二个泛型是约定状态
    写法如下:
    export default class App extends Component<IProps,any>
    当前并没有需要 约定状态 所以 通过any不约定状态 ，但是此处我们需要约定属性的类型，因此传入了下方的接口 IProps 来约定属性
    通过 IProps 接口 约定传入 props属性及 属性类型
*/


export default class App extends Component {
    state = {
        name:'hello, world!',
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>03-ts+react-类组件-props属性简单应用</h1>
                <Child name={'dddd'}></Child>
            </div>
        )
    }
}
interface IProps{
    // 必须有 name属性 类型为 string 字符串
    name:string,
}
class Child extends Component<IProps,any>{
    render() {
        return (
             <div>
                Child--{this.props.name}
             </div>
        )
    }
}