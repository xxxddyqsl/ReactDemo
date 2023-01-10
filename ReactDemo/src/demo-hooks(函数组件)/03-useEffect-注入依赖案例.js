import React, { useState, useEffect } from 'react'
import axios from 'axios';
export default function Test() {

    const [type, setType] = useState(0);

    return (
        <div className='app-assembly'>
            <h1>03-hooks-useEffect-注入依赖案例</h1>
            <ul className='gg-flex-3'>
                <li onClick={() => { setType(0) }} style={{ padding: '3px 6px', backgroundColor: type === 0 ? 'teal' : '', borderRadius: '2px', border: '1px solid' }}>正在热映</li>
                <li onClick={() => { setType(1) }} style={{ padding: '3px 6px', backgroundColor: type === 1 ? 'teal' : '', borderRadius: '2px', border: '1px solid' }}>即将上映</li>
            </ul>
            <FilmList type={type} ></FilmList>
        </div>
    )
}
function FilmList(props) {
    const [FilmList, setFilmList] = useState([]);
    const url = 'https://m.maizuo.com/gateway';
    // props.type属性改变 重新请求接口
    const getData = () => {
        if (props.type === 0) {
            axios({
                url: url,
                method: 'get',
                params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 781038 },
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                },
            }).then((res) => {
                if (res.data && res.data.status === 0) {
                    // 更新 状态
                    setFilmList(res.data.data.films)
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            axios({
                url: url,
                method: 'get',
                params: { cityId: 310100, pageNum: 1, pageSize: 10, type: 2, k: 6170108 },
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.film.list'
                },
            }).then((res) => {
                if (res.data && res.data.status === 0) {
                    // 更新 状态
                    setFilmList(res.data.data.films)
                }
            }).catch((err) => {
                console.log(err)
            })

        }
    }
    /*
        第一次 默认会执行一次getData执行的函数  [props.type]注入依赖 依赖发送改变时useEffect都会 getData 函数
        并且多次点击都是 props.type===0 属性没有发送不会 并不会多次执行getData 减少了无意义的重复执行逻辑 请求接口 渲染dom
    */
    useEffect(getData, [props.type]);

    return (

        <ul>
            {console.log('02-useEffect注入依赖 阻止无效更新')}
            {FilmList.map((item) => { return (<li key={item.filmId}>{item.name}</li>) })}
        </ul>
    )
}