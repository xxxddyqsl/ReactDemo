import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'

/*
    useMemo-记忆组件 - 提高（优化）性能
    useCallback的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。
    useCallback(()=>{},[name])    useMemo(()=>()=>{},[name])

    1：useMemo注入的 依赖没有改变 使用缓存 不会重新执行函数进行计算 提高性能
    2：useMemo注入的 依赖改变重新获取最新状态 重新计算执行函数
    3：useMemo 没有依赖 传入空数组 只执行一次 且 拿到的还是老的name ，永远不会被重新声明 拿到新的name


    唯一的区别是：useCallback 不会执行第一个参数函数，而是将它返回给你 ，而 useMemo会执行第一个参数函数并且将函数执行结果 返回给你。
    所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。
    所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用， 而 useMemo 更适合经过函数计算得到一个确定的值 (类似vue的计算属性功能)，比如记忆组件

*/


export default function Test() {
    const [search, setSearch] = useState('');
    const [CinemaList, setCinemaList] = useState([]);
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'GET',
            params: {
                cityId: 110100,
                ticketFlag: 1,
                k: 584748,
            },
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            },
        }).then(res => {
            if (res.data.status === 0) {
                // 更新 状态值 调整react 更新dom
                setCinemaList(res.data.data.cinemas)
            }
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        // 依赖 - 传入空数组 useEffect 只执行一次
    }, []);
    /*
     useMemo 计算返回 如果依赖的CinemaList状态或者search状态 发生改变 重新声明 获取最新的状态 计算返回,
     如果依赖的状态 没有发送改变 则使用useMemo 缓存的结果 避免再次执行内部函数进行 filter() 计算过滤

     就相当于 getCinemaList （是 [] 函数执行返回的结果） 并不是 指函数 而是useMemo() 内函数执行 得到的结果 如当前执行函数计算 过滤 返回的 数组数据
    */
    const getCinemaList = useMemo(() => () => {
        /*
      input绑定的value状态 search 改变 触发React 重新渲染render()
        使用filter函数过滤input上绑定的状态值search  返回创建一个新数组（不会影响原数据CinemaList）
      */
        return (
            CinemaList.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容
                return (item.name.toUpperCase().includes(search.toUpperCase()) || item.address.toUpperCase().includes(search.toUpperCase()))
            })
        )
    }, [CinemaList, search])
    //高亮字符串 string: 需要处理的字符串，keyword：键盘输入的内容
    // useMemo 没有依赖 传入空数组 只在第一次时声明 heightLight 函数只声明一次   ，且永远不会被重新声明 执行到的还是老的函数
    const heightLight = useMemo(() => (string, keyword) => {
        var reg = new RegExp(keyword, "gi");
        string = string.replace(reg, (text) => "<span class='keyHighlight' >" + text + "</span>");
        return string;
    }, [])
    return (
        <div className='app-assembly'>
            <h1>07-hooks-useMemo-记忆组件 - 提高（优化）性能</h1>
            <div className={'main-tabs-wrapper'} style={{ width: '600px', height: '300px' }}>
                {/* 搜索 */}
                <div className='main-tabs-header gg-flex-1'>
                    {/* 监听 input  */}
                    <input type='text' className='searchInput' value={search} placeholder='搜索影院' onChange={(event) => (

                        setSearch(event.target.value)
                    )} />
                </div>
                <ul className='main-tabs-list' onClick={(event) => { console.log(event) }} >
                    {

                        // 监听 input 受控 修改search状态  状态改变触发组件更新 组件执行内部函数 再次执行 getCinemaList记忆函数 进行计算过滤
                        getCinemaList().map((item, index) => {
                            return (<li className='main-tabs-item gg-flex-4' key={item.cinemaId}>
                                {/* <img className='main-tabs-item-img' src={item.logoUrl} alt='' title={item.name} /> */}
                                <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
                                    <div className='main-tabs-item-name' title={item.name} dangerouslySetInnerHTML={
                                        {
                                            __html: (`${heightLight(item.name, search)}`)
                                            // __html: (`${item.name.toUpperCase().replace(search.toUpperCase(), (text)=> "<span class='keyHighlight' >" + text+ "</span>")}`)
                                        }
                                    }></div>
                                    <div className='main-tabs-item-address' title={item.address} dangerouslySetInnerHTML={
                                        {
                                            __html: (`${item.address.toUpperCase().replace(search.toUpperCase(), (text) => "<span class='keyHighlight' >" + text + "</span>")}`)
                                        }
                                    }></div>

                                </div>
                            </li>)
                        })
                    }
                </ul>

            </div>
        </div>
    )
}
