import React, { useEffect, useState, useMemo, useRef, } from 'react'
import axios from 'axios'
// 导入路由 声明式导航-NavLink 导入路由封装的 useHistory 等价于  props.history
// withRouter 将组件包装一层 提供 props 及 需要的路由如（props.history）  withRouter可以帮助跨级 传输  props及history路由这些值
import { NavLink, useHistory, withRouter } from 'react-router-dom'

// 直接引入组件即可，antd-mobile 会自动为你加载 css 样式文件：
import { List, Image,InfiniteScroll  } from 'antd-mobile'
 
function GetData(count,FilmList,setFilmList,setHasMore){
    console.log(count)
    axios({
        url: 'https://m.maizuo.com/gateway',
        method: 'get',
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
            'X-Host': 'mall.film-ticket.film.list'
        },
        // count 加载更多 页码
        params: { cityId: 110100, pageNum: count, pageSize: 10, type: 1, k: 1880151 }
    }).then(res => {
        // 加载更多 合并新的数据
        setFilmList([...FilmList,...res.data.data.films]);
        // 加载更多 没有新的数据返回时 hasMore设置为false 禁止在滚动加载更多
        setHasMore(res.data.data.films.length>0?true:false)
    }).catch(err => {
        console.error(err)
    })
}
export default function Nowplaying(props) {
     // useState 或 useRef 都可以 记住变量 不丢失
     const count = useRef(0);
     const [FilmList, setFilmList] = useState([])
     // hasMore	是否还有更多内容 有为true 没有更多数据为false
     const [hasMore,setHasMore] = useState(true)
    //  useEffect(()=>{
    //     GetData(count,setFilmList,setHasMore)
    //  },[])
    // InfiniteScroll 无限滚动组件 滚动到底部触发 - 加载完成默认滚动条触底会加载一次
    const loadMore=()=>{
        console.log('到底了')
        // 页码+1 获取下一页的数据
        count.current++;
       //  hasMore设置为false 禁止在执行滚动加载更多 防止无限触发  新的数据返回时在设置为true等待下一次 滚动到底部触发
        setHasMore(false)
        GetData(count.current,FilmList,setFilmList,setHasMore)
    }

    return (
        <div style={{  width: '100%', flex: '1', overflow: 'hidden', height: '0' }}>
            {/* <ul className='main-tabs-list' style={{ overflow: 'auto',flex: '1',height: '100%'  }} >
                {FilmList.map(item=><WithFilmItem key={item.filmId} {...props} {...item}></WithFilmItem>)}
             </ul> */}
             {/*  列表 组件 */}
            <List align-items='flex-start' >
                {FilmList.map(item => <WithFilmItem key={item.filmId} {...props} {...item}></WithFilmItem>)}
            </List>
            {/*  无限滚动 组件  hasMore	是否还有更多内容   loadMore	加载更多的回调函数*/}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} ></InfiniteScroll>
        </div>
    )
}
const WithFilmItem = withRouter(FilmItem)
function FilmItem(props) {
    let { name, poster, filmId, synopsis, category, director, runtime, nation, grade } = props;
    const handleChangePage=(id)=>{
        // 使用 路由封装的 useHistory
         // history.push(`/detail/${item.filmId}`);
         //  编程式路由导航
         //路由传参方式1：动态路由 params参数   接收参数：this.props.match.params - 刷新后参数消失
         props.history.push(`/detail/${id}`);
         //  props.history.replace(`/detail/${item.filmId}`)

         //路由传参方式2：query 参数   接收参数：this.props.location.query  - 刷新后参数消失
         //  props.history.push({pathname:'/detail', query:{myid:item.filmId}});
         //  props.history.replace({pathname:'/detail', query:{myid:item.filmId}})

         //路由传参方式3：state 参数   接收参数：this.props.location.state  - 刷新后参数不会消失
         // props.history.push({ pathname: '/detail', state: { myid: filmId } });
         //  props.history.replace({pathname:'/detail', state:{myid:item.filmId}})

         //  props.history.push(`/detail/`,{id:item.filmId});
         // 路由导航方式- 编程式路由导航- replace 跳转
         // console.log(props)

 }
    return (
        <List.Item onClick={()=>handleChangePage(filmId)}  key={name}  prefix={ <Image src={poster}
                    // style={{ borderRadius: 20 }}
                    // fit='cover'
                    width={120}
                // height={40}
                />
            }
            description={
                <div>
                    {/* 评分数据存在 显示评分  否则占位隐藏 */}
                    {grade?<div>观众评分：{grade}</div>:<div style={{visibility:'hidden'}}>观众评分：{grade}</div>}
                    <div>类型：{category}</div>
                    <div>导演：{director} </div>
                    <div>{nation}|{runtime}分钟 </div>
                </div>
            }>
            {name}
        </List.Item>
        // <li className='main-tabs-item gg-flex-4' onClick={()=>handleChangePage(filmId)}>
        //     <img className='main-tabs-item-img' src={poster} alt='' title={name} />
        //     <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
        //         {/* 电影名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */}
        //         <div className='main-tabs-item-name' title={name}  >{name}</div>

        //     </div>

        // </li>
    )
}
