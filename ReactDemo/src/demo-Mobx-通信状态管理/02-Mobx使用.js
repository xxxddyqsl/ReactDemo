import React, { Component } from 'react'
import '../css/app.css'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听

    action,runInAction和严格模式（configure）
    
    configure({
        never 不使用严格模式
        always 开启严格模式 ， 开启严格模式后必须在 action 中修改 observable 转换成可观察的数据
        enforceActions:"always"
    })

*/
import {observable,autorun,action,runInAction,configure} from 'mobx'

//普通基础类型部分数据
// 对于 普通类型数据的监听 必须使用box 才能转换成可观察的数据
var observableNumber= observable.box(10);
var observableName= observable.box('Hello World');

/*
    autorun 第一次会执行一次 之后只有内部监听的数据observableNumber每次改变也会执行

    autorun 只关心和自己内部监听相关数据发送改变

    如下 定时器 1秒之后修改 如果只是修改了observableName.set('xiaoming'); 那此处的 autorun并不会再次执行打印内部监听的数据observableNumber
*/
// autorun(()=>{
//     // 使用 get 获取值
//     console.log('Number-改变了',observableNumber.get())
// })
// autorun(()=>{
//     // 使用 get 获取值
//     console.log('Name-改变了',observableName.get())
// })
// 1秒之后修改
// setTimeout(()=>{
//     // 使用 set 修改值
//     observableNumber.set(20);
//     // observableName.set('xiaoming');
// },1000)
// setTimeout(()=>{
//     // 使用 set 修改值
//     // observableNumber.set(20);
//     observableName.set('xiaoming');
// },2000)

// 复杂类型 - 数组 对象等
// 对于 数组  直接转换成可观察的数据
var observableArr=observable([1,2,3,4]);

//  复杂类型 - 监听数组 autorun第一次不执行  发送改变时执行
// autorun(()=>{
//     // 使用 get 获取值
//     console.log('Arr-改变了',observableArr)
// })
// setTimeout(()=>{
//     // 使用 set 修改值
//     observableArr[2]=66;
// },2000)


//  复杂类型 - 监听对象 autorun第一次执行   并且只关心自己内部监听的对象属性 name 发生改变时autorun才会再次执行 下方监听对象age属性的autorun不会触发执行
//对象 方式1：  通过map 转换成可观察的数据
// var myObj=observable.map({name:'Hello World',age:10,});
// //  复杂类型 - 监听对象 autorun第一次执行   并且只关心自己内部监听的对象属性 name 发生改变时autorun才会再次执行 下方监听对象age属性的autorun不会触发执行
// autorun(()=>{
//     // 对象 方式1：  通过map - get获取值
//     console.log('对象-name 改变了',myObj.get('name'))
// })
// // 此时  修改了 name属性 上方的 autorun中监听了myObj对象 name属性的执行  而下方 的 autorun中监听 myObj对象 age属性的不行执行
// // 对象 方式1：  通过map - set修改值
// myObj.set('name','xiaoming')
// autorun(()=>{
//     // 对象 方式1：  通过map - get获取值
//     console.log('对象-age 改变了',myObj.get('age'))
// })

//对象 方式2：  直接 转换成可观察的数据
// var myObj2=observable({name:'Hello World',age:10,});
// autorun(()=>{
//     // 对象 方式2：  通过map -直接.属性获取值方式
//     console.log('对象2-name 改变了',myObj2.name)
// })
// // 对象 方式2：  没有通过map - 直接.属性 修改值
// myObj2.name='xiaoming'
// autorun(()=>{
//     // 对象 方式1：  通过map -直接.属性获取值方式
//     console.log('对象2-age 改变了',myObj2.age)
// })


export default class App extends Component {
    render() {
        return (
            <div className='app-assembly'>
                <h1>02-Mobx使用</h1>
            </div>
        )
    }
}
