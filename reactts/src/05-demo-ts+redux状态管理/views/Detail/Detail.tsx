import React, { Component } from 'react'
// RouteComponentProps 路由自带的接口声明文件 类似自己写的ts接口  约定属性 
import {RouteComponentProps} from 'react-router-dom'
// 导入 redux
import Store from "../../redux/store"
// 约束传入的参数 属性名
interface IParam{
    myid:string
}
export default class Detail extends Component<RouteComponentProps<IParam>,any> {
    componentDidMount(): void {
        console.log(this.props,)
        // 方式1： RouteComponentProps 接口 并且不知道 params 里面有自定义的参数 myid属性 所以通过as 断言 为any 有任意属性
        // console.log((this.props.match.params as any).myid)
        // 方式2： 自定义接口IParam 传入RouteComponentProps 让 props满足追加的接口规则
        console.log(this.props.match.params.myid)

        // redux 修改 状态 隐藏底部 tabber
        Store.dispatch({type:'hide'})
    }
      // 生命周期 - 组件销毁时 -  执行
    componentWillUnmount(){
        // redux 修改 状态 显示底部 tabber
        Store.dispatch({type:'show',payload:''})
    }
  render() {
    return (
      <div>
        Detail
      </div>
    )
  }
}
