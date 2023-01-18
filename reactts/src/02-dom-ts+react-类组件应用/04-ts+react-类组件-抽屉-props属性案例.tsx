import React, { Component } from 'react'
/*
    react 类组件 在Component<约定属性,约定状态>  后面通过 泛型（Generics）写法 约定 属性或状态， 第一个泛型是约定属性，第二个泛型是约定状态
    写法如下:
    export default class App extends Component<IProps,any>
    当前并没有需要 约定状态 所以 通过any不约定状态 ，但是此处我们需要约定属性的类型，因此传入了下方的接口 IProps 来约定属性
    通过 IProps 接口 约定传入 props属性及 属性类型
*/
interface IState{
    isShow:boolean
}

export default class App extends Component<any,IState> {
    state = {
        isShow:true,
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>04-ts+react-类组件-抽屉-props属性案例</h1>
                <Navbar title={'首页'} Callback={()=>{
                    console.log('111')
                    this.setState({
                        isShow:!this.state.isShow
                    })
                }}></Navbar>
                {this.state.isShow&&<Sidebar></Sidebar>}
            </div>
        )
    }
}
interface IProps{
    // 必须有 title 属性 类型为 string 字符串
    title:string,
    // Callback 为函数
    Callback:()=>void
}
// 函数组件 - 通过 IProps （接口名）约定属性
class Navbar extends Component<IProps,any>{
    render() {
        return (
             <div>
                Navbar--{this.props.title}
                {/* // Callback 为父组件传入的回调函数 用于修改父组件的状态 */}
                <button onClick={()=>this.props.Callback()}>click-Sidebar组件是否显示</button>
             </div>
        )
    }
}
class Sidebar extends Component{
    render() {
        return (
             <div>
                Sidebar
             </div>
        )
    }
}