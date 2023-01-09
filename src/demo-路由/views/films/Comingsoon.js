import React, { useEffect, useState } from 'react'
import axios from 'axios'
function useGetData() {
    const [ComingList, setComingList] = useState([]);
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            params: { cityId: 310100, pageNum: 1, pageSize: 10, type: 2, k: 6170108 },
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            },
        }).then(res => {
            setComingList(res.data.data.films)
        }).catch(err => {
            console.error(err)
        })
    }, []);
    return {
        ComingList
    }
}

export default function Comingsoon() {
    const { ComingList }=useGetData();
    return (
        <div>

            <h4>嵌套路由 - Comingsoon - 声明式路由导航- NavLink 跳转</h4>
            <div className='Home-wrapper' style={{ border: '1px solid red', width: '100%', flex: '1', overflow: 'hidden' }}>
                <ul className='main-tabs-list'  style={{overflow : 'auto',height: '400px',}} >
                    {

                        // 监听 input 受控 修改search状态  状态改变触发组件更新 组件执行内部函数 再次执行 getCinemaList记忆函数 进行计算过滤
                        ComingList.map((item, index) => {
                            return (
                                <li className='main-tabs-item gg-flex-4' key={item.filmId}>
                                    <img className='main-tabs-item-img' src={item.poster} alt='' title={item.name} />
                                    <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
                                        {/* 电影名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */}
                                        <div className='main-tabs-item-name' title={item.name} dangerouslySetInnerHTML={
                                            {
                                                __html: item.name
                                            }
                                        }></div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
