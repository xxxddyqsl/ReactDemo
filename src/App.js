import React from "react"
import TestA from './demo/01-class类组件'
// 导入 jsx 类组件  使用 * as 设置别名 *表示所有 下方使用时需要 <TestB.appb></TestB.appb>
// import * as TestB from './demo/02-函数组件' 
// 导入 appb 使用 as 设置别名 为TestB
import {appb as TestB} from './demo/02-函数组件'
import  TestC from './demo/03-组件嵌套'
import  TestD from './demo/04-事件绑定'

import  TestE from './demo/05-ref的应用'
import  TestF from './demo/06-state+setState类状态的更新应用'
import  TestG from './demo/07-循环渲染'
import  TestH from './demo/08-选项卡案例demo'
import  TestI from './demo/09-setState同步异步'
import  TestJ from './demo/10-betterScroll滚动插件'
import  TestK from './demo/11-类组件属性props组件复用性'
import  TestL from './demo/12-函数组件属性props组件复用性'
// 导入的文件，需要在src目录下 (之前引入 // import '../public/css/app.css' public下的css文件时引起报错) ，解决办法可将文件移到src目录下 或配置 webpack.config.js内的new ModuleScopoPlugin 内容全部注释，重启项目即可
// 引发的原因是ModuleScopePlugin这个插件功能是为了防止用户引入src目录之外的文件导致不可预期的结果。因为babel都是通过src目录内文件进行入口转义的，如果你引入了src目录外，例如src1，这样这个文件就不能经过babel转义。除非你保证你引入文件已经经过转义，所以你可以不使用该插件进行限制。
import './css/app.css'
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


// 创建 类组件 固定必须继承 React.Component 否则只是普通的类函数
class app extends React.Component{
    // render 固定写法 实例化之后 React 会自动调用 render() 函数
    render() {
        // jsx 写法 无需加单双引号 或es6的字符串模板(``)否则 报错 无法编译解析 并且JSX 表达式必须具有一个父元素 错误语法（ <h1>Hello, world</h1><div>测试</div> ）
        // return ( 
        //     <div>
        //         <h1>Hello, world</h1>
        //     </div>
        // );
        return ( 
            <div>
                <TestA></TestA>
                {/*  <TestB.appb></TestB.appb> = <TestB></TestB>*/}
                <TestB></TestB>
                <TestC></TestC>
                <TestD></TestD>
                <TestE/>
                <TestF/>
                <TestG/>
                <TestH/>
                <TestI/>
                <TestJ/>
                <TestK/>
                <TestL/>
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