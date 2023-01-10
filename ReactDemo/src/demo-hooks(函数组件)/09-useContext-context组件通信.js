import React, { useState, useEffect, useContext, useCallback } from 'react'
import axios from 'axios';
// 引入右侧显示详情的子组件
import FilmDetail from './FilmDetail/FilmDetail'

// 创建context对象 使用export 声明 可导出  右侧显示详情的子组件需要导入调用
export const GlobalContext = React.createContext();
export default function Test() {
    //状态-  渲染左侧的列表数据
    const [FilmList, setFilmList] = useState([]);
    // 状态 - 点击左侧li 获取的详情
    const [FilmInfo, setFilmInfo] = useState({});
    // useEffect 传入空数组 不依赖状态 只执行一次
    useEffect(() => {
        getAjax();
        console.log(FilmList)
    }, [])
    //useCallback  传入空数组 不依赖状态 只声明一次 不重复声明
    const getAjax = useCallback(() => {
        let url = '/demo.json' || 'http://localhost:3000/demo.json'
        axios({
            url: url,
        }).then((res) => {
            if (res.data && res.data.status === 0) {
                setFilmList(res.data.data.films)
            }
        }).catch(err => console.log(err))
    }, [])
    return (
        <div className='app-assembly'>
            <h1>09-useContext-context组件通信</h1>
            {/* 在想要通信的子组件的共同父组件上 包上<GlobalContext.Provider value={''} >（value 只能传单个参数 参数类型不限多个参数 可用对象的方式如 value={{text:'测试1',name:'测试2'}} ）
                内部 子组件 通过<GlobalContext.Consumer>{(value)=>{console.log(value);return(<div>{value}</div>)}}</GlobalContext.Consumer> 通过回调函数的形式
                获取到<GlobalContext.Provider value={{XXX}}> 上提供的value

             
              Provider相当于供应商 value提供的服务（参数） */}
            <GlobalContext.Provider value={
                {
                    // 给子组件提供一个状态值 让子组件获取到最新的状态值
                    FilmInfo: FilmInfo,
                    // 给子组件提供一个修改父组件状态FilmInfo的 函数 否则修改完 无法更新渲染
                    ChangFilmInfo: (data) => { setFilmInfo(data) }
                }
            }>
                <div className='gg-flex-4' style={{ width: '600px', border: '1px solid ', height: '400px', }}>
                    {/* 子组件 左侧列表 */}
                    <ul style={{ width: '300px', borderRight: '1px solid ', height: '100%', overflow: 'auto' }}>
                        {
                            FilmList.map((item, index) => {
                                return (
                                    <FilmItem item={item} key={item.filmId} />
                                )
                            })
                        }

                    </ul>
                    {/* 子组件 右侧显示列表的电影名称+内容介绍 */}
                    <FilmDetail />
                </div>
            </GlobalContext.Provider>
        </div>
    )
}



// 子组件 - 左侧列表
function FilmItem(props) {
    /*
        通过 useContext(GlobalContext)钩子函数 传入参数 供应商临时变量-GlobalContext 可以直接获取到 供应商通过的服务 如当前（GlobalContext.Provider 上的唯一参数 value ）
        就不需要 像 class 类组件 一样 通过<GlobalContext.Consumer> 声明此组件为消费者通过回调函数来获取 供应商提供的服务（参数value）
        固定语法  <GlobalContext.Consumer>  {(value)=>{console.log(value)}}  </GlobalContext.Consumer> 如下
    */
    const value = useContext(GlobalContext);
    return (
        <li className='main-tabs-item ' onClick={() => {
            // 值改变 但无法更新组件
            // value.title=props.item.name;
            //  调用 供应商GlobalContext.Provider提供的回调函数ChangFilmInfo 修改父组件的状态 并状态改变触发更新渲染
            value.ChangFilmInfo({ title: props.item.name, content: props.item.synopsis })
            // console.log(props.item.name, props.item.synopsis)
        }}>
            <img className='main-tabs-item-img' src={props.item.poster} alt={props.item.name} />
            <div className=' '>
                <div className='main-tabs-item-name' title={props.item.name}>
                    {props.item.name}
                </div>
            </div>
        </li>

        /*
           GlobalContext.Consumer相当于声明此组件为消费者 通过回调函数来获取 供应商提供的服务（参数value）固定语法
        */
        // <GlobalContext.Consumer>
        //     {
        //         (value) => {
        //             // console.log(value)
        //             return <li className='main-tabs-item ' onClick={() => {
        //                 // 值改变 但无法更新组件
        //                 // value.title=props.item.name;
        //                 //  调用 供应商GlobalContext.Provider提供的回调函数ChangFilmInfo 修改父组件的状态 并状态改变触发更新渲染
        //                 value.ChangFilmInfo({ title: props.item.name, content: props.item.synopsis })
        //                 // console.log(props.item.name, props.item.synopsis)
        //             }}>
        //                 <img className='main-tabs-item-img' src={props.item.poster} alt={props.item.name} />
        //                 <div className=' '>
        //                     <div className='main-tabs-item-name' title={props.item.name}>
        //                         {props.item.name}
        //                     </div>
        //                 </div>
        //             </li>
        //         }
        //     }
        // </GlobalContext.Consumer>
    )
}