import React, { useRef, useState } from 'react'

export default function App() {
    /*
      如此时使用 useRef 获取input 需要指定好useRef 是那种类型的否则报错 如下 ref获取的是input标签 因此是 HTMLInputElement 类型
      如果 ref 获取的是div标签 那就是指定好ref为 HTMLDivElement 类型
      并且 函数组件与类组件 获取ref不同的是 useRef 需要设置初始值 为null 否则会报错 如下写法:
       const myInput=useRef<HTMLInputElement>(null)
  */
    const myInput = useRef<HTMLInputElement>(null)
    const [list,steList] =useState<Array<string|number>>([])
    return (
        <div className='app-assembly'>
            <h1>02-ts+react-函数组件-todolist-state状态案例</h1>
            <input type={'text'} ref={myInput} />
            <button onClick={() => {
                /*
                       初始编辑阶段ts 检查myInput可能为null 因此如像之前的写法 myInput.current.value 报错如下：
                       (property) React.RefObject<HTMLInputElement>.current: HTMLInputElement | null 对象可能为 "null"

                       写法1： 通过？可选链语法 来兼容 myInput可能为null时的情况
                                可选链使用可选链操作符 ?. 它的作用是当对象的属性不存在时，会短路，直接返回undefined，
                                如果存在，那么才会继续执行。虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更般配。
                       写法1：myInput.current?.value

                       写法2： 在很确定只可能是 HTMLInputElement值类型的情况下 通过as 断言 将myInput.current 断言为 HTMLInputElement 类型
                               也可不指定类型 通过as 断言 为 any任意值 但是 any为任意值  不会检查类型 这就失去了 使用 ts的意义
                       写法2： (myInput.current as any).value
                       写法2： (myInput.current as HTMLInputElement).value
                   */
                console.log(myInput.current?.value);
                console.log((myInput.current as HTMLInputElement).value);
                console.log((myInput.current as any).value);
                 // es6 数组合并 ...list展开老的list 增加新的 (myInput.current as HTMLInputElement).value
                steList([...list,(myInput.current as HTMLInputElement).value]);
                 // 清空 input 值
                (myInput.current as HTMLInputElement).value='';
            }}>click-add</button>
            {
                list?.map((item,index)=><li key={index}>{item}</li>)
            }
        </div>
    )
}
