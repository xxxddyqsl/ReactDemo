import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
/*
    自定义 hooks （如下 useCinemaList()例子）
    当我们想在 两个函数之间共享逻辑时，我们会把它提取到第三个函数中。

    自定义 hooks 理念 ：复用js逻辑 - 抽出做成一个单独的函数 结构更加清晰 并不在于ui的复用

    注意：  自定义 hooks 命名必须以 “ use ” 开头，这个约定非常重要，不遵循的话，由于无法判断某个函数是否包含到
    其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了Hook的规则 
    必须return 返回一个对象 通过es6 结构的方式取出 如 const { CinemaList } = useCinemaList();
*/
function useCinemaList() {
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
    // 返回获取到的列表数据
    // 必须return 返回一个对象 通过es6 结构的方式取出 如 const { CinemaList } = useCinemaList();
    return {
        CinemaList
    }
}
function useGetCinemaList(CinemaList, search) {
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
    // 必须return 返回一个对象 通过es6 结构的方式取出 如 const { getCinemaList } = useGetCinemaList(CinemaList, search)
    return {
        getCinemaList
    }
}

//高亮字符串 string: 需要处理的字符串，keyword：键盘输入的内容
// useMemo 没有依赖 传入空数组 只在第一次时声明 heightLight 函数只声明一次   ，且永远不会被重新声明 执行到的还是老的函数
function useHeightLight() {
    const heightLight = useMemo(() => (string, keyword) => {
        var reg = new RegExp(keyword, "gi");
        string = string.replace(reg, (text) => "<span class='keyHighlight' >" + text + "</span>");
        return string;
    }, [])
    // 必须return 返回一个对象
    return {
        heightLight
    }
}

export default function Test() {
    const [search, setSearch] = useState('');
    // 自定义 hooks
    const { CinemaList } = useCinemaList();
    // 调用 useGetCinemaList  自定义 hooks 传入参数（列表数据CinemaList，search搜索框输入的内容） getCinemaList 返回过滤好的数组
    const { getCinemaList } = useGetCinemaList(CinemaList, search)
    const { heightLight } = useHeightLight()
    return (
        <div className='app-assembly'>
            <h1>13-自定义hooks</h1>

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
