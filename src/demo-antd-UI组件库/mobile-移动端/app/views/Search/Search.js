import React, { useEffect, useState, useMemo } from 'react'
import styles from './Search.module.css'
//导入 Redux  reducer 函数被拆分 通过combineReducers 合并 因此 newStore.getState() 读取最新的state值  通过 props 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
// import {store as newStore} from '../../redux/combineReducers/store'
// 方式1： redux-thunk 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
import { getCinemaListAction } from '../../redux/actionCreators/getCinemaListAction'

import { connect } from "react-redux"
import { SearchBar } from 'antd-mobile'
function Search(props) {
    const [search, setSearch] = useState('')
    // 通过 ES6解构的方式 取出 props 对象内部的属性
    let { list, cityId, newGetCinemaListAction } = props;
    useEffect(() => {
        console.log('Search 订阅==>', props)
        // 影院状态管理中列表没有数据 请求接口
        if (list.length === 0) {
            // newGetCinemaListAction- connect提供的函数 返回 action对象 类似newStore.dispatch(action) 通知 reducer 函数 修改更新状态
            newGetCinemaListAction(cityId || 110100)
        }
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, [list, cityId, newGetCinemaListAction]);

    /*
     useMemo 计算返回 如果依赖的CinemaList状态或者search状态 发生改变 重新声明 获取最新的状态 计算返回,
     如果依赖的状态 没有发送改变 则使用useMemo 缓存的结果 避免再次执行内部函数进行 filter() 计算过滤
    */
    const getCinemaList = useMemo(() => {
        // return 返回的 过滤结果
        return (
            list.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容 includes验证返回布尔值
                return (item.name.toUpperCase().includes(search.toUpperCase()) || item.address.toUpperCase().includes(search.toUpperCase()))
            })
        )
    }, [list, search])
      //高亮字符串 string: 需要处理的字符串，keyword：键盘输入的内容
      const heightLight = (string, keyword) => {
        if(keyword!=='')
        var reg = new RegExp(keyword, "gi");
        string = string.replace(reg, (text) => "<span class='keyHighlight' >" + text + "</span>");
        return string ;
  }
    return (
        <div className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
            <div className={styles.searchInput}>
                {/*  SearchBar 组件 onChange直接返回 搜索框的 value值 */}
                <SearchBar placeholder='搜索影院' value={search} onChange={(value) => {
                    setSearch(value)
                    // console.log(event)
                }} showCancelButton={() => true} />
            </div>
            <ul>
                {
                    getCinemaList.map(item => {
                        return (
                            <li key={item.cinemaId} className={item.cityId}>
                                <div dangerouslySetInnerHTML={{ __html:'影院：'+heightLight(item.name,search)}}></div>
                                <div dangerouslySetInnerHTML={{ __html:'位置：'+heightLight(item.address,search)}}></div>
                            </li>
                        )
                    })
                }
                {getCinemaList.length <= 0 && <h3 style={{ margin: '0 auto', color: 'red', textAlign: 'center' }}>暂无数据</h3>}
            </ul>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        list: state.CinemaListReducer.list,
        CityName: state.CityReducer.CityName,
        cityId: state.CityReducer.cityId
    }
};
const mapDispatchToProps = {
    newGetCinemaListAction: getCinemaListAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)