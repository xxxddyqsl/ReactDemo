import React, { Component } from 'react'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
export default class Test extends Component {
    state = {
        list: [111, 222, 333]
    }
    // 初始化完成
    componentDidMount() {
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
    render() {
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>06-swiper轮播图</h1>
                {/* dom 结构 ：class名 ： className='swiper'  className='swiper-wrapper' className='swiper-slide' 必须存在  */}
                <div className='swiper' style={{ width: '400px', height: '200px', background: 'antiquewhite' }}>
                    <div className='swiper-wrapper'>
                        {this.state.list.map((item, index) => <div key={index} className='swiper-slide'>
                        {item}
                        {/* 可以放 div img 等等你需要展示的内容 */}
                        </div>)}
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
    // dom更新完成
    componentDidUpdate(){

    }
}
