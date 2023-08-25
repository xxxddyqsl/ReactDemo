// 函数组件useState 设置状态
import React, { Component, useState } from 'react'


/*
  属性(props) vs 状态 (state)

  相似点：都是纯js对象，都会触发render更新，都具有确定性（状态/属性相同，结果相同）

  不同点：
  1、props属性能从父组件获取，状态不能
  2、props属性可由父组件修改，状态不能
  3、props属性能在内部设置默认值，状态也可以 ，设置方式不一样
  4、props属性不在组件内部修改，状态要在组件内部修改
  5、props属性能设置子组件初始值，状态不可以
  6、props属性可以修改子组件的值，状态不可以

  state 状态主要作用是用于组件保存、控制、修改自己的可变状态。state在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改，
  你可以认为 state 是局部的、只能被组件自身控制的数据源，state中状态在 class类组件中可以通过this.setState({count:this.state.count+1})方法更新 、
  在函数组件中可通过 const [count, setCount] = useState(0); 自定义声明的setCount(count+1) 修改state状态, 修改状态会导致组件的重新渲染


  props 的主要作用是让使用该组件的父组件传入参数配置该组件，它是外部传进来的配置参数，组件内部无法控制也无法修改，除非外部主动传入新的props，否则组件的props永远保持不变。

  没有state状态的组件叫无状态组件（stateless component），设置了 state状态的叫有状态组件（stateful component）， 因为状态会带来管理的复杂性，我们尽量多的写无状态组件（多写props属性 少写state状态），
  我们尽量少的写有状态组件，这样会降低代码的维护难度，也在一定程度上增强了组件的复用性

*/


// 子组件
class Child extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.text}
        </div>
        <br/>
        <div>

        {/* 父组件传入的props值 在子组件中不可修改为只读 否则报错 */}
        <button onClick={() => { alert(`子组件修改父组件传入的属性报错`); this.props.text = '子组件-修改父组件传入的props值'; }}>子组件-修改父组件传入的props值</button>
        </div>
        <br/>
        <button onClick={()=>{
          this.props.Callback('子组件-子组件-通知 父组件修改状态')
        }}>
          {/* 调用 - 父组件传入的回调函数 */}
          子组件-通知 父组件 修改状态
        </button>
      </div>
    )
  }
}


export default function Test() {
  // 设置 函数 状态 只能通过useState设置 content状态 自定义的setContent修改状态名
  const [content, setContent] = useState('父组件传入的props');
  return (
    <div className='app-assembly'>
      <h1>13-属性(props)vs状态(state)</h1>
      <button onClick={() => {
        setContent('父组件修改了')
      }}>父组件-修改props值</button>
      {/* 给子组件 传入 props属性 text */}
      <Child text={content} Callback={(value)=>{
        console.log(value)
        setContent(value)
      }} />
    </div>
  )
}

