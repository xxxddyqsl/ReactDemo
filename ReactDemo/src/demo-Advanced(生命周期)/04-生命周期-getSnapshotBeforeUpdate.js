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
        1.	componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息和事件监听器


    // 父组件更新 会引发父组件下所有的子组件生命周期的更新 所以需要在子组件的shouldComponentUpdate中 进行性能优化 return false 不允许更新 提高性能


    //  老生命周期的问题：最大的负担是可能会被打断 重复的触发执行多次
        新生命周期替代 getDerivedStateFromProps -  老的生命周期  componentWillMount,componentWillReceiveProps

        新生命周期替代 getSnapshotBeforeUpdate  -  老的生命周期 componentWillUpdate

*/
export default class Test extends Component {
    state={
        myText:'案例：增加list内容滚动条不改变之前查看位置',
        list:[0,1,2,3,4],
    }
    myRef=React.createRef();
    render() {
        let styleObj={
            height: '90px',
            overflow: 'auto',
            width: '200px',
            border: '1px solid red',
            margin: '20px 0',
        }
        return (
            <div className='app-assembly'>
                <h1>04-新生命周期-getSnapshotBeforeUpdate</h1>
                <div>{this.state.myText}</div>
                <button onClick={()=>{
                    this.setState({
                        myText:'2222',
                        // 增加数组 使用es6 数组合并
                        list:[...[5,6,7,8,9,10],...this.state.list]
                    })}}>add-click</button>
                <ul style={styleObj} ref={this.myRef}>
                    {this.state.list.map((item,index)=><Child key={index} index={index} item={item}></Child>)}
                </ul>
            </div>
        )
    }
    //render  执行 完后执行 getSnapshotBeforeUpdate
    getSnapshotBeforeUpdate(){
        // 记录未更新前 获取容器可滚动高度
        let boxH = this.myRef.current.scrollHeight;
        console.log('getSnapshotBeforeUpdate',boxH)
        /*
         getSnapshotBeforeUpdate 必须 return 有一个返回值 可返回空对象 如（ return{} ） 返回值在componentDidUpdate第三个参数中
            return 返回 修改状态 getDerivedStateFromProps 内返回的对象 会和 状态state对象进行合并 同名的覆盖 不同名的保留
        */
        // dom 位置 如记录某个div距离顶部的位置  返回到componentDidUpdate第三个参数中 componentDidUpdate根据返回的高度自动滚动 到该位置
        return boxH;
    }
    //componentDidUpdate  更新完成之后执行 可获取到真实dom  组件在更新完毕后会立即被调用，首次渲染不会调用 可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。
    // 可获取 3个参数 prevProps 老的属性  prevState 老的状态 value为getSnapshotBeforeUpdate() 执行 return 返回的值
    componentDidUpdate(prevProps, prevState,value) {
         // 记录更新之后 获取容器可滚动高度
         let boxH = this.myRef.current.scrollHeight;
        //更新后的滚动高度 - 更新前的滚动高度 = 更新后增加的高度
        let top=boxH- value;
        // this.myRef.current.scrollTop原已经滚动的距离 + 更新后增加的高度 = 之前看到的标签位置 - 增加内容滚动条 不改变之前查看位置
        this.myRef.current.scrollTop+=top;
        console.log(prevProps,prevState,value)

        console.log('componentDidUpdate',this.myRef.current.scrollHeight)
    }
}
class Child extends Component{
    render(){
        let styleObj={
            height: '28px',
            margin: '10px 0',
            border: '1px solid '+(this.props.index%2===0?'red':'#000' ),
        }
        return<li style={styleObj} className={this.props.index===2?'item-top':''}>{this.props.item}</li>
    }
}