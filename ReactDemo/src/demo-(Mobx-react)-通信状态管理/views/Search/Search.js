import React, { useEffect, useState, useMemo } from 'react'
import styles from './Search.module.css'

// 导入 创建 声明好的 mobx
import Store from '../../mobx/store'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听 类似订阅 需要取消订阅
*/
import { autorun } from 'mobx'

export default function Search() {
    const [CinemaList, setCinemaList] = useState(Store.list);
    const [search, setSearch] = useState('')
   
    useEffect(() => {

        // reducer 函数 - 影院状态管理中列表没有数据 请求接口
        if (Store.list.length === 0) {

           // 开启严格模式 不直接通过Store.list 修改observable可观察对象 集中 在 store.js 中管理处理数据 通过方法修改observable可观察对象 保证代码风格统一 降低耦合度
        // 重新获取数据
        Store.getList(Store.cityId || 110100)
        }
        // autorun 监听 类似订阅 需要取消订阅
        var unsubscribe=  autorun(() => {
            // 获取list 更新 状态
            setCinemaList(Store.list)
        })
        return () => {
            // 取消订阅
            unsubscribe()
        }
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, []);
    /*
     useMemo 计算返回 如果依赖的CinemaList状态或者search状态 发生改变 重新声明 获取最新的状态 计算返回,
     如果依赖的状态 没有发送改变 则使用useMemo 缓存的结果 避免再次执行内部函数进行 filter() 计算过滤
    */
    const getCinemaList = useMemo(() => {
        // return 返回的 过滤结果
        return (
            CinemaList.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容 includes验证返回布尔值
                return (item.name.toUpperCase().includes(search.toUpperCase()) || item.address.toUpperCase().includes(search.toUpperCase()))
            })
        )
    }, [CinemaList, search])
    return (
        <div className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
            <div>
                <input type='text' className='searchInput' value={search} placeholder='搜索影院' onChange={(event) => { setSearch(event.target.value) }}></input>
            </div>
            <ul>
                {
                    getCinemaList.map(item => {
                        return (
                            <li key={item.cinemaId} className={item.cityId}>
                                <div>影院：{item.name}</div>
                                <div>位置：{item.address}</div>
                            </li>
                        )
                    })

                }
                {getCinemaList.length <= 0 && <h3 style={{ margin: '0 auto', color: 'red', textAlign: 'center' }}>暂无数据</h3>}
            </ul>
        </div>
    )
}
