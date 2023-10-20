import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

// 自定义 hooks
const useGetData = () => {
  const [FilmList, setFilmList] = useState([])
  useEffect(() => {
    axios({
      url: 'https://m.maizuo.com/gateway',
      method: 'get',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.list'
      },
      params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 781038 }
    }).then(res => {
      setFilmList(res.data.data.films)
    }).catch(err => {
      console.error(err)
    })
  }, [])
  return {
    FilmList
  }
}
export default function Nowplaying(props) {
  console.log(props)
  const { FilmList } = useGetData();
  return (
    <div style={{ border: '1px solid red', width: '100%', flex: '1', overflow: 'hidden', height: '0' }}>
      <ul className='main-tabs-list' style={{ overflow: 'auto', flex: '1', height: '100%' }} >
        {FilmList.map(item => <WithFilmItem key={item.filmId} {...props} {...item}></WithFilmItem>)}
      </ul>
    </div>
  )
}
const WithFilmItem = withRouter(FilmItem)
function FilmItem(props) {
  let { name, poster, filmId } = props;
  return (
    <li className='main-tabs-item gg-flex-4' onClick={() => {
      //路由传参方式1：动态路由 params参数
      // props.history.push(`/detail/${filmId}`);

      // 需要 配合 BrowserRouter 使用 路由传参方式3：state 参数   接收参数：this.props.location.state  - 刷新后参数不会消失
      props.history.push({ pathname: '/detail', state: { myid: filmId } });
    }}>
      <img className='main-tabs-item-img' src={poster} alt='' title={name} />
      <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
        {/* 电影名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */}
        <div className='main-tabs-item-name' title={name}  >{name}</div>
      </div>
    </li>
  )
}