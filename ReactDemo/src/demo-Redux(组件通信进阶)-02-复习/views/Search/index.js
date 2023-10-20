import React, { useEffect, useState,useMemo } from 'react'
import styles from './Search.module.css'
//导入 Redux  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
import newStore from '../../redux/store'
// 方式1： redux-thunk 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
import { getCinemaListAction } from '../../redux/actionCreators/getCinemaListAction'



export default function Search() {
    const [CinemaList, setCinemaList] = useState(newStore.getState().CinemaListReducer.list);
    const [search,setSearch]=useState('')
    useEffect(() => {
        console.log('Search 订阅==>', newStore.getState().CinemaListReducer)
        // reducer 函数 - 影院状态管理中列表没有数据 请求接口
        if (newStore.getState().CinemaListReducer.list.length === 0) {
            /*
              newStore.dispatch(action) action 内写异步-在 action（action可写成一个函数）中如getCinemaListAction函数中 请求数据 -
              方式1：redux-thunk 详细案例可见 getCinemaListAction.js
              getCinemaListAction 为一个函数 没有中间件redux-thunk时 仅仅是普通的函数并且 action（就是getCinemaListAction） 只支持返回一个对象 因此return返回的必须是一个对象 如（{type:'change-list',}），
              这引发了异步赋值return返回的问题。
            */
            newStore.dispatch(getCinemaListAction(newStore.getState().CityReducer.cityId || 110100))
        } else {
            // 使用  reducer 函数 - 影院状态管理的list列表 缓存的数据
            console.log(newStore.getState().CinemaListReducer)
        }
        // subscribe 订阅 - 每次订阅完之后会返回一个函数 这个函数就是取消订阅的唯一函数，通过var unsubscribe 一个变量接收这个 返回的取消函数  名称可任意命名 如：var unsubscribe = newStore.subscribe(()=>{})
        var unsubscribe = newStore.subscribe(() => {
            // 获取list 更新 状态 
            setCinemaList(newStore.getState().CinemaListReducer.list)
            // console.log('Cinema订阅==>', newStore.getState().CinemaListReducer)
        })
        // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
        return () => {
            // 取消订阅
            unsubscribe();
            console.log('取消订阅==> unsubscribe ')
        }
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, []);
    /*
     useMemo 计算返回 如果依赖的CinemaList状态或者search状态 发生改变 重新声明 获取最新的状态 计算返回,
     如果依赖的状态 没有发送改变 则使用useMemo 缓存的结果 避免再次执行内部函数进行 filter() 计算过滤
    */
    const getCinemaList = useMemo(()=>{
        // return 返回的 过滤结果
        return (
            CinemaList.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容 includes验证返回布尔值
                return (item.name.toUpperCase().includes(search.toUpperCase()) || item.address.toUpperCase().includes(search.toUpperCase()))
            })
        )
    },[CinemaList,search])
    return (
        <div className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
            <div>
                <input type='text' className='searchInput' value={search} placeholder='搜索影院' onChange={(event)=>{setSearch(event.target.value)}}></input>
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
                {getCinemaList.length<=0&&<h3 style={{margin:'0 auto',color:'red',textAlign:'center'}}>暂无数据</h3>}
            </ul>
        </div>
    )
}
