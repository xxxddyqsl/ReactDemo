import React, { Component } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default class Test extends Component {
    state = {
        list: []
    }
    // 初始化完成 -只执行一次
    componentDidMount() {
        // 模拟异步 1秒后更新状态塞入数据
        setTimeout(()=>{
            this.setState({
                list:[111, 222, 333]
            },()=>{
                //      setState 的第二个 参数是回调函数，  当状态和真实dom已经更新完成之后就被会触发 执行
                // 数据异步 - 初始化Swiper 轮播 方式1
                // this.initSwiper();
            })
        },1000)
       
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>07-swiper轮播图-异步</h1>
                <div className='swiper' style={{ width: '400px', height: '200px', background: 'antiquewhite' }}>
                    <div className='swiper-wrapper'>
                        {this.state.list.map((item, index) => <div key={index} className='swiper-slide'>{item}</div>)}
                    </div>
                    {/* 轮播图 - 底部 分页器 */}
                    <div className='swiper-pagination'></div>
                    {/* <!-- 如果需要导航按钮 --> */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    {/* <!-- 如果需要滚动条 --> */}
                    <div className="swiper-scrollbar"></div>
                </div>
            </div>
        )
    }
    // 生命周期 - dom更新完成 执行多次
    componentDidUpdate(){
         // 数据异步 - 初始化Swiper 轮播 方式2
         this.initSwiper();
        console.log('componentDidUpdate-dom更新完成')
    }
    // 初始化Swiper 轮播
    initSwiper(){
         // 初始化Swiper 轮播
         new Swiper('.swiper', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果想要 分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
    }
}
