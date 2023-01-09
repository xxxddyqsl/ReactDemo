import React, { Component } from 'react'
import { List } from "immutable"
/*
//  使用 List 将普通数组转为 immutable 不可变对象
    push 增加
    List(this.state.arr).push(999)
    用法和js的push一样，但是返回值为immutable的List结构，而不是数组
    splice 删
     List(this.state.arr).splice(index,1)


    toJS()：immutable的 map对象/list对象 转 JS对象/JS数组
*/
class Test extends Component {
    state = {
        arr: [1, 2, 3, 4],

    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>03-immutable-基础-List-状态是数组使用List将普通List转为 immutable 不可变数组 - 深度复制</h1>
                <button onClick={()=>{
                    // 组使用List将普通List转为 immutable 不可变数组
                    var arr=List(this.state.arr);
                    console.log(arr);
                    //   push 添加 不会影响老的对象结构
                    // var arr2=arr.push(777);
                    // concat 连接两个数组 不会影响老的对象结构
                    var arr3=arr.concat([5,6,7]);
                    // console.log(arr2);
                    // 更新状态
                    this.setState({
                        // toJS 转为普通数组
                        arr:arr3.toJS(),
                    },()=>{
                        // 有一个异步的过程 - 外部打印 无法获取到最新的state状态
                        console.log(this.state.arr);
                    });
                  
                }}>click添加</button>
                <button onClick={()=>{
                    // 组使用List将普通List转为 immutable 不可变数组
                    var arr=List(this.state.arr);
                    console.log(arr);
                    // 使用set修改值 第一个参数为下标 第二个参数为要修改的值
                    var arr2=arr.set(0,999);
                    console.log(arr2);
                    // 更新状态
                    this.setState({
                        arr:arr2
                    });
                }}>click修改</button>
                <div>
                    immutable数组 获取值的方式1：get()-
                    {
                        List(this.state.arr).get(0)
                    }
                </div>
                <div>
                    immutable数组 可使用普通map方法遍历-
                    {
                       List(this.state.arr).map(item=><div key={item}>{item}</div>)
                    }
                </div>
            </div>
        )
    }
}
export default Test