import React, { Component } from 'react'
// 复用导航栏 组件
import Navbar from './Subcomponent/Navbar'


/*
  注===> props属性 的讲解 在 './Subcomponent/Navbar' 文件内 可见 记录详解
*/
export default class TestProps extends Component {
  render() {
    // 内部定义一个变量 或者 假设 上面父组件传来的一个对象
    let obj={
      text:'测试导航栏',
      leftShow:true,
    }
    return (
      <div className='app-assembly'>
        <h1>11-props组件复用性 Navbar </h1>
        {/* React 调用 Navbar 组件，并将 {text: '导航栏1'} 作为 props 传入。 */}
        <div>
          <h2> 首页 </h2>
          <Navbar text={'首页导航栏'} leftShow={false} arr={[1, 2, 3]} />
        </div>
        <div>
          <h2> 列表 </h2>
          <Navbar text={'列表导航栏'} />
        </div>
        <div>
          <h2> 我的 </h2>
          <Navbar text={'我的导航栏'} /> 
        </div>
        <div>
          <h2> 测试 </h2>
          {/* 写法2 通过es6的对象简写 如 {..obj}  需要注意的是 obj内的 {text:'', leftShow:''} 两个值text、leftShow 键名 和 传入子组件的属性名是要一样的 */}
          <Navbar {...obj} />

        </div>
      </div>
    )
  }
}
