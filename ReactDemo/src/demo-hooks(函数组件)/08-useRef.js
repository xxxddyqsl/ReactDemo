import React, { useRef, useState } from 'react'

/*
 useRef
 1：可保存临时变量 不丢失
 2：绑在dom节点上 可访问DOM节点  或者 组件上 可进行组件通信（ 案例可见：05-ref版-表单域组件.js）
*/
export default function Test() {
    // 使用 useRef 或者useState 都可以保存临时变量 但是只使用useRef仅只能保存临时变量 而不能更新React（可见下方例子）
    const [Count,setCount] = useState(0);
    const myCount = useRef(0);
    const inpRef = useRef();
    const [list, setList] = useState(['aaa', 'bbb', 'ccc'])
    return (
        <div className='app-assembly'>
            <h1>08-useRef</h1>
            <input type='text' ref={inpRef}></input>
            <button onClick={() => {
                let value = inpRef.current.value;
                // es6 数组合并
                setList([...list,...value])
                console.log(inpRef.current.value);
                // 清空 input 框
                inpRef.current.value='';
            }
            }>增加</button>
            <button onClick={()=>{
                // 修改 Count 状态
                // setCount(Count+1);
                // 使用useRef仅只能保存临时变量 无法更新组件 可见打印
                myCount.current++;
                console.log(myCount.current)
                }}>测试使用useRef 保存临时变量count={Count}-myCount= {myCount.current}</button>
            <ul>
                {
                list.map((item, index) => {  return (<li key={index}>{item}</li>)})
                }
            </ul>
        </div>
    )
}
