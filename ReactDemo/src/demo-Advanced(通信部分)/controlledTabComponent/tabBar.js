import React, { Component } from 'react'

// 无状态 组件 完全受父组件控制

// class 类组件方式
// export default class tabBar extends Component {
//     render() {
//         return (
//             <div className={this.props.className}>
//                 {
//                     this.props.tabs.map((item, index) => <div className={'footer-tabs-btn ' + (this.props.Check === item.id ? "active" : "")} onClick={() => { this.tabCheck(item.id) }} key={item.id}>{item.mytext}</div>)
//                 }
//             </div>
//         )
//     }
//     //   点击 tab按钮 Check 更新状态
//     tabCheck = (id) => {
//         // 通知 父组件选中更新状态 点击了 底部按钮
//         this.props.callback(id);
//     }
// }


// 无状态 - 函数组件方式
const TabBar=(props)=>{
    return (
        <div className={props.className}>
            {
                props.tabs.map((item, index) =>{
                  return(
                    // 调用父组件传入的回调函数callback 通知 父组件 修改选中的状态Check 父组件在传入子组件 子组件通过props调用
                    <div className={'footer-tabs-btn ' + (props.Check === item.id ? "active" : "")} onClick={() => {props.callback(item.id) }} key={item.id}>{item.mytext}</div>
                  )
                })
            }
        </div>
    )
}
export default TabBar