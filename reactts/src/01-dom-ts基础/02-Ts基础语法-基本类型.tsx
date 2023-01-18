import React from 'react'
/*
    基本类型:

        字符串 数字 布尔

    变量指定类型:

        通过 var myname:类型 定义变量指定类型 那只能赋值为该类型的值 也可以定义变量有多个指定类型 | 分开 如 var myname:string|number

        且该变量 只是使用该类型的方法 如 var myname:string="";定义为字符串 myname.map()方法 会被类型检查报错

    变量不指定类型或者指定为any类型：

        如果 在变量定义的时候 指定类型为any 或 没有指定类型并且没有赋值 ，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
*/
var myage: number = 0;
myage.toFixed(1)

var myshow: boolean = true;
myshow = false;

// 联合类型 表示取值可以为多种类型中的一种
var myname: string | number = 'Hello, world!';
// 字符串方法-截取字符串
myname.substring(0, 1);
// any 可任意赋值类型
var my: any = 'Hello'
my = 100;

export default function App() {
    return (
        <div className='app-assembly'>
            <h1>02-Ts基础语法-基本类型</h1>
        </div>
    )
}
