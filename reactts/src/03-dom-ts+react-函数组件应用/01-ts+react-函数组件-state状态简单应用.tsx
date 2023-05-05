import React, { useState } from 'react'


/*
    react 函数组件 在 useState<string>('')  后面通过 泛型（Generics）写法 约定状态
    写法如下:
    const [name, setName] = useState<string>('初始默认值')
     
*/
interface IState{
    name:string,
}
export default  function App(){
    const [name, setName] = useState<string>('kerwin')
    return (
        <div className='app-assembly'>
            <h1>01-ts+react-函数组件-state状态简单应用</h1>
            {/* 字符串 截取 首字母大写 */}
            <div> app --- {name?.substring(0,1).toUpperCase()}{name?.substring(1)}</div>
            <button onClick={()=>{
                setName('xiaomnig')
            }}>click-首字母大写</button>

        </div>
    )
}
 