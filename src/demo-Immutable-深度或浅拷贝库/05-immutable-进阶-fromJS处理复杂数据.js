import React, { useEffect, useState } from 'react'
import { fromJS,  } from "immutable"

/*
    fromJS ：JS对象/JS数组 转换成immutable
    深转换，全部转换，相对 Map 和List 更耗费性能。

    只是一级简单属性  可以使用  Map 或 List
*/
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
        console.log(data, info)
    }, [])
    const changeDel = (index) => {
        // fromJS 深度拷贝 - 深转换，全部转换为immutable
        var newData = fromJS(info);
        console.log(newData.get('favor'))
        //方式1：  删除指定兴趣 -  setIn 深层更新 第一个参数 数组形式 属性层级   第二个参数修改的值 此处 重新给favor赋值删除后的数组
        // newData = newData.setIn(['favor'], newData.get('favor').splice(index, 1));
        // 方式1：  删除指定兴趣 -  setIn 深层更新 第一个参数 数组形式 属性层级   第二个参数修改的值 此处 将index下标的值修改为 '1111'
        // newData = newData.setIn(['favor',index], '1111')

        //方式2：  删除指定兴趣 - updateIn 深层更新  第一个参数 数组形式 属性层级   第二个参数回调函数 含一个参数（就是favor属性的值）
        // newData = newData.updateIn(['favor'],(list)=>{return list.splice(index, 1)})

        //方式3：  删除指定兴趣 - deleteIn 深层更新   数组形式 删除 favor属性下 下标为index的值
        newData = newData.deleteIn(['favor', index])
        // immutable 转 普通对象 更新状态
        setInfo(newData.toJS())
    }
    return (
        <div className='app-assembly'>
            <h1>05-immutable-进阶-fromJS处理复杂数据</h1>
            <h3>个人信息修改</h3>
            <button onClick={() => {
                // fromJS 深度拷贝 - 深转换，全部转换为immutable
                var newData = fromJS(info);
                // 修改状态
                newData = newData.set('name', 'xiaoming').setIn(['location', 'city'], '南京')
                console.log(newData, info)
                // immutable 转 普通对象 更新状态
                setInfo(newData.toJS())
                // console.log(info,fromJS(info))
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
