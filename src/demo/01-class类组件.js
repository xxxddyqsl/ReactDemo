import React from "react"
// function app(){
//     console.log('Hello, world!',);
//     return (
//         <h1>Hello, world!</h1>
//     )
// }
// class Test {
//     constructor(){
//         this.a='Test类测试'
//     }
//     testA(data){
//         console.log((data||'')+'testA')
//     }
// }
// // class 类 app 继承（含 内部变量 函数）上方的  Test 类 
// class app extends Test{
//     constructor(){
//         super();  //ES6 要求，子类的构造函数必须执行一次super函数
//         this.msg='app类输出：'
//     }
//     testB(){
//         // super在普通方法之中，指向 Test.prototype， 所以super.a 就相当于 Test.prototype.a
//         console.log('app继承：',super.a);
//         super.testA(this.msg);
        
//     }
//     testC(){
//         return (<h1>Hello, world!</h1>)
//     }
// }

/*
 注意： 组件名称必须以大写字母开头。
 React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。
 你可以在深入 JSX中了解更多关于此规范的原因。
*/

// 创建 类组件 固定必须继承 React.Component 否则只是普通的类函数
class app extends React.Component{
    // render 固定写法 实例化之后 React 会自动调用 render() 函数
    render() {
        // jsx 写法 无需加单双引号 或es6的字符串模板(``)否则 报错 无法编译解析 并且JSX 表达式必须具有一个父元素 错误语法（ <h1>Hello, world</h1><div>测试</div> ）
        return ( 
            <div className='app-assembly'>
                <h1>01-class类函数组件</h1>
            </div>
        );
      }
}
// export default 方式导出（只能导出一个类或函数）  类组件app  （index.js页导入时可任意命名导出变量名）
export default app

// export 方式导出（可导出多个类或函数） index.js页导入时如以下3种方式：
// 方式1::index.js页导入时不可以任意命名导出变量名 必须与 类名或函数名一致  如在index.js页 导入 import { a,b,e,c } t from './App'  调用时 a() 、b() 、new c() 、e
// 方式2 :: 可用 * as 设置别名 *表示所有 如在index.js页 导入 import * as test from './App' 调用时 test.a()、 test.b()、 test.e 、 new test.c()
// 方式3 :: 可用 as 设置别名  如在index.js页 导入 import {  a,b,c,e  as aa,bb,ee,cc  } from './App' 调用时  a() 、bb() 、 等
// export function a(){
//     console.log('测试a函数')
// }
// export class c{ cc(){console.log('测试cc函数')}}
// export let e=3;
// export function b(){
//     console.log('测试b函数')
// }