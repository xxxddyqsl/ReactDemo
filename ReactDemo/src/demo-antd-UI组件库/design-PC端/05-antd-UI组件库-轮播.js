import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default function Test() {
    const onChange = (currentSlide) => {
        // console.log(currentSlide);
    };
    return (
        <div className='app-assembly'>
            <h1>05-antd-UI组件库-Carousel轮播组件</h1>
            {/* autoplay 是否开启自动轮播 - 默认false  */}
            <Carousel afterChange={onChange} autoplay={true}>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </div>
    )
}
