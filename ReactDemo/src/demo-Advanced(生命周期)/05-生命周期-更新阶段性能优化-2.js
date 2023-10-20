import React, { PureComponent } from 'react'
/*
    React性能优化：
    1：使用 shouldComponentUpdate 需要手动判断状态 控制组件自身或子组件是否需要更新 尤其是在子组件比较多的情况下，需要进行优化 案例可见 02-生命周期-更新阶段性能优化-1.js
    2：使用 PureComponent 会帮你 比较新的属性prop 和 老的属性prop 比较新的状态state 和 老的状态state （值相等，或者对象含有相同的属性、且属性值相等），
    决定 shouldComponentUpdate 返回true 或者 返回 false ，从而决定要不要呼叫 return function。

    注意： PureComponent不适用的场景注意：如果你的 state 或者props 永远都会变 ， 那PureComponent并不会比较快，
    因为 shallowEqual（对比新老状态state或属性prop） 也需要花时间 ，如在倒计时组件这种状态或者属性一直在变化的组件中 PureComponent并不适用优化

    PureComponent内的 对比当前对象和下一个状态的 prop 和 state ，而这个比较属于浅比较，比较基本数据类型是否相同，而对于引用数据类型，比较的是它的引用地址是否相同，这个比较与内容无关
*/
export default class Test extends PureComponent {
     state={
         myText:'测试',
     }
    render() {
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>05-生命周期-更新阶段性能优化- PureComponent</h1>
                <div>{this.state.myText}</div>
                <button onClick={()=>{this.setState({myText:'PureComponent阻止组件重复无意义的更新'})}}>组件更新</button>
            </div>
        )
    }
    //componentDidUpdate  更新完成之后执行
    componentDidUpdate(prevProps, prevState,value) {
        console.log('componentDidUpdate()')
    }
}
