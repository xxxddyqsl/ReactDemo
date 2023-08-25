// 函数组件useState 设置状态
import React, { Component, useState } from 'react'

/*
 关于受控组件和非受控组件 广义范围的理解 ：
 React组件的渲染是否被调用者（父组件）props完全控制，能完全控制的为受控组件，否则为非受控组件
*/

/*
     例： 表单-非受控组件 无状态关联
     如下： React要编写一个非受控组件，可以使用ref来从dom节点中获取表单数据，就是非受控组件

    非受控组件 缺点：如果内部包含了 一个子组件 后续无法将input的value值想 传给子组件（如 <子组件名  myvalue={myusername.current.value} />）
                    但是这无法让子组件更新接收到值 除非设置状态 将myusername.current.value同步给状态 更新状态 通知React来更新子组件
                    但是设置状态 那就是变成了 受控组件，

    非受控组件 优点： 如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

    非受控组件 适用：  如果组件不向外传值或接收外部的值 只是自己内部处理在用的情况下

*/
function Uncontrolled() {
    let stylepbj = {
        with: '200px',
        padding: '8px 16px',
        border: '1px solid red',
    }
    let myusername = React.createRef();
    return (
        <div style={stylepbj}>
            <h2>登录页-非受控表单</h2>
            {/*
                React 中 input 设置 默认值

                需要通过defaultValue='设置默认值' 设置初始值，如果通过value='设置默认值' 那将无法修改input的value值并且报错（使用value 通常是在受控组件中使用，如value={this.state.inputVal}）
                defaultValue 是设置一个初始值 之后不会在控制后续的更新，而value是覆盖dom节点中的值
            */}
            <input ref={myusername} defaultValue='非受控组件默认值' />
            <button onClick={() => {
                alert(`非受控组件:无状态 - 无法触发子组件更新`)
                console.log(myusername.current.value)
            }}>登录</button>
            <button onClick={() => {
               myusername.current.value=''
            }}>重置</button>
            {/*子组件只有第一次可以就是到值 后续没有任何的 state状态更新 子组件收不到值 （无状态 无法重新渲染更新将值再次传入子组件） */}
            <Child myusername={myusername.current&&myusername.current.value}/>
        </div>
    )
}

// input原生和React中的区别 defaultValue是非受控 value是受控

/*  例： 表单-受控组件 有状态关联
受控组件： 使React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作，被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

*/
function Controlled(){
    let styleobj = {
        with: '200px',
        padding: '8px 16px',
        border: '1px solid red',
    }
    // 设置状态
    const [username,setContent]= useState('受控组件默认值')
    return (
        <div style={styleobj}>
            <h2>登录页-受控表单</h2>
         {/* 通过onChange监听input的值 将input的值赋给状态username  状态更新React会重新渲染将username的值再次传给input  类似双向绑定*/}
            <input  value={username} onChange={(e)=>setContent(e.target.value)}/>
            <button onClick={() => {
                console.log(username)
            }}>登录</button>
            <button onClick={() => {
                // 设置状态username 清空username值
               setContent('')
            }}>重置</button>

            <Child myusername={username}/>
        </div>
    )
}
// console.log( Child)
// 子组件
class Child extends Component {
    render(){
        return(
            <div>
                <div>子组件Child-获取input：{this.props.myusername}</div>
                
            </div>
        )
    }
    test(){
        alert(111)
    }
}

export default function test() {
    return (
        <div className='app-assembly'>
            <h1>14-受控组件和非受控组件</h1>
            {/* 非受控组件 */}
            <Uncontrolled />
             {/* 受控组件 */}
             <Controlled />
        </div>
    )
}
