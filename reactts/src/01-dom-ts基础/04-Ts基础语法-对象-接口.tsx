/*
    基础语法-对象-接口(Interfaces)

    接口 - 定义 对象 类型的另一种方式 通过关键字 interface 来定义
    什么是接口
    在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
    TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

    extends 继承

*/
interface Point {
    name: string;
    age: number;
    //  ? 可选属性的含义是该属性可以不存在。如果属性不是可选 那在对象 Test 就必须有这个属性
    location?: string
    /*
        如ajax接口返回的数据 有n个属性 一个个写不现实 自己需要用到的数据可通过上方的方式定义值类型取出
        剩下的属性可通过 任意属性 自定义键值类型（[name]） 和 自定义 键key (key值any任意类型) 如  [propName: string]: any;
    */
    [propName: string]: any
}
// Bear接口 通过关键字 extends  继承了 Point接口内定义的所有属性和方法 并且扩展追加了 一个新的属性 honey
interface Bear extends Point {
    honey: boolean
}


// 将接口 Bear 赋值给 bear 限制对象bear的形状
const Test: Bear = {
    name: 'Hello, world!',
    age: 1,
    honey: true,
}
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>04-Ts基础语法-对象+接口(Interfaces)</h1>
        </div>
    )
}