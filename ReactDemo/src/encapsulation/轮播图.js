/*
    学习 封装组件 造轮子

    使用 swiper 插件 封装轮播图组件
*/
import React, { Component } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
// 封装 轮播图的内部每一个 item <div className='swiper-slide'></div>
export class SwiperItem extends Component {
    render() {
        return (
            <div className='swiper-slide'>
                {/* 插槽 */}
                {this.props.children}
            </div>
        )
    }
}
export default class Test extends Component {
    // 初始化完成 -只执行一次
    componentDidMount() {
        // 同步数据 - 初始化Swiper 轮播
        this.initSwiper();
        // console.log(this.props)
        console.log('初始化Swiper 轮播')
    }
    render() {
        return (
            <div className='swiper' style={{ width: '400px', minHeight: '130px', background: 'antiquewhite' }}>
                <div className='swiper-wrapper'>
                    {/* 插槽 */}
                    {this.props.children}
                </div>
                {/* 轮播图 - 底部 分页器 */}
                <div className='swiper-pagination'></div>
                {/* <!-- 如果需要导航按钮 --> */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                {/* <!-- 如果需要滚动条 --> */}
                {/* <div className="swiper-scrollbar"></div> */}
            </div>
        )
    }
    // 生命周期 - dom更新完成 执行多次
    componentDidUpdate() {
        // 数据异步 - 初始化Swiper 轮播 方式2
        this.initSwiper();
        console.log('componentDidUpdate-dom更新完成')
    }
    // 初始化Swiper 轮播
    initSwiper() {
        // 初始化Swiper 轮播
        new Swiper('.swiper', {
            // direction: 'vertical', // 垂直切换选项
            // 循环模式 播放
            loop: this.props.loop,
            // 如果想要 分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
          // 自动滑动   可简写 autoplay: true
            autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                // 手动滑动后， 继续恢复自动滑动
                disableOnInteraction: false
            }
            // 如果需要滚动条
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
    }
}
