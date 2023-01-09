/* 输入 rcc 回车可 快捷生成代码 引入react + class类组件 */

// 只有 react中使用了 export {Component} 按需导出 没有export default导出的情况下 使用 如下{Component} 的方式按需导入 进来
import React, { Component } from 'react'
// 导入嵌套子组件-轮播图 按需要导入 Swiper 默认导入 变量 k
import  k,{Swiper} from './Swiper-轮播子组件'


/*
 注意： 组件名称必须以大写字母开头。
 React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。
 你可以在深入 JSX中了解更多关于此规范的原因。
*/

 /* 嵌套子组件-头部 */
class Navbar extends Component{
    render(){
        return (
// 设置 标签 id class名（设置标签的class名需修改为className 否则与react解析时首先会当成功 class类函数组件当然16版本之后 后续解析出不是class类也是可以正常出效果但会有警告 但是16版本之前是报错并且不可正常使用 ） Child子组件接收父组件的值
            <div id='Navbar' className="Navbar-warper" title={this.props.title} >Navbar - {this.props.name} <Child url={this.props.url} ></Child>
              {/* label 标签上的 for='username'在html中的写法 （点击label标签 自动获取input焦点）  但是存在关键字for 与上方的关键字class 情况一样 效果改写 防止冲突 */}
                <label htmlFor='username'>用户名称：</label>
                <input type='text' id='username'/>
            </div>
          
        )
    }
}
console.log(k)
/* 嵌套子组件-轮播图 */
// class Swiper extends Component{
//     render(){
//         return (
//             <div>Swiper- 嵌套子组件-轮播图</div>
//         )
//     }
// }
/* 嵌套子组件-选项卡 常规函数  或使用下方的 es6 箭头函数*/
// function Tabbar(){
//     return (
//         <div>Tabbar - 嵌套子组件-选项卡</div>
//     )
// }
const Tabbar=(props)=>{return (<div>Tabbar -{props.name}</div>)}

/* 嵌套孙子组件- Child */
class Child extends Component{
    constructor(props){
        //ES6 要求，子类的构造函数必须执行一次super函数
        super();
        // 在该函数中为 this.state 赋初值
        this.state = {date: new Date()};
    }
    //  生命周期 - componentDidMount() 当 Child 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。
    //   生命周期 - componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
    componentDidMount(){
        // 设置计时器
        this.timerID = setInterval(()=>{
            this.tick()
        },1000)
    }
    // 生命周期 - componentWillUnmount 当 DOM 中 Child 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）”。
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick() {
        // setState() 用于更新状态，它接受两个参数，第一个参数可以传入一个对象，也可以传入一个updater函数。传入的对象代表需要更新的状态及状态值。updater为一个带有形参的函数，返回被更新的状态对象，可以接收到state和props；第二个参数是一个可选的回调函数，在状态更新完后进行回调。setState()并不会立即执行状态的更新，而更像是更新状态请求
        // setState() 根据场景来决定是同步还是异步
        // setState() 同步：在React无法控制的地方，比如原生事件，例如：addEventListener、setTimeout、setInterval等事件中，就只能同步更新。
        // setState() 异步：在React生命周期和合成事件中，React可以把多次setState合并到一起进行更新，提高效率。
        this.setState(function(state, props){
           return {
                date: new Date()
              }
        });
    }
    
    render(){
        // React 推荐使用行内样式 ，因为 React 觉得每一个组件但是一个独立的整体

        // 设置行内样式方式 下方两种方式 等价 // background-color 写法 要去除 - 分隔符 以驼峰的写法 backgroundColor  - 分隔符连接处首字母C大写
        // 设置行内样式方式1 传入一个对象 style={} 以key：value的形式  {}外层第一个花括号解析变量 第二个花括号解构
        var obj={
            // background-color 写法 要去除 - 分隔符 以驼峰的写法 backgroundColor  - 分隔符连接处首字母C大写
            backgroundColor:'beige',
            fontSize:'20px',
        }
         // 设置行内样式方式2 style={ {key：value} } 以key：value的形式  {}外层第一个花括号解析变量 第二个花括号解构：<img style={ {width:'50px',height:'50px'} } src={this.props.url} alt='' />
        return (
            // 创建img元素必须有一个alt属性 可设置文本 可空字符串
            <div style={obj}> Navbar - 嵌套 Child 子组件 It is {this.state.date.toLocaleTimeString()} <img className='react-logo' style={ {width:'50px',height:'50px'} } src={this.props.url} alt='' /> </div>
        )
    }
}
// 引入src之外的文件夹 需要配置  webpack.config.js内的new ModuleScopoPlugin 内容全部注释，重启项目即可 并且引入时使用 require(url)
const imglogo=require('../../public/favicon.ico')
// 可直接获取 react 内部的 Component 函数 下方 class类 继承 并 export default 导出
export default class test extends Component {
  render() {
    return (
      <div className='app-assembly'>
           <h1> 03-组件嵌套 </h1>
          {/* 03-组件嵌套 */}
          {/* 嵌套子组件-头部  将 {name: '嵌套子组件-选项卡'} 作为 props 传入Navbar class组件 this.props.namef 获取传入组件的参数 */}
          <Navbar name='嵌套子组件-头部' title='Navbar' url={imglogo} ></Navbar>
            {/* 嵌套子组件-轮播图 */}
          <Swiper></Swiper>
            {/* 嵌套子组件-选项卡  将 {name: '嵌套子组件-选项卡'} 作为 props 传入Tabbar函数组件  props.namef 获取传入组件的参数*/}
          <Tabbar  name="嵌套子组件-选项卡"></Tabbar>
      </div>
    )
  }
}
