import React, { useEffect, useState } from 'react'
import { Map, List } from "immutable"
const data = {
    name: 'xingxin',
    location: {
        province: '江苏',
        city: '苏州',
    },
    favor: ['读书', '看报', '睡觉'],
    age: [{ a: 18, b: 13 }]

}
export default function Test() {
    const [info, setInfo] = useState();
    useEffect(() => {
        setInfo(data)
        // console.log(data,info)
    }, [])
    const changeDel = (index) => {
        // 深度拷贝 - 普通对象转immutable
        var newData = Map(info);
        console.log(newData.get('favor'))
        //  删除 指定兴趣
        newData = newData.set('favor', List(newData.get('favor')).splice(index, 1))
        // immutable 转 普通对象 更新状态
        setInfo(newData.toJS())
    }
    return (
        <div className='app-assembly'>
            <h1>04-immutable-进阶-复杂数据</h1>
            <h3>个人信息修改</h3>
            <button onClick={() => {
                // 深度拷贝 - 普通对象转immutable
                var newData = Map(info);
                newData = newData.set('location', Map(newData.get('location'))).set('favor', List(newData.get('favor'))).set('age', List(newData.get('age')));
                // 修改状态
                newData = newData.set('name', 'xiaoming').set('location', newData.get('location').set('city', '南京'))
                console.log(newData, info)
                // immutable 转 普通对象 更新状态
                setInfo(newData.toJS())
                console.log(info)
            }}>点击修改</button>
            {info && <div>
                <div>姓名： {info.name}</div>
                <div>地址：{info.location.province + '--' + info.location.city}</div>
                <div>兴趣爱好：{
                    info.favor.map((item, index) =>
                        <div key={index}>
                            {item}
                            <button onClick={() => changeDel(index)}>del</button>
                        </div>
                    )
                }
                </div>
            </div>}
        </div>
    )
}
