import React, { Component } from 'react'

// 校验 值类型
import kerwinPropsType from 'prop-types'

export default class Navbar extends Component {
    // 使用 ES6中的静态属性关键字static 直接将propTypes声明为静态属性   对父组件传入值 props属性 进行校验
    static propTypes = {
        // 校验 传入 arr 是否是 数组
        arr: kerwinPropsType.array,
        // 校验 传入 text 是否是 字符串
        text: kerwinPropsType.string,
        // 校验 传入 leftShow 是否是 布尔值
        leftShow: kerwinPropsType.bool
    }
    // 设置 默认值 如 父组件未传入leftShow值 调用通过defaultProps设置 props属性 的默认值 ，如果父组件传入了leftShow  父组件传的值覆盖通过defaultProps 默认的值 
    static defaultProps = {
        // 设置默认值 默认 导航栏的 返回按钮为显示
        leftShow: true
    }
    // props属性 是父组件传入的 取值方式1：通过 this.props.text 获取到对应的值
    render() {
        // console.log(kerwinPropsType, this.props);
        
        // 取值 方式2：  也可 通过ES6的解构 取出text 如下：
        let { text } = this.props;
        return (
            <div className='gg-flex-4'>
                {this.props.leftShow && <button>返回</button>}
                {/* 取值方式1：{this.props.text} */}
                {/* <div> {this.props.text}</div> */}
                {/* ES6解构 取值方式2： {text} */}
                <div>{text}</div>
                <div> {this.props.arr}</div>
                <button>首页</button>
            </div>
        )
    }
}
/*
 类属性设置默认值 方式1：如下 使用 Navbar.defaultProps 写在class Navbar 类的外部
设置 默认值 如 父组件未传入leftShow 调用通过defaultProps设置的默认值 ，如果父组件传入了leftShow  父组件传的值覆盖通过defaultProps 默认的值 

如果未使用defaultProps设置leftShow默认值 并且父组件也未传入leftShow，组件中通过this.props.leftShow 为undefined

类属性设置默认值 方式2： 使用 ES6中的静态属性static 直接将 defaultProps 声明为静态属性 写在class Navbar 类的内部 如
 export default class Navbar extends Component {
     static defaultProps={
          // 设置默认值 默认 导航栏的 返回按钮为显示
            leftShow:true
     }
 }
 //  完整实例 看上面 class 类 Navbar里
*/

// Navbar.defaultProps={
//     // 设置默认值 默认 导航栏的 返回按钮为显示
//     leftShow:true
// }




/*
 类属性 校验方式1：如下 使用 Navbar.propTypes 写在class Navbar 类的外部
 使用 Navbar.propTypes 校验props 接收到的父组件传入的值类型 如上方的 this.props.leftShow 传入的值必须为布尔值true或false 如果传入的是字符串 'true'或'false' 传入的值不通过
 有利用后期维护


 类属性 校验方式2： 使用 ES6中的静态属性static 直接将propTypes声明为静态属性 写在class Navbar 类的内部 如
 export default class Navbar extends Component {
     static propTypes={
          arr:kerwinPropsType.array,
        // 校验 传入 text 是否是 字符串
        text:kerwinPropsType.string,
        // 校验 传入 leftShow 是否是 布尔值
        leftShow:kerwinPropsType.bool
     }
 }
//  完整实例 看上面

*/

// 类属性 校验方式1：
// Navbar.propTypes = {
//     arr:kerwinPropsType.array,
//     // 校验 传入 text 是否是 字符串
//     text:kerwinPropsType.string,
//     // 校验 传入 leftShow 是否是 布尔值
//     leftShow:kerwinPropsType.bool
// }


// 类 需要通过new 如var obj = new Test();obj.a访问到 console.log(obj.a) 输出1
class Test {
    a = 1
}
// 对象属性  通过Test.a直接可以访问到 console.log(Test.a)  输出100
Test.a = 100;
// console.log(Test.a)

/*
  ES6中可通过 静态属性  static 将 对象属性Test.a=100;直接写入类 Test 并且不需要new 直接 如console.log(Test.a)访问到 如下例

★静态方法 定义的时候，方法名字前面加static 。使用的时候，直接通过类调用。静态方法可以被继承。
★直接通过类名定义的属性。属于静态属性，只能通过类调用，可以继承。
*/

class TestB {
    b = 1 //对象 属性 需要new访问 通过 let  TestB=new TestB(); console.log(TestB.b);
    static b = 100 // 类的静态 属性 不需要new访问   console.log(TestB.b);
}
// console.log('TestB 静态属性static 直接访问', TestB.b)