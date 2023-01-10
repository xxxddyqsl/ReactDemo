import React, { Component } from 'react'

/*
react生命周期(新版) 分为三个大阶段 以下为生命周期的执行顺序
    1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
         1.	constructor() //数据的初始化
        2.	getDerivedStateFromProps
        3.	render() //只能访问 this.props 和this.state，不允许修改 state状态和 Dom输出 否则状态更新触发React 重新渲染 再次调用render() 陷入死循环
        //componentDidMount 的执行意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作 这个挂载完成指的是：组件插入 DOM tree

        4.	componentDidMount() =====> 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
    2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
        1.	getDerivedStateFromProps
        2.	shouldComponentUpdate() //性能优化 在渲染之前被调用，默认返回为true。  在这里return false可以阻止组件的更新，但是不建议，建议使用 PureComponent
        3.	render()
        4.	getSnapshotBeforeUpdate
        5.	componentDidUpdate() 可以修改dom  组件在更新完毕后会立即被调用，首次渲染不会调用 可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。
    3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
        1.	componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息 和事件监听器


    // 父组件更新 会引发父组件下所有的子组件生命周期的更新 所以需要在子组件的shouldComponentUpdate中 进行性能优化 return false 不允许更新 提高性能

    //  老生命周期的问题：最大的负担是可能会被打断 重复的触发执行多次
        新生命周期替代 getDerivedStateFromProps -  老的生命周期  componentWillMount,componentWillReceiveProps

        新生命周期替代 getSnapshotBeforeUpdate  -  老的生命周期 componentWillUpdate
*/
export default class Test extends Component {
    state={
        mytext:'生命周期-初始化',
        myage:100,
        isCreated:true,
    }
     /*
        新 生命周期 getDerivedStateFromProps 不可以 与 老生命周期 如:UNSAFE_componentWillReceiveProps, UNSAFE_UNSAFE_componentWillReceiveProps等 同存 否则报错
        getDerivedStateFromProps()在 render()渲染dom 执行前的最后一次修改状态的机会 
        执行多次  getDerivedStateFromProps在初始化时执行 在后续更新也会执行
        可获取 2个参数  最新的 nextProps新的属性 nextState新的状态
        getDerivedStateFromProps需要配合 componentDidUpdate 使用 
    */
    //必须 有一个返回的对象 可以返回空对象 也可以 返回state状态如下
    static getDerivedStateFromProps(nextProps,nextState){
        // static声明了 getDerivedStateFromProps 为class类函数的静态方法 所以this为undefined 可通过参数nextState 访问到最新的状态
        console.log('getDerivedStateFromProps()',nextState)
        // 返回空对象
        // return {  }
        // return 返回 修改状态 getDerivedStateFromProps 内返回的对象 会和 状态state对象进行合并 同名的覆盖 不同名的保留
        return {
            mytext:nextState.mytext==='生命周期-初始化'?'getDerivedStateFromProps-在生命周期-初始化阶段前-执行修改状态':nextState.mytext,
        }
    }
    /*
        componentDidUpdate  更新完成之后执行 可获取到真实dom  组件在更新完毕后会立即被调用，首次渲染不会调用 可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。

    */
    // 可获取 3个参数 prevProps 老的属性  prevState 老的状态 value 为getSnapshotBeforeUpdate() 执行 return 返回的值
    componentDidUpdate(prevProps, prevState,value) {
        console.log('componentDidUpdate()')
    }
  render() {
    return (
      <div  className='app-assembly'>
          <h1>03-生命周期-销毁阶段</h1>
          <div>{this.state.mytext+'--'+this.state.myage}</div>
          <button onClick={()=>{this.setState({isCreated:!this.state.isCreated,mytext:'点击修改状态mytext',})}}>点击销毁组件时销毁定时器+销毁监听窗口大小</button>
          {/* {this.state.isCreated?<Child></Child>:''} */}
          {this.state.isCreated&&<Child></Child>}
      </div>
    )
  }
}
class Child extends Component{
    // 定时器
    timer=null;
    render(){
        return(
            <div>Child</div>
        )
    }
    // 生命周期 - 组件初始化时 -  执行（只执行一次）
    componentDidMount(){
        // 监听 窗口大小-拉伸窗口 即使组件销毁 还是会执行 log 打印 需要在组件生命周期销毁时同时 销毁绑定在window上的监听
        window.onresize=()=>{
            console.log('onresize')
        }
        // this.timer=setInterval(()=>{
        //     console.log('1111')
        // },1000)
    }
    // 生命周期 - 组件销毁时 -  执行
    componentWillUnmount(){
        // 销毁绑定在window上的监听
        window.onresize=null;
         // 销毁绑定在window上的定时器
        clearInterval(this.timer);
        this.timer=null;
        console.log('componentWillUnmount',this.timer);
    }
}
