import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import Styles from './City.module.css'
// 导入 创建 声明好的 mobx
import Store from '../../mobx/store'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听 类似订阅 需要取消订阅
*/
import { autorun } from 'mobx'
// 获取城市
function useGetCity() {
    const [CityList, setCityList] = useState([])
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'GET',
            params: {
                k: 8566552
            },
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
                'X-Host': ' mall.film-ticket.city.list'
            },
        }).then(res => {
            if (res.data.status === 0) {
                // 更新 状态值 调整react 更新dom
                setCityList(res.data.data.cities)
            }
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, [])
    return {
        CityList
    }
}
export default function City(props) {
    const { CityList } = useGetCity()
    return (
        <div className={'gg-flex-4 gg-flex-2 ' + Styles.wrapper} >
            {/* 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发 */}
            <h4>{Store.CityName}</h4>

            <ul>
                {
                    CityList.map(item => {
                        /*
                                    方式1：
                                        此时 <CityItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 需要手动传入<CityItem/> 子组件内
                                            es6 展开 {...props} 将 props （props内包含了history路由的信息） 赋值给子组件的props 否则子组件内的props没有路由的信息
                                            es6 展开 {...item} 将数据赋值给子组件的props
                                    */
                        // <CityItem key={item.cityId} {...item} {...props} />
                        /*
                       方式2：
                           此时 <CityItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 通过 withRouter(CityItem)
                                此时 withRouter 会在 CityItem 外包装一层 并且提供 props及history路由的信息
                                withRouter可以帮助跨级 传输  props及history路由这些值
                               es6 展开 {...item} 将数据赋值给子组件的props
                       */
                        return <CityItem key={item.cityId} {...item} {...props}></CityItem>
                    })
                }
            </ul>
        </div>
    )
}

function CityItem(props) {
    let { cityId, name } = props;
    return (
        <li id={cityId} onClick={() => {
            // 开启严格模式 不直接通过Store.cityId 修改observable可观察对象 集中 在 store.js 中管理处理数据 通过方法修改observable可观察对象 保证代码风格统一 降低耦合度
            Store.setCityId(cityId)
            Store.setCityName(name)
            // 方式1-跳转到 影院
            // props.history.push('/cinemas');
            // 方式2- 退回上一页 -  到 影院
            props.history.goBack()
            console.log(props)
        }}>{name}</li>
    )
}