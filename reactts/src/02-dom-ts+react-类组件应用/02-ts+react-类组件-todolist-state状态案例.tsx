import React, { Component } from 'react'


/*
    react 类组件 在Component<约定属性,约定状态>  后面通过 泛型（Generics）写法 约定 属性或状态， 第一个泛型是约定属性，第二个泛型是约定状态
    写法如下:
    export default class App extends Component<any,IState>
    当前并没有需要 约束属性 所以 通过any不约定属性 ，但是此处我们需要约定状态的类型，因此传入了下方的接口 IState 来约定状态

    在设置状态初始值时就开始 约束是否是 接口IState约定的形状
    state = {
        // 如此时 设置 text 状态初始值不是约定的 string 类型 报错：不能将类型“{ text: number; }”分配给类型“Readonly<IState>”。属性“text”的类型不兼容。不能将类型“number”分配给类型“string”
        // text:100,
    }
    在修改状态值时就也会进行 约束是否是接口IState约定的形状
    this.setState({
         // 如此时 修改 text 状态不是约定的 string 类型 报错： 不能将类型“number”分配给类型“string”
        text:1,
    })
*/
interface IState{
    text:string,
    list?:Array<string|number>
}
export default class App extends Component<any,IState> {
    state = {
        text:'',
        list:[],
    }
    /*
        如此时使用 ref 获取input 需要指定好ref 是那种类型的否则报错 如下 ref获取的是input标签 因此是 HTMLInputElement 类型
        如果 ref获取的是div标签 那就是指定好ref为 HTMLDivElement 类型
    */
    myref=React.createRef<HTMLInputElement>()
    render() {
        return (
            <div className='app-assembly'>
                <h1>02-ts+react-类组件-todolist案例</h1>
                 {/* 获取input方式1：  受控组件 onChange监听 input 状态绑定input的 value值   状态更新React重新渲染 render() */}
                {/* <input type={'text'} value={this.state.text}  onChange={(event)=>{ this.setState({
                    text : event.target.value
                })}}></input> */}
                {/*  获取input方式2：ref */}
                <input type={'text'} ref={this.myref} ></input>
                <div>{this.state.text.substring(0,1).toLocaleUpperCase()+this.state.text.substring(1)}</div>
                <button onClick={()=>{
                    //  console.log(this.state.text,)

                    /*
                        初始编辑阶段ts 检查this.myref可能为null 因此如像之前的写法 this.myref.current.value 报错如下：
                        (property) React.RefObject<HTMLInputElement>.current: HTMLInputElement | null 对象可能为 "null"

                        写法1： 通过？可选链语法 来兼容 this.myref可能为null时的情况
                                可选链使用可选链操作符 ?. 它的作用是当对象的属性不存在时，会短路，直接返回undefined，
                                如果存在，那么才会继续执行。虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更般配。

                        写法1：this.myref.current?.value

                        写法2： 在很确定只可能是 HTMLInputElement值类型的情况下 通过as 断言 将this.myref.current 断言为 HTMLInputElement 类型
                                也可不指定类型 通过as 断言 为 any任意值 但是 any为任意值  不会检查类型 这就失去了 使用 ts的意义
                        写法2： (this.myref.current as any).value
                        写法2： (this.myref.current as HTMLInputElement).value
                    */
                    console.log(this.myref.current?.value);
                    console.log((this.myref.current as HTMLInputElement).value);
                    console.log((this.myref.current as any).value);
                    this.setState({
                        // es6 数组合并 ...this.state.list展开老的list 增加新的(this.myref.current as HTMLInputElement).value
                        list:[...this.state.list,(this.myref.current as HTMLInputElement).value]
                    });
                    // 清空 input 值
                    (this.myref.current as HTMLInputElement).value='';
                }}>click</button>
                {
                    this.state.list.map((item,index)=><li key={index}>{item}</li>)
                }
            </div>
        )
    }
}