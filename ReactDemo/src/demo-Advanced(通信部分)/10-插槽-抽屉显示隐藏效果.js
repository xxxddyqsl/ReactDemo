import React, { Component, useState } from 'react'
 
// 子组件 - 导航栏
class Navbar extends Component {
  render() {
    return (
      <div className="gg-flex-3" style={{background:'red'}}>
          {/* 通过 {props.children}插槽的方式  将button 按钮 插入该位置显示 */}
        {this.props.children[0]}
        <div style={{width:'300px',textAlign:'center'}}>导航栏</div>
        {this.props.children[1]}
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
      <h1>10-插槽-抽屉显示隐藏效果</h1>
      {/*  通过 {props.children}插槽的方式  将button 按钮 插入 子组件<Navbar></Navbar>内部 显示button 按钮
        并且button 按钮 是写在了父组件Test内部的虽然 <button>点击{this.props.isShow?'隐藏':'显示'}侧边栏</button> 按钮 最终会被插槽 插到子组件 Child内部显示
        但是其本身依然具有直接读取到父组件Test 内部状态的 如下 可直接使用 setShowSidebar(!showSidebar) 修改Test父组件状态showSidebar
        
        因此 插槽 一定程度上是可以减少父子通信的
      */}
      <Navbar>
      <button onClick={()=>{
        //  插槽：一定程度上 减少父子通信  直接读取父组件状态showSidebar 并且修改状态
          setShowSidebar(!showSidebar);
        }}>点击{showSidebar?'隐藏':'显示'}侧边栏</button>

        {/* 插槽主要功能:复用性 (如果 在导航栏组件中在右侧是一个按钮 想要复用导航栏组件 但这个导航栏的右侧
            是一个图标此时可用插槽的方式占好右侧位置 任意插入图片或者按钮 ) 如下在导航栏组件右侧插入 img图标 或者 按钮*/}
        {/* <img src={require('../../public/favicon.ico')} style={ {width:'30px',height:'30px'} } alt='' title='插槽：复用性'></img> */}
        <button>插槽：复用性</button>
      </Navbar>
        {/* showSidebar状态为true 创建渲染侧边栏组件  为false卸载 侧边栏组件*/}
     { showSidebar && <Sidebar/>}
    </div>
  )
}
