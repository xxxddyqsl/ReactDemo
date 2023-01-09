import React, { Component } from 'react'

import axios from 'axios'
/*
    引入自定义封装的订阅发布模式 -  最下方有详解
*/
import PublishingMode from '../encapsulation/EncapsulatePublishSubscription'
// console.log(PublishingMode)
/*
  非父子组件通信方式： 
  （2）发布订阅模式实现
*/

class FilmItem extends Component {
    render() {
        return (
            <li className='main-tabs-item ' onClick={() => {
                // 发布者 点击调用订阅者传入的回调函数 将通信的信息以参数的方式传入 +  传入订阅人id+发布者id (方便利用key监听区分不同订阅+发布者的调用)
                PublishingMode.publish({ title: this.props.item.name, content: this.props.item.synopsis },{SubscriptionID:'demoA',PublishingID:'test'});
            }}>
                <img className='main-tabs-item-img' src={this.props.item.poster} alt={this.props.item.name} />
                <div className=' '>
                    <div className='main-tabs-item-name' title={this.props.item.name}>
                        {this.props.item.name}
                    </div>
                </div>

            </li>
        )
    }
}
class FilmDetail extends Component {
    state={
        msg:{}
    }
    componentDidMount(){
        // 订阅者 通过传入回调函数进入队列 发布者发布内容后触发调用订阅者传入的回调函数 + 传入订阅人id+发布者id (方便利用key监听区分不同订阅+发布者的调用)
        PublishingMode.subscribe((value) => {
            // console.log('订阅者:', value);
            // 获取到发布者 传入的参数 更新状态  重新渲染子组件
            this.setState({
                msg:{...value}
            },()=>{
                // 更新状态为异步  setState 的第二个 参数是回调函数 当状态和真实dom已经更新完成之后就被会触发
                console.log(this.state.msg)

            })
        },{SubscriptionID:'demoA',PublishingID:'test'});
    }
    styleObj = {
        flex: '1',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    }
    render() {
        const {title,content} =  this.state.msg
        return (
            <div style={this.styleObj}>
                FilmDetail
                <h3>{title}</h3>
                <div>{content}</div>
            </div>
        )
    }
}
export default class Test extends Component {
    // url = 'https://m.maizuo.com/gateway';
    // 获取本地 public静态资源文件下的 测试数据 json文件
    url = '/demo.json' || 'http://localhost:3000/demo.json'
    state = {
        FilmList: [],
    }
    //   生命周期 - componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        // 加载 完成 后 请求接口
        this.getAjax();
    }
    // 生命周期 - componentWillUnmount 。这在 React 中被称为“卸载（unmount）”。
    componentWillUnmount() {
    }
    getAjax() {
        axios({
            url: this.url,
            // method: 'get',
            // headers: {
            //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
            //     'X-Host': 'mall.film-ticket.film.list'
            // },
            // params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 781038 }
        }).then((res) => {
            // console.log(res.data)
            if (res.data && res.data.status === 0) {
                this.setState(() => {
                    return {
                        FilmList: res.data.data.films
                    }
                }, () => {
                    // console.log(JSON.stringify(this.state.FilmList))
                })
            }
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>07-非父子组件通信订阅发布模式</h1>
                <div className='gg-flex-4' style={{ width: '600px', border: '1px solid ', height: '400px', }}>
                    {/* 子组件 左侧列表 */}
                    <ul style={{ width: '300px', borderRight: '1px solid ', height: '100%', overflow: 'auto' }}>
                        {this.state.FilmList.map((item, index) => <FilmItem item={item} key={item.filmId}/> )}
                    </ul>
                    {/* 子组件 右侧显示列表的电影名称+内容介绍 */}
                    <FilmDetail  />
                    {/* <button onClick={()=>{PublishingMode.Unsubscribe({SubscriptionID:'demoA',PublishingID:'test'})}}>取消订阅</button> */}
                </div>
            </div>
        )
    }
}




/*
    订阅发布模式 解析
*/
var bus = {
    list: [],
    //  订阅
    subscribe(callback) {
        // 通过临时变量 将传入的回调函数 临时存入 list 队列中 方便后续订阅函数publish调用
        this.list.push(callback)
    },
    // 发布
    publish(value) {
        // 遍历所有的this.list列表，将回调函数执行
        console.log(this.list);
        this.list.forEach(callback => {
            // callback 为真 执行回调函数
            callback && callback(value);
        })
    }
}
// 用户订阅者 通过传入回调函数
bus.subscribe((value) => {
    console.log(1111, value)
})
bus.subscribe((value) => {
    console.log(222, value)
})


setTimeout(() => {
    // 发布者
    bus.publish('发布者传入参数')
}, 10)


// Redux 基于订阅发布