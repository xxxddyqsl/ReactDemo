import React, { Component } from 'react'
/*
react生命周期(新版) 分为三个大阶段 以下为生命周期的执行顺序
    1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
         1.	constructor() //数据的初始化
        2.	getDerivedStateFromProps
        3.	render() //只能访问 this.props 和this.state，不允许修改 state状态和 Dom输出 否则状态更新触发React 重新渲染 再次调用render() 陷入死循环
        //componentDidMount 的执行意味着初始化 只执行一次 挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作 这个挂载完成指的是：组件插入 DOM tree
        4.	componentDidMount() =====> 常用 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
    2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
        1.	getDerivedStateFromProps
        2.	shouldComponentUpdate() //在渲染之前被调用，默认返回为true。  在这里return false可以阻止组件的更新，但是不建议，建议使用 PureComponent
        3.	render()
        4.	getSnapshotBeforeUpdate
        5.	componentDidUpdate() 可以修改dom  组件在更新完毕后会立即被调用，首次渲染不会调用 可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。
    3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
        1.	componentWillUnmount()  =====> 常用 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息和事件监听器

    //  老生命周期的问题：最大的负担是可能会被打断 重复的触发执行多次
        新生命周期替代 getDerivedStateFromProps -  老的生命周期  componentWillMount,componentWillReceiveProps

        新生命周期替代 getSnapshotBeforeUpdate  -  老的生命周期 componentWillUpdate
*/
class Box extends Component {
    render() {
        console.log('Box组件的render()')
        return (
            <div style={{ width: '80px', height: '80px', float: 'left', border: '1px solid ' + (this.props.current !== '' && Number(this.props.current) === Number(this.props.index) ? 'red' : 'gray'), }}>{this.props.index}</div>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        /*
           此时刚开始走更新，状态还没有更新完 所以this.props 能访问到的属性为老的属性
           最新的状态在shouldComponentUpdate(nextProps,nextState)函数形参中
           老的属性: this.props
           新的属性: nextProps
       */
        /*
            此时有两个box需要更新 this.props.current取的是老的属性
            老的属性this.props.current 等于老的属性this.props.index 那个box 将边框 从 red 变为gray 需要允许更新组件
            新的属性nextProps.current 等于老的属性nextProps.index 那个box 将边框 从 gray 变为red 需要允许更新组件

            如  第一次输入1 （ 父组件传入 老的current==老的index的边框）需要更新将边框颜色变成gray
                第二次输入9 （父组件传入 新的current==新的index的边框）需要更新将边框颜色变成red

            其他不需要更新的box组件 不允许更新 优化性能 减少diff算法的虚拟dom对比
        */
        //    console.log(this.props,nextProps)
        if (Number(this.props.current) === Number(this.props.index) || Number(nextProps.current) === Number(nextProps.index)) {
            return true;
        }
        // console.log('阻止无效更新Box组件');
        return false;
    }
    /*
       子组件中使用 子组件自己的状态更新 无法触发 但是 如果父组件的状态改变 引起了重新渲染 那即使没有给子组件传 属性props 子组件的componentWillReceiveProps也会触发
        父组件 更新了 属性props触发 在已挂载的组件接收新的props之前调用。
        componentWillReceiveProps 如老版本中使用了的需要加上 UNSAFE_componentWillReceiveProps
        已弃用
    */

    /*
         此函数的意义 最先获得 父组件传入的 属性nextProps 可利用属性进行一些 逻辑 或 ajax处理
         子组件无法修改父组件传入的属性 也可把父组件传入的属性转为子组件自己的状态 如：this.steState({title:'测试测试'+nextProps.current})
    */
    UNSAFE_componentWillReceiveProps(nextProps) {
    // this.props 此时获取到的 为老的属性  新的属性在参数 nextProps 中  可如下优化 子组件只更新与状态值有关的需要更新 不return false阻止无效更新自身体组件
        if (Number(this.props.current) === Number(this.props.index) || Number(nextProps.current) === Number(nextProps.index)) {
            console.log('componentWillReceiveProps()父组件 更新了 属性props触发：',this.props,nextProps)
            return true;
        }
        // console.log('阻止无效更新Box组件');
        return false;
    }
}

// 父组件更新 会引发父组件下所有的子组件生命周期的更新 所以需要进行性能优化
export default class Test extends Component {
    state = {
        list: ['111', '222', '333', '444', '555', '666', '777', '888', '999', '000', '110', '112'],
        current: 0,
    }
    render() {
        console.log('render() 可多次 正在渲染中 （第一次渲染时无法拿到demo元素）', document.querySelector('#Lifecycle'))
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>02-生命周期-更新阶段-性能优化函数</h1>
                <input type='number' value={this.state.current} onChange={(event) => { this.setState({ current: event.target.value }) }} ></input>
                {/* 清除浮动 */}
                <div style={{ overflow: 'hidden' }}>
                    {/* 性能优化 控制多个子组件 是否允许更新 */}
                    {this.state.list.map((item, index) => <Box key={item} current={this.state.current} index={index} ></Box>)}
                </div>
            </div>
        )
    }

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
        /*
         if (this.state.mytext !== nextState.mytext) { return true; }
         上写法有一定缺陷： 如果 状态很多 那就需要写一堆 状态 逻辑判断 优化如下
        */
        /*
            优化如下：将两个状态对象 转为JSON字符串 如果状态发生变化 那转化的JSON字符串一定是不相同的 可触发更新 -
            注意：状态对象中属性值不能有undefined 否则转为JSON字符串 该属性会丢失
        */
        if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true;
        }

        console.log('阻止无效更新组件');
        return false;
    }



}
