import React, { useEffect, useState, useMemo, } from 'react'
import axios from 'axios'
// 导入路由 声明式导航-NavLink 导入路由封装的 useHistory 等价于  props.history
// withRouter 将组件包装一层 提供 props 及 需要的路由如（props.history）  withRouter可以帮助跨级 传输  props及history路由这些值
import { NavLink, useHistory ,withRouter} from 'react-router-dom'
/*
    编程式路由导航
        借助this.prosp.history对象上的API对操作路由跳转、前进、后退
        -this.prosp.history.push()
        -this.prosp.history.replace()
        -this.prosp.history.goBack()
        -this.prosp.history.goForward()
        -this.prosp.history.go(1)

        push跳转方式：
        //push跳转+携带params参数
            this.props.history.push(`/films/nowplaying/${id}/${title}`)
            接收参数：this.props.match.params

        //push跳转+携带search参数
            this.props.history.push(`/films/nowplaying?id=${id}&title=${title}`)
            接收参数：this.props.location.search
            备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

        //push跳转+携带state参数
            this.props.history.push(`/films/nowplaying`,{id,title})
            接收参数：this.props.location.state
            备注：刷新也可以保留住参数


        replace跳转方式：
        //replace跳转+携带params参数
            this.props.history.replace(`/films/nowplaying/${id}/${title}`)
            接收参数：this.props.match.params


        //replace跳转+携带search参数
            this.props.history.replace(`/films/nowplaying?id=${id}&title=${title}`)
            接收参数：this.props.location.search
            备注：获取到的search是urlencoded编码字符串，需要借助querystring解析

        //replace跳转+携带state参数
            this.props.history.replace(`/films/nowplaying`,{id,title})
            接收参数：this.props.location.state
            备注：刷新也可以保留住参数
*/
function useGetData() {
    const [FilmList, setFilmList] = useState([]);
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
function useGetFilmList(FilmList, search) {
    const getFilmList = useMemo(() => () => {
        return (
            FilmList.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容
                let is = false;
                // 循环演员名称
                for (let i in item.actors) {
                    //当前电影下 演员名称内 包含搜索内容 跳出循环 返回true  对filter只需要true或false 来执行过滤返回 整个当前电影的数据
                    if (item.actors[i].name.includes(search)) {
                        // is 赋 true
                        is = item.actors[i].name.includes(search);
                        // 不需要在执行循环查找当前电影下演员名 跳出
                        break;
                    }
                }
                return (item.name.includes(search) || is)
            })
        )
    }, [FilmList, search])
    return {
        getFilmList
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
export default function Nowplaying(props) {

    const [search, setSearch] = useState('')
    const { FilmList } = useGetData();
    const { getFilmList } = useGetFilmList(FilmList, search)

    // 引用 路由封装的useHistory 等价于  props.history
    const history = useHistory();
    return (
        <div>
            <h4> 嵌套路由 -  Nowplaying - 编程式路由导航-push跳转</h4>
            <div className='main-tabs-header gg-flex-1'>
                {/* 监听 input  */}
                <input type='text' className='searchInput' value={search} placeholder='搜索电影或参演名' onChange={(event) => (
                    setSearch(event.target.value)
                )} />
            </div>
            <div className='Home-wrapper' style={{ border: '1px solid red', width: '100%', flex: '1', overflow: 'hidden' }}>
                <ul className='main-tabs-list' style={{ overflow: 'auto', height: '400px', }} >
                    {

                        // 监听 input 受控 修改search状态  状态改变触发组件更新 组件执行内部函数 再次执行 getCinemaList记忆函数 进行计算过滤
                        getFilmList().map((item, index) => {
                            return (
                                /*
                                方式1：
                                    此时 <FilmItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 需要手动传入<FilmItem/> 子组件内
                                        es6 展开 {...props} 将 props （props内包含了history路由的信息） 赋值给子组件的props 否则子组件内的props没有路由的信息
                                        es6 展开 {...item} 将数据赋值给子组件的props
                                */
                                // <FilmItem key={item.filmId} search={search} {...item} {...props} />
                                 /*
                                方式2：
                                    此时 <FilmItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 通过 withRouter(FilmItem)
                                         此时 withRouter 会在 FilmItem 外包装一层 并且提供 props及history路由的信息
                                         withRouter可以帮助跨级 传输  props及history路由这些值
                                        es6 展开 {...item} 将数据赋值给子组件的props
                                */
                                <WithFilmItem key={item.filmId} search={search} {...item}></WithFilmItem>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
const WithFilmItem= withRouter(FilmItem)
function FilmItem(props) {
    var performer = '', director = '';
    let { name, poster, filmId, actors } = props;
    const { heightLight } = useHeightLight();
    return (
        <li className='main-tabs-item gg-flex-4' onClick={() => {
            // 使用 路由封装的 useHistory
            // history.push(`/detail/${item.filmId}`);
            //  编程式路由导航
            //路由传参方式1：动态路由 params参数   接收参数：this.props.match.params - 刷新后参数消失
            //  props.history.push(`/detail/${item.filmId}`);
            //  props.history.replace(`/detail/${item.filmId}`)

            //路由传参方式2：query 参数   接收参数：this.props.location.query  - 刷新后参数消失
            //  props.history.push({pathname:'/detail', query:{myid:item.filmId}});
            //  props.history.replace({pathname:'/detail', query:{myid:item.filmId}})

            //路由传参方式3：state 参数   接收参数：this.props.location.state  - 刷新后参数不会消失
            props.history.push({ pathname: '/detail', state: { myid: filmId } });
            //  props.history.replace({pathname:'/detail', state:{myid:item.filmId}})

            //  props.history.push(`/detail/`,{id:item.filmId});
            // 路由导航方式- 编程式路由导航- replace 跳转式导航
            console.log(props)

        }}>
            <img className='main-tabs-item-img' src={poster} alt='' title={name} />
            <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
                {/* 电影名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */}
                <div className='main-tabs-item-name' title={name} dangerouslySetInnerHTML={
                    {
                        __html: heightLight(name, props.search)
                    }
                }></div>


                {/* 路由导航方式2 - NavLink 声明式导航 - 传参 点击进入详情*/}
                {/* <NavLink  to={'/detail/'+item.filmId}> 点击进入详情' </NavLink> */}


                {/* 每次循环清空 performer + director 防止上一条数据的内容存在  多个变量 以数组的形式连接,隔离 赋 空值  */}
                {(performer !== '' || director !== '' ? [performer = '', director = ''] : '')}
                {
                    [
                        //（forEach代替map） item.actors.map ，map要求有返回值(下方无return 返回值) 否则弹出黄色警告
                        actors.forEach((itemK) => {
                            if (itemK.role !== "导演") {
                                // 拼接多个 参演人员
                                performer += `${performer.length > 0 ? '、' : ''} ${itemK.name}`;
                                // performer+=`<span className='main-tabs-item-type' key=${item.filmId+'_'+itemK.name}>${performer.length>0?'、':''} ${itemK.name}</span>`
                                // return (<div className='main-tabs-item-type' key={item.filmId+itemK.name}>{itemK.name}</div>)
                            } else {
                                // 拼接多个 导演
                                director += `${director.length > 0 ? '、' : ''} ${itemK.name}`;
                                // return (<div className='main-tabs-item-type'  key={item.filmId+itemK.name}>{itemK.role}：{itemK.name}</div>)
                            }
                        }),
                        //方式1： 前面条件为真 执行&& 后面 输出标签
                        director.length > 0 && <div className='main-tabs-item-type-director' key={filmId + '_director'} title={director} dangerouslySetInnerHTML={
                            {
                                /* 姓名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */
                                __html: (`导演：${director.replace(props.search, "<span class='keyHighlight' >" + props.search + "</span>")}`)
                            }
                        }></div>,
                        //方式2： 三目运算 输出标签
                        performer.length > 0 ? <div className='main-tabs-item-type-performer' key={filmId + '_performer'} title={performer} dangerouslySetInnerHTML={
                            {
                                /* 姓名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */
                                __html: (`演员：${performer.replace(props.search, "<span class='keyHighlight' >" + props.search + "</span>")}`)
                            }
                        }></div> : '',
                    ]
                }
                {/* {director.length>0?<div  className='main-tabs-item-type' title={director}>{"导演："+director}</div>:''}
{performer.length>0?<div  className='main-tabs-item-type' title={performer}>{"演员："+performer}</div>:''} */}


            </div>

        </li>
    )
}