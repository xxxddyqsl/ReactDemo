/*
    react 16.8版本 之前 函数组件为 无状态组件 （如写一个计数器按钮 每点击一次按钮加1 函数组件就不支持 因为没有自己的状态）

    react 16.8版本 之前更多的是使用class组件 （老项目中）

    react 16.8版本 之后 需引入 react hooks 函数组件就有了状态 ，此后 公司更多的是使用函数组件的
 */

/*
 注意： 组件名称必须以大写字母开头。
 React 会将以小写字母开头的组件视为原生 DOM 标签。例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。
*/
export function appb() {
    return (
        <h1 className='app-assembly'>02demo-函数组件</h1>
    )
}
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