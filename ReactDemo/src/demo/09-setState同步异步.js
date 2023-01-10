import React, { Component } from 'react'

export default class Test extends Component {
    state = {
        count: 1
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>09-React 18版本前后 setState同步异步</h1>
                <div>
                    {this.state.count}
                </div>
                <button onClick={() => { this.setCountA() }}>计数器A</button>
                <button onClick={() => { this.setCountB() }}>计数器B</button>
            </div>
        )
    }
    /*
        React 18版本 以前：
        setState 处于在同步逻辑中， 异步更新状态，异步更新真实dom
        setState 处于在异步逻辑中， 同步更新状态 ，同步更新真实dom

        React 18版本后的新特性-setState：
        setState 不管是处于在异步还是同步逻辑中， 都是 异步更新状态，异步更新真实dom
        React 18 带来的优化就是可以在任何情况下进行渲染优化了（异步回调函数，promise，定时器）的回调函数中调用多次的 setState 也会进行合并渲染
        开启这个特性的前提是，在index.js中 将 ReactDOM.render 替换为 ReactDOM.createRoot 调用方式。


        setState 的第二个 参数是回调函数，  当状态和真实dom已经更新完成之后就被会触发 执行

       */
    //   在同步逻辑中调用 setState
    setCountA = () => {
        //  第一次 调用  setState 提交给 react （setState为异步不会阻塞代码执行 此时this.state.count值还是1 并且代码继续往下执行） 
        this.setState({
            count: this.state.count + 1
        }, () => {
            //  setState 第二个 参数 为回调函数，  状态和真实dom已经更新完成之后会触发 执行回调 同时查看打印 可看到 返回1：在最后
            console.log('返回1：', this.state.count)
        })

        //  第二次 调用  setState 提交给react （setState为异步不会阻塞代码执行 此时this.state.count值还是1 并且代码继续往下执行）
        this.setState({
            count: this.state.count + 1
        })
        console.log('返回2：', this.state.count)
        //  第三次 调用  setState 提交给react （setState为异步不会阻塞代码执行 此时this.state.count值也还是1 并且代码继续往下执行）
        this.setState({
            count: this.state.count + 1
        })
        /*
        等待 主进程空闲之后  setState 才会进行异步的更新状态 异步的对比dom 最后更新真实dom

            在 React 中会将多次setState合并到一次进行渲染

         React 出于性能考虑 多个setState 会进行合并处理 所以没有立即做状态的更新 而是等待一个事件执行结束之后 在下一个宏任务中把 count状态更新
        */
        console.log('返回3：', this.state.count)
    }
    // 在异步逻辑中调用
    setCountB = () => {
        setTimeout(() => {
            //  第一次 调用  setState 提交给 react （setState为异步不会阻塞代码执行 此时this.state.count值还是1 并且代码继续往下执行） 
            this.setState({
                count: this.state.count + 1
            })
            console.log('返回：', this.state.count)
            //  第二次 调用  setState 提交给react （setState为异步不会阻塞代码执行 此时this.state.count值还是1 并且代码继续往下执行）
            this.setState({
                count: this.state.count + 1
            })
            console.log('返回：', this.state.count)
            //  第三次 调用  setState 提交给react （setState为异步不会阻塞代码执行 此时this.state.count值也还是1 并且代码继续往下执行）
            this.setState({
                count: this.state.count + 1
            })
            console.log('返回：', this.state.count)
        }, 0)
    }
}
