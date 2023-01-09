import React, { Component } from 'react'
import BetterScroll from 'better-scroll'
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

    state = {
        mytext: '生命周期-初始化阶段',
        myage: 1000,
        list: ['111', '222', '333', '444', '555', '666', '777', '888', '999', '000', '110', '112'],
    }
    /*
    新 生命周期 getDerivedStateFromProps 不可以 与 老生命周期 如:UNSAFE_componentWillReceiveProps, UNSAFE_UNSAFE_componentWillReceiveProps等 同存 否则报错
       getDerivedStateFromProps()在 render()渲染dom 执行前的最后一次修改状态的机会 
      执行多次  getDerivedStateFromProps在初始化时执行 在后续更新也会执行
     可获取 2个参数  最新的 nextProps新的属性 nextState新的状态
    */
    //必须 有一个返回的对象 可以返回空对象 也可以 返回state状态如下
    static getDerivedStateFromProps(nextProps, nextState) {
        console.log('getDerivedStateFromProps()')
        // 返回空对象
        // return {  }
        // return 返回 修改状态 getDerivedStateFromProps 内返回的对象 会和 状态state对象进行合并 同名的覆盖 不同名的保留
        return {
            mytext: 'getDerivedStateFromProps-在生命周期-初始化阶段前-执行修改状态',
        }
    }
    /*
        render()渲染dom 执行前的最后一次修改状态的机会
        componentWillMount 如老版本中使用了的需要加上 UNSAFE_componentWillMount

        不安全已弃用
    */
    // UNSAFE_componentWillMount(){

    // }


    /*
        componentDidMount 的执行意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作 这个挂载完成指的是：组件插入 DOM tree
        可以在这里调用Ajax请求，返回的数据可以通过setState使组件重新渲染，或者添加订阅，但是要在 conponentWillUnmount 中取消订阅
        可获取到真实dom
    */
    componentDidMount() {
        /*
             适合进行：
             1： 定时器 setInterval
             2：数据请求 axios
             3：订阅函数调用
             4：基于创建完的dom进行 初始化 例如：10-betterScroll滚动插件中 必须是在dom创建完成之后进行绑定调用
        */

        // 生命周期 dom创建完成 调用 初始化 betterScroll 滚动插件 并且传入要滚动的dom节点
        new BetterScroll('#wrapper')
        console.log('componentDidMount() 只渲染一次，已经挂载完了', document.querySelector('#Lifecycle'))
    }

    render() {
        console.log('render() 可多次 正在渲染中 （第一次渲染时无法拿到demo元素）', document.querySelector('#Lifecycle'))
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>01-生命周期-初始化</h1>
                <button onClick={() => this.setState({ mytext: '生命周期-更新阶段' })}>click</button>
                <div className='mytext'>{this.state.mytext + '--' + this.state.myage}</div>
                <div id='wrapper' style={{ height: '200px', overflow: 'hidden', border: '1px solid red' }}>
                    <ul>
                        {this.state.list.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        )
    }


    /*
        render()更新 渲染dom 前执行
        componentWillUpdate 如老版本中使用了的需要加上 UNSAFE_componentWillUpdate
        this.props 和this.state，不允许修改 state状态 否则状态更新触发React 重新渲染 再次调用render() 而render()更新前又会触发 UNSAFE_componentWillUpdate 所以  陷入死循环

        不安全已弃用
    */
    // UNSAFE_componentWillUpdate() {
    //     console.log('componentWillUpdate()更新前：', document.querySelector('.mytext').innerHTML)
    // }

    /*
     （取的是shouldComponentUpdate的首字母 ）  输入字母 scu + 回车 可快捷 将shouldComponentUpdate()函数编写出来
     类似的 componentDidUpdate函数也是 如（cdup）

    shouldComponentUpdate 性能优化函数：
       React 最影响性能的就是 虚拟dom 对比
       如点击修改状态 this.setState({mytext:'测试'}) 第一次点击后面React 会执行 react生命周期更新阶段流程
       第二次 点击修改状态 this.setState({mytext:'测试'})同样的值 React也还是会执行再次 react生命周期更新阶段流程
       即使是没有修改任何状态 如只是调用this.setState({})React也还是会执行再次 react生命周期更新阶段流程
       每次会进行 虚拟dom 对比 但是此时的 diff算法虚拟dom 对比是无效的 同样的值或者没有修改状态 只是调用this.setState({}) React 还执行react生命周期更新阶段流程
       比较影响性能，所以如状态修改同样的值或状态修改的空值 可阻止 组件的更新 React也就不会再次进行 虚拟dom对比 不会执行react生命周期更新阶段流程


     案例 -  02-生命周期-更新阶段性能优化函数.js 中
   */
    // 可获取 2个参数  最新的 nextProps新的属性 nextState新的状态
    shouldComponentUpdate(nextProps, nextState) {
        // return true; //   默认返回值 - 应该更新 不管任何情况 修改状态就更新组件
        // return false;//  阻止更新 不管任何情况 即使确实修改了状态 需要组件更新 也不会更新组件
        /*
            此时刚开始走更新，状态还没有更新完 所以this.state能访问到的状态为老的状态
            最新的状态在shouldComponentUpdate(nextProps,nextState)函数形参中
            老的状态:this.state
            新的状态: nextState
        */
        /*
            为了提高性能而考虑 需要增加判断 根据具体情况 进行 return true更新 或者 return false不更新 
            如下：
            if(老的状态 !== 新的状态){
                // 允许进行diff算法对比虚拟dom 更新组件
                return true;
            }else{
                // 不允许 更新 组件
                return false;
            }
        */
        console.log(this.state, nextState)
        // 此写法有缺陷： 如果 状态很多 那就需要写一堆 状态 逻辑判断 优化如下
        // if (this.state.mytext !== nextState.mytext) { return true; }
        // 优化如下：将两个状态对象 转为JSON字符串 如果状态发生变化 那转化的JSON字符串一定是不相同的 可触发更新
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true;
        }

        console.log('阻止无效更新组件');
        return false;
    }
    /*
            子组件中使用 子组件自己的状态更新 无法触发 但是 如果父组件的状态改变 引起了重新渲染 那即使没有给子组件更新 属性props 子组件的componentWillReceiveProps也会触发
            父组件 更新了 属性props触发 在已挂载的组件接收新的props之前调用。
            componentWillReceiveProps 如老版本中使用了的需要加上 UNSAFE_componentWillReceiveProps
            已弃用
        */
    /*
        此函数的意义 最先获得 父组件传入的 属性nextProps 可利用属性进行一些 逻辑 或 ajax处理
        子组件无法修改父组件传入的属性 也可把父组件传入的属性转为子组件自己的状态 如：this.steState({title:'测试测试'+nextProps.current})
   */
    // UNSAFE_componentWillReceiveProps(nextProps) {
    // this.props.mytext 此时获取到的 为老的属性  新的属性在参数 nextProps 中 
    //     console.log('componentWillReceiveProps()父组件 更新了 属性props触发：')
    // }


    //componentDidUpdate  更新完成之后执行 可获取到真实dom  组件在更新完毕后会立即被调用，首次渲染不会调用 可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。
    // 可获取 3个参数 prevProps 老的属性  prevState 老的状态 value 为getSnapshotBeforeUpdate() 执行 return 返回的值
    componentDidUpdate(prevProps, prevState,value) {
        console.log('可多次componentDidUpdate()更新后：', prevState, document.querySelector('.mytext').innerHTML)
        /*
            例：使用场景 此处 更新完成之后执行   调用 初始化 betterScroll 滚动插件 并且传入要滚动的dom节点
            缺点：每次更新 都会执行 会 多次 new BetterScroll('#wrapper') 需要增加表达式 判断是否需要 new BetterScroll('#wrapper') 以此 来防止多次执行 如下：
        */
        // prevState.list 老的列表状态 是空的时候 初始化滚动插件
        // if(prevState.list.length===0){ new BetterScroll('#wrapper')}


    }
}
