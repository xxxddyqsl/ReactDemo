import React, { useState, useRef } from 'react'
import {} from 'react-test-renderer'
/*
    react-test-renderer
    介绍 react 官方提供的测试模块

    安装命令如下
    yarn add react-test-renderer

    把一段jsx模板进行 shallow render（浅层的渲染）（如果这个模板里面有套着的孩子组件不会渲染，只会渲染自己第一层的，当然也有 full render （深层的渲染）进行深层的全部渲染）

    创建-测试文件命名规则 如下 (必须以 .test.js 结尾)
    01-react-test-renderer.test.js
*/
export default function Test() {
    const [list, setList] = useState(['111', '222', '333']);
    const myText = useRef();
    const addStyle = {
        outline: 0,
        border: 0,
        padding: '10px 8px',
        color: '#fff',
        margin: '0px 20px',
        borderRadius: '4px',
        background: '#17ba77',
    };
    const DelStyle = {
        outline: 0,
        border: 0,
        // padding: '10px 8px',
        color: '#fff',
        margin: '0px 20px',
        borderRadius: '4px',
        background: 'red',
    };
    const liStyle = {
        margin: ' 10px 0px',
    }
    return (
        <div className='app-assembly'>
            <h1>01-单元测试-(react-test-renderer安装)</h1>
            <input ref={myText}></input>
            <button style={addStyle} onClick={() => {
                setList([...list, myText.current.value])
                // 清空 input 框
                myText.current.value = '';
            }}>添加list数据</button>
            <ul>
                {list.map((item, index) =>
                    <li key={item + '_' + index} style={liStyle}>
                        {index + "--" + item}
                        <button style={DelStyle} onClick={() => {
                            // 方式1： 通过filter    filter函数 用于对数组进行过滤 并且 不会对空数组进行检测、不会改变原始数组 因此 可不用 如下方例子 深度拷贝 数据
                            setList(list.filter((KItem, kIndex) => { return kIndex !== index }));
                        }}>delete-删除</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
