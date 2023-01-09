import React, { Component, useState } from 'react'

/*
  父子组件通信方式:
    （1）传递数据（父传子）与传递方法（子传父）
    （2）ref标记（父组件拿到子组件的引用 从而调用子组件的方法）

    在父组件中清除子组件的input输入框的value值。this.refs.from.reset() // 在05-ref版-表单域组件.js 中可见案例

  父传子：通过属性
  子传父：通过回调函数（父给子通过属性传入回调函数 ，子调用父传入的回调函数让父帮忙做一些事情如调用修改父内部的状态值）//在 04-父子通信版-表单域组件 中可见案例


  非父子组件通信方式：
  （1）状态提升（中间人模式） //在 06-非父子组件通信状态提升（中间人模式） 中可见案例
        React中的状态提升概括来说，就是将多个组件需要共享的状态提升到它们最近的父组件上
        在父组件上改变这个状态 然后通过 props属性分发给子组件
  （2）发布订阅模式实现 //07-非父子组件通信订阅发布模式
  （3）context状态树传参
*/
// 子组件 - 导航栏
class Navbar extends Component {
  render() {
    return (
      <div className="ggf-flex-1" style={{background:'red'}}>
        <button onClick={()=>{
          console.log('子组件通知父组件，让父组件的状态 showSidebar 修改取反');
          // 调用父组件 传入的回调函数
          this.props.callback();
        }}>点击{this.props.isShow?'隐藏':'显示'}侧边栏</button>
        <span>导航栏</span>
      </div>
    )
  }
}
// 子组件 - 侧边栏
class Sidebar extends Component{
  render() {
    return(
       <ul  style={{background:'burlywood',width:'200px'}}>
         <li>侧边栏-1111</li>
         <li>侧边栏-1111</li>
         <li>侧边栏-1111</li>
         <li>侧边栏-1111</li>
       </ul>
    )
  }
}

export default function Test() {
  const [showSidebar,setShowSidebar]= useState(true)
  return (
    <div className='app-assembly'>
      <h1>进阶01-父子通信</h1>
      {/* 给子组件传入 回调函数 子组件 通过 props.callback();调用父组件的方法修改父组件的内部状态 showSidebar 控制侧边栏 是否卸载或重新创建渲染 */}
      <Navbar callback={()=>{
        console.log('父组件给子组件传的回调函数callback ，修改状态值');
        // 函数组件 修改 自身的状态showSidebar
        setShowSidebar(!showSidebar)
        }}   isShow={showSidebar} />
        {/* showSidebar状态为true 创建渲染侧边栏组件  为false卸载 侧边栏组件*/}
     { showSidebar && <Sidebar/>}
    </div>
  )
}
