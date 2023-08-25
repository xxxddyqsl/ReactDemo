import React, { Component } from 'react'
import axios from 'axios'

/*
    非父子组件通信方式：
（1）状态提升（中间人模式）
      React中的状态提升概括来说，就是将多个组件需要共享的状态提升到它们最近的父组件上
      在父组件上改变这个状态 然后通过 props属性分发给子组件

    解释说明：如 父组件app 内部 有A、B 两个子组件 ，这个时候如果 子组件A 想要子组件B内的一些信息 ，
    可以通过如下方式：
    在父组件app 中设置一个状态（如 text）， 父组件app内把这个 text状态传给A组件，并且 在B组件身上 绑定一个 设置text状态的 回调函数 (callback),
    B组件内部调用 父组件app 传入回调函数 (callback)并且传入信息，父组件app 内的状态text 发生改变 触发 render 更新， 
    并且父组件app内把这个更新后的text状态再次传给A组件。 而这个 父组件app 就相当于是 中间人
*/
class FilmItem extends Component {
    render() {
        return (
            <li className='main-tabs-item ' onClick={() => this.props.callback({ title: this.props.item.name, content: this.props.item.synopsis })}>
                <img className='main-tabs-item-img' src={this.props.item.poster} alt={this.props.item.name} />
                <div className=' '>
                    <div className='main-tabs-item-name' title={this.props.item.name}>
                        {this.props.item.name}
                    </div>
                </div>

            </li>
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
        //通过es6解构的 取出 父组件传入的属性 等价 this.props.title
        let { title, content } = this.props;
        // console.log(this.props)
        return (
            <div style={this.styleobj}>
                <h3>{title}</h3>
                <div>{content}</div>
            </div>
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
            // console.log(res.data)
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
            <div className='app-assembly'>
                <h1>06-非父子组件通信 - 状态提示（中间人模式）</h1>

                <div className='gg-flex-4' style={{ width: '600px', border: '1px solid ', height: '400px', }}>
                    {/* 子组件 左侧列表 */}
                    <ul style={{ width: '300px', borderRight: '1px solid ', height: '100%', overflow: 'auto' }}>
                        {
                            this.state.FilmList.map((item, index) => {
                                return (
                                    <FilmItem item={item} key={item.filmId} callback={(obj) => {
                                        // 子组件 调用回调函数 传入数据 让父组件更新状态 FilmInfo 通过 props属性分发给右侧的ListDetails子组件显示
                                        this.setState({
                                            FilmInfo: obj
                                        })
                                    }} />
                                )
                            })
                        }

                    </ul>

                    {/* 子组件 右侧显示列表的电影名称+内容介绍
                        通过es6的对象可 ... 如：{...this.state.FilmInfo} 展开的方式 就属性全部赋给props 子组件调用
                    
                        上方 FilmItem 组件 也可通过 <FilmItem {...item} es6 展开的方式赋值给props 子组件调用 />
                    */}
                    <FilmDetail  {...this.state.FilmInfo} />
                </div>
            </div>
        )
    }
}
