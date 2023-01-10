import React, { Component } from 'react'

export default class tabBar extends Component {
    state = {
        // tab选项卡 默认选中的状态
        Check: 'home',
        tabs: [
            { id: 'home', mytext: '首页' },
            { id: 'cinema', mytext: '影院' },
            { id: 'mine', mytext: '我的' }
        ]
    };
    render() {
        // render(){} 内部使用setState更新状态   状态的更新触发重新渲染render(){} 陷入死循环
        // this.setState({
        //     Check:this.props.Check
        // })
        return (
            <div className={this.props.className}>
                {
                    this.state.tabs.map((item, index) => <div className={'footer-tabs-btn ' + (this.state.Check === item.id ? "active" : "")} onClick={() => { this.tabCheck(item.id) }} key={item.id}>{item.mytext}</div>)
                }
            </div>
        )
    }
    //   点击 tab按钮 Check 更新状态
    tabCheck = (id) => {
        // 通过 setState 修改 this.state.Check 状态  通知React 更新dom
        this.setState({
            Check: id
        })
        // 通知 父组件 点击了 底部按钮 
        this.props.callback(id);
    }
}
