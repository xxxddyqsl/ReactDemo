import React, { Component } from 'react'

function Child(props) {
    return (
        <div>
            Child1
            {/* React 插槽固定写法（props.children） 如果想让组件
                <Child>
                   <div>测试1111</div>
                </Child>
                内<div>测试1111</div>显示
                  学习视频中留了一行空格也可以显示 <div>测试1111</div>
                  如： （ <div>
                            Child1

                        </div>）
                但是测试-无效 当前React版本18.2.0  得使用插槽语法{props.children} 否则会被覆盖
                如果直接使用{props.children}写多次 则插多次 且不管<Child>
                    <div>测试1111</div>
                    <div>测试2222</div>
                    <div>测试3333</div>
                </Child>内部写多少内容 都是会被当成一个整体插在<Child>组件内容后面 如下
                {props.children}
                {props.children}
                {props.children}

                如想要控制<Child>
                    <div>测试1111</div>
                    <div>测试2222</div>
                    <div>测试3333</div>
                </Child>内的每一项显示 需要将其看成一个数组
                如想让<div>测试3333</div>放在第一项语法：
                {props.children[2]}
                {props.children[1]}
                {props.children[0]}
                此时渲染并不会如上面的事例 当成一个整体渲染多次 而是根据数组下标 显示渲染的位置

               */}
            {props.children}
            {/* {props.children}
            {props.children} */}
        </div>
    )
}



export default class Test extends Component {
    state = {
        text: '插槽-测试子组件内标签直接读取父组件状态'
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>09-插槽</h1>

                <Child>
                    <div>测试1111</div>
                    <div>测试2222（{this.state.text}）</div>
                    <div>测试3333</div>
                </Child>
 
            </div>
        )
    }
}
/*
1、插槽主要功能：复用性 (如果 在导航栏组件中在右侧是一个按钮 想要复用导航栏组件 但这个导航栏的右侧是一个图标此时可用插槽的方式占好右侧位置 任意插入图片或者按钮 )// 具体案例可见- 10-插槽-抽屉显示隐藏效果
2、插槽：一定程度上 减少父子通信
如上 子组件<Child><div>测试1111</div></Child>的
    内部<div>测试1111</div>写在了父组件Test内 是具有直接访问到父组件Test 内部状态 而子组件<Child> 是无法直接访问到父组件Test 内部状态
    也就是说虽然<div>测试1111</div> 最终会被插槽 插到子组件 Child内部显示 但是其本身依然具有直接读取到父组件Test 内部状态
    如上例子 <div>测试2222（{this.state.text}）</div> // 具体案例可见- 10-插槽-抽屉显示隐藏效果

*/