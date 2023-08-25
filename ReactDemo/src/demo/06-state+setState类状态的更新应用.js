import React, { Component } from 'react'


// React class类 挂载数据方式 ：必须使用 state + setState 设置状态 否则 React 无法更新重新渲染页面dom
export default class TextState extends Component {
    text = '无状态-收藏-不会更新重新渲染dom';
    // 方式1：
    //   constructor(props){
    //       super(props); //super函数 是继承Test 类的所有成员属性 和方法
    //     this.state={
    //         newText:'收藏',
    //         myShow:true,
    //     }
    //   }
    // 方式2：
    state = {
        newText: 'state状态-收藏',
        myShow: true,
        myname:'测试',
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>06-state+setState类状态的应用+{this.state.myname}</h1>
                <div>
                    <div>
                        例子1-未使用 state + setState 更新状态：点击收藏按钮 收藏变成 取消收藏 只是修改text变量值 查看react是否会更新重新渲染dom
                    </div>
                    <button onClick={() => {
                        alert('点击收藏');
                        this.text = '无状态-取消收藏-不会更新重新渲染dom';
                        console.log('变量text值已经改变：', this.text);
                    }}>{this.text}</button>
                </div>
                <div>
                    <div>
                        例子2-使用 state + setState 更新状态：点击收藏按钮 收藏变成 取消收藏 修改 newText 状态变量值 查看react是否会更新重新渲染dom
                    </div>
                    <button onClick={() => {
                        // 必须通过 setState 修改状态 通过React 更新
                        this.setState({
                            newText: (!this.state.newText.includes('取消收藏') ? '取消收藏' : 'state状态-收藏')
                        });
                        console.log('变量 newText 值已经改变：', this.state.newText);
                    }}>{this.state.newText}</button>
                    <button onClick={() => {
                        // 必须通过 setState 修改状态 通过React 更新 , 可修改多个值
                        this.setState({
                            myShow: !this.state.myShow,
                            myname:'测试-ccc'
                        })
                        console.log('变量 myShow 值已经改变：', this.state.myShow);
                    }}>{ this.state.myShow+'：' + (this.state.myShow ? '收藏' : '取消收藏')}</button>
                </div>
                <div>说明：this.state 是纯js对象，在vue中 date属性是利用Object.defineProperty处理过的，更改数据时会触发getter和setter，但是React中没有这样的处理，
                    如果直接更改的话，React是无法得知的，所以需要使用特殊的更改状态的方法 setState() 。</div>
            </div>
        )
    }
}
