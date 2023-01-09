import React, { Component } from 'react'

import axios from 'axios'

// 创建 context 对象
const GlobalContext = React.createContext();

/*
    非父子组件通信方式：
（3）context状态树传参
*/
class FilmItem extends Component {
    render() {
        return (
            /*
               GlobalContext.Consumer相当于声明此组件为消费者 通过回调函数来获取 供应商提供的服务（参数value）固定语法
            */
            <GlobalContext.Consumer>
                {
                    (value) => {
                        // console.log(value)
                        return <li className='main-tabs-item ' onClick={() => {
                            // 值改变 但无法更新组件
                            // value.title=this.props.item.name;
                            //  调用 供应商GlobalContext.Provider提供的回调函数ChangFilmInfo 修改父组件的状态 并状态改变触发更新渲染
                            value.ChangFilmInfo({title:this.props.item.name,content:this.props.item.synopsis})
                            // console.log(this.props.item.name, this.props.item.synopsis)
                        }}>
                                    <img className='main-tabs-item-img' src={this.props.item.poster} alt={this.props.item.name} />
                                    <div className=' '>
                                        <div className='main-tabs-item-name' title={this.props.item.name}>
                                            {this.props.item.name}
                                        </div>
                                    </div>
                                </li>
                    }
                }
            </GlobalContext.Consumer>
        )
    }
}
class FilmDetail extends Component {
    styleobj = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    }
    render() {
        return (
            /*
                GlobalContext.Consumer相当于声明此组件为消费者 通过回调函数来获取 供应商提供的服务（参数value）固定语法
            */
            <GlobalContext.Consumer>
                {
                    (value)=>{
                        const {title,content} =  value.FilmInfo;
                        return (
                            <div style={this.styleobj}>
                                FilmDetail
                                <h3>{title}</h3>
                                <div>{content}</div>
                             </div>
                        )
                    }
                }
            </GlobalContext.Consumer>
        )
    }
}
export default class Test extends Component {
    // url = 'https://m.maizuo.com/gateway';
    // 获取本地 public静态资源文件下的 测试数据 json文件
    url = '/demo.json' || 'http://localhost:3000/demo.json'
    state = {
        FilmList: [],
        FilmInfo: {},
    }
    //   生命周期 - componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        // 加载 完成 后 请求接口
        this.getAjax();
    }
    // 生命周期 - componentWillUnmount 。这在 React 中被称为“卸载（unmount）”。
    componentWillUnmount() {
    }
    getAjax() {

        axios({
            url: this.url,
            // method: 'get',
            // headers: {
            //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
            //     'X-Host': 'mall.film-ticket.film.list'
            // },
            // params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 781038 }
        }).then((res) => {
            if (res.data && res.data.status === 0) {
                this.setState(() => {
                    return {
                        FilmList: res.data.data.films
                    }
                }, () => {
                    // console.log(JSON.stringify(this.state.FilmList))
                })
            }
        }).catch(err => console.log(err))
    }
    render() {
        return (
            /*
                在想要通信的子组件的共同父组件上 包上<GlobalContext.Provider value={''} >（value 只能传单个参数 参数类型不限多个参数 可用对象的方式如 value={{text:'测试1',name:'测试2'}} ）
                内部 子组件 通过<GlobalContext.Consumer>{(value)=>{console.log(value);return(<div>{value}</div>)}}</GlobalContext.Consumer> 通过回调函数的形式
                获取到<GlobalContext.Provider value={{XXX}}> 上提供的value

            */
            // Provider相当于供应商 value提供的服务（参数）
            <GlobalContext.Provider value={
                    {
                        // 给子组件提供一个状态值 让子组件获取到最新的状态值
                        FilmInfo:this.state.FilmInfo,
                        // 给子组件提供一个修改父组件状态FilmInfo的 函数 否则修改完 无法更新渲染
                        ChangFilmInfo:(data)=>{this.setState({FilmInfo:data})}
                    }
                }>
                <div className='app-assembly'>
                    <h1>08-非父子组件通信context</h1>

                    <div className='gg-flex-4' style={{ width: '600px', border: '1px solid ', height: '400px', }}>
                        {/* 子组件 左侧列表 */}
                        <ul style={{ width: '300px', borderRight: '1px solid ', height: '100%', overflow: 'auto' }}>
                            {
                                this.state.FilmList.map((item, index) => {
                                    return (
                                        <FilmItem item={item} key={item.filmId} />
                                    )
                                })
                            }

                        </ul>
                        {/* 子组件 右侧显示列表的电影名称+内容介绍 */}
                        <FilmDetail />
                    </div>
                </div>
            </GlobalContext.Provider>
        )
    }
}
