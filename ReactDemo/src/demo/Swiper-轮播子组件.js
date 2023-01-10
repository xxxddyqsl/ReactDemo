import React, { Component } from 'react'

/*
 注意： 组件名称必须以大写字母开头。
 React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。
 你可以在深入 JSX中了解更多关于此规范的原因。
*/

/* 嵌套子组件-轮播图 */
class Swiper extends Component{
    render(){
        return (
           // 设置 标签 id class名 （设置标签的class名需修改为className 否则与 函数组件class重名 引起报错）
            <div id='Swiper' className='Swiper-warper'>Swiper - 嵌套子组件-轮播图333</div>
        )
    }
}
// 按需要导出方式
export  {Swiper}
var k = '测试导出方式1'
// 默认导出方式
export default k;
