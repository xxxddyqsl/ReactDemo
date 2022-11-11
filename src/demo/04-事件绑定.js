import React, { Component, useState } from 'react'

// 在 函数组件中使用 使用 State Hook 状态记录值  必须导入useState（函数组件的状态）
function Example() {

    /* const [state, setState] = useState(initialState); 返回一个 state，以及更新 state 的函数。
 在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。
 setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

 注意：
 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
 useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象
 */

    // 声明一个叫 "count" 的 state 变量 count 等于 useState内的参数0 修改count 时 必须调用 setCount 函数
    const [count=0, setCount] = useState();
    // const [count, setCount] = useState(0);
    return (
        <div>
            <span> <h1>You clicked {count} times</h1></span>
            <button onClick={() => setCount(count + 1)}>
                点击计数器：{count}(次数)
            </button>
        </div>
    );
}
/* React 绑定事件和原生js绑定事件的区别是： React 绑定事件并不会真正的绑定在每一个具体的dom标签上，比较消耗内存 而是采用事件代理的方式 (事件绑在了根节点（标签元素root）类似利用事件捕获 冒泡的机制 找到那个元素真实触发的) */

export default class testClick extends Component {
    constructor(props) {
        super(props);
         // React.createRef()（react v16 新提出）
        // 通过 constructor 构造函数中创建，this.自定义属性名 = React.createRef()
        // 通过 ref={this.自定义属性名} 绑定
        // 通过 this.自定义属性名.current 来获取 dom 元素
        // 注意：必须在类组件中才可使用
        this.myRef = React.createRef();
        // 使用 State Hook 状态记录值  必须通过调用 this.setState() 来修改那边 inputV的值 下方有事例
        this.state = {
            count: 0,
            inputV: ''
        };
    }
    // 此写法 函数handleClick1在原型上
    handleClick1(even) {
        console.log(this, this.myRef.current.value)
        console.log('handleClick1', '不推荐这种写法：this指向有问题（undefined） 需要通过 bind() 、call() 、apply()强行修改this指向 否则无法访问testClick类')
        this.setState(function(){
            return{
                count: this.state.count + 1,
                // 通过 this.myRef.current. 访问input 标签元素的值 赋给this.setState下的inputV
                inputV: this.myRef.current.value
            }
        });
    }
    // 此写法等价 constructor内部写一个默认函数
    handleClick2 = (even) => {
        console.log(this, this.myRef.current.value)
        this.setState({
            count: this.state.count + 1,
             // 通过 this.myRef.current. 访问input 标签元素的值 赋给this.setState下的inputV
            inputV: this.myRef.current.value
        });
        console.log('handleClick2', '推荐这种写法，箭头函数this 无问题')
    }
    handleClick4(even, data) {
        console.log(even, this.myRef.current.value)
        console.log(data);
        this.setState({
            count: this.state.count + 1,
             // 通过 this.myRef.current. 访问input 标签元素的值 赋给this.setState下的inputV
            inputV: this.myRef.current.value
        });
        console.log('handleClick4', '比较推荐这种写法，this指向无问题，方便传参数 ，')
    }
    render() {
        return (
            <div className='app-assembly'>
                <div> 04-事件绑定</div>
                {/* 函数组件内 事件绑定 */}
                <Example></Example>
                {/* 绑定 ref 获取 input 标签 元素 的值*/}
                <input type='text' ref={this.myRef}  ></input>

                {/* 事件的写法 驼峰方式  如：onMouseDown={} onClick={} 等 */}
                {/* 注意下方4个方式 this指向是有所区别的  onClick={this.add()}默认认为是函数调用 会执行一遍  this.add 不加小括号 （如  onClick={this.add} 默认不执行 ）  */}
                {/* 事件写法 1： 此this未指向testClick类 为 undefined' 需要修改this指向 通过.bind(this) 下方有原js修改this指向的说明例子 其他两种方案会自动执行函数 此处排除call()或apply()方案 */}
                {/* 事件写法 1：写法注意 this 指向 或 handleClick1 函数 改为 箭头函数 */}
                <button onClick={this.handleClick1.bind(this)}>不推荐 - handleClick1</button>
                {/* 事件写法 2： 'this 指向为testClick 类'  handleClick2为箭头函数 不改变this指向而是引用上一个作用域（testClick 类的）this ，上一个作用域的this 不销毁 */}
                <button onClick={this.handleClick2}>推荐 - handleClick2</button>
                {/* 事件写法 3：  'this 指向为 testClick 类' 此this 是与外面的render()的this 保持一致的 所以可以访问到 testClick */}
                <button onClick={() => { console.log(this); console.log('click3', '处理逻辑不多时推荐，如果处理逻辑过多，不推荐使用这种写法（匿名函数的写法）;this指向无问题') }}>推荐 - handleClick3</button>
                {/* 事件写法 4：  'this 指向为 testClick 类'  handleClick4 外部是一个箭头函数(箭头函数的this 为上一个作用域（testClick 类的）this ) 而handleClick4函数是谁调用就指向谁 所以handleClick4的this指向外部箭头函数的this  */}
                <button onClick={(even) => this.handleClick4(even, { msg: 'handleClick4参数' })}>比较推荐 - handleClick4</button>
                <div>
                    {/* {this.myRef.current?this.myRef.current.value:''} */}
                    { '计数器值：' +this.state.count + '===input值：' + this.state.inputV}
                </div>
            </div>
        )
    }
}



/*
    回顾：
    this说明： 谁调用 就 指向谁 
    修改 this 指向的三种方式 
    call()  // 改变this指向 并且自动执行函数
    apply() // 改变this指向 并且自动执行函数
    bind() // 改变this指向  不会自动执行函数 并且需要手动执行函数 加小括号执行 （ 如：obj1.getname.bind(obj2)() ）
*/
var obj1 = {
    name: 'obj1',
    getname() {
        console.log('obj1-this指向==>', this.name)
    }
}
var obj2 = {
    name: 'obj2',
    getname() {
        console.log('obj2-this指向==>', this.name)
    }
}
// 此时 obj1 调用了 getname函数 此时 this指向 obj1  打印为obj1
obj1.getname();

// 使用 apply() 和 call() 强行改变 obj1.getname内部this指向 此时并没有调用（如：obj1.getname()）getname()函数
// obj1.getname.call(obj2)
// obj1.getname.apply(obj2)
// 使用 bind()  改变this指向 并不会自动执行函数 需要手动执行函数 加小括号执行 （ 如：obj1.getname.bind(obj2)() ）
obj1.getname.bind(obj2)