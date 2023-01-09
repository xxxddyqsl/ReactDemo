import React, { Component } from 'react'
// 导入 自己基于swiper插件二次封装的 轮播
import  KSwiper,{SwiperItem} from '../encapsulation/轮播图'
import axios from 'axios'
export default class Test extends Component {
    url = 'https://m.maizuo.com/gateway';
    state = {
        list: []
    }
    componentDidMount(){
        axios({
            url: this.url,
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"163954165652311270166529","bc":"110100"}',
                'X-Host': 'mall.cfg.common-banner'
            },
            params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 7398342 }
        }).then((res) => {
            // console.log(res.data)
            if (res.data && res.data.status === 0) {
                this.setState(() => {
                    return {
                        list: res.data.data
                    }
                }, () => {
                    // console.log(this.state.list)
                })
            }
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1 id='Lifecycle'>08-swiper轮播图-组件+插槽</h1>
                {/* loop 控制 swiper 插件 是否循环播放 */}
                <KSwiper loop={true}>
                    {/* 插槽 */}
                    {/* 将插入的 <div className='swiper-slide'>1111</div> 继续封装*/}
                    {/* <SwiperItem>1111</SwiperItem>
                    <SwiperItem>
                        <img src={require('../../public/favicon.ico')} style={ {width:'30px',height:'30px'} } alt='' title='插槽：复用性'></img>
                        <span>2222</span>
                    </SwiperItem>
                    <SwiperItem>333</SwiperItem> */}

                    {this.state.list.map((item, index) =>{
                      return (
                        <SwiperItem key={item.bannerId}>
                            {/* //通过插槽 封装 可任意定义 轮播图片 或者 文字 */}
                            <img src={item.imgUrl} style={ {width:'100%',height:'auto'} } alt='' title={item.name}></img>
                        </SwiperItem>
                      )
                    })}
                </KSwiper>
            </div>
        )
    }
}
