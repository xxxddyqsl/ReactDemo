import React, { useEffect, useState } from 'react'
import axios from 'axios'
// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { List, Image, InfiniteScroll } from 'antd-mobile'
// RouteComponentProps 路由自带的接口声明文件 类似自己写的ts接口 IItem 约定属性
import { RouteComponentProps } from 'react-router-dom'

interface IProps {
    name: string,
    poster: string,
    filmId: number,
    category: string,
    director: string,
    runtime: number,
    nation: string,
    grade: string,
    /*
       如ajax接口返回的数据 有n个属性 一个个写不现实 自己需要用到的数据可通过上方的方式定义值类型取出
       剩下的属性可通过 任意属性 自定义键值类型（[name]） 和 自定义 键key (key值any任意类型) 如  [propName: string]: any;
   */
    [propName: string]: any
}
export default function Nowplaying(props: RouteComponentProps) {
    const [FilmList, steFilmList] = useState<Array<any>>([])
    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            },
            // count 加载更多 页码
            params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 1880151 }
        }).then(res => {
            // 加载更多 合并新的数据
            steFilmList([...FilmList, ...res.data.data.films]);
        }).catch(err => {
            console.error(err)
        })
    }, [])
    const handleChangePage = (id: number) => {
        // console.log(props)
        //路由传参方式1：动态路由 params参数   接收参数：this.props.match.params - 刷新后参数消失
        props.history.push(`/detail/${id}`);
    }
    return (
        <div>
            {/*  列表 组件 */}
            <List align-items='flex-start' >
                {FilmList.map((item: IProps) =>{
                    return(
                        <List.Item onClick={() => handleChangePage(item.filmId)} key={item.name} prefix={<Image src={item.poster}
                            // style={{ borderRadius: 20 }}
                            // fit='cover'
                            width={120}
                        // height={40}
                        />
                        }
                            description={
                                <div>
                                    {/* 评分数据存在 显示评分  否则占位隐藏 */}
                                    {item.grade ? <div>观众评分：{item.grade}</div> : <div style={{ visibility: 'hidden' }}>观众评分：{item.grade}</div>}
                                    <div>类型：{item.category}</div>
                                    <div>导演：{item.director} </div>
                                    <div>{item.nation}|{item.runtime}分钟 </div>
                                </div>
                            }>
                            {item.name}
                        </List.Item>
                    )
                })}
            </List>
        </div>
    )
}
