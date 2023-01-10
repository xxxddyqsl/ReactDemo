import React, { Component } from 'react'
import axios from 'axios'
import BetterScroll from 'better-scroll'
export default class tabHome extends Component {
    // 页面 地址 https://m.maizuo.com/v5/#/films/nowPlaying 接口地址'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=781038'
    // url1 = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=781038';
    url = 'https://m.maizuo.com/gateway';
    // 演员
    performer = ''
    // 导演
    director = ''
    state = {
        // 接口返回的原数据
        FilmList: [],
        // 使用受控组件 优化
        searchV: '',
        // 搜索 返回的数据   // 搜索内容 缺点占用内存 - 弃用 （使用受控组件 优化）
        // SearchList: [],
    }
    // 使用 axios 第三方库 专门用于请求数据
    getData = () => {
        // axios.get(this.url).then((res)=>{
        //     console.log(res)
        // }).catch((err)=>{
        //     console.log(err)
        // })
        axios({
            url: this.url,
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            },
            params: { cityId: 110100, pageNum: 1, pageSize: 10, type: 1, k: 781038 }
        }).then((res) => {
            // console.log(res.data)
            if (res.data && res.data.status === 0) {
                this.setState(() => {
                    return {
                        FilmList: res.data.data.films
                    }
                }, () => {
                    new BetterScroll('.Home-wrapper')
                })
                // console.log(this.state.list)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    //  生命周期 - componentDidMount() 当 Child 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。
    //   生命周期 - componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        // 加载 完成 后 请求接口
        this.getData();
    }
    // 生命周期 - componentWillUnmount 。这在 React 中被称为“卸载（unmount）”。
    componentWillUnmount() {
    }
    render() {
        return (
            <div className={this.props.className} >
                {/* 搜索 */}
                <div className='main-tabs-header gg-flex-1'>
                    {/* 监听 input  */}
                    {/* <input type='text' className='searchInput' placeholder='搜索电影或参演名' onInput={(event) => (this.handleChange(event))} /> */}

                    {/* 使用受控组件优化 onChange监听 input 状态绑定input的 value值   状态更新React重新渲染 render()
              调用getFilmList函数且使用filter函数过滤input上绑定的状态值state.searchV  返回创建一个新数组（不会影响原数据FilmList）
              所以无需使用备份数据backFilmList或者过滤搜索返回的值SearchList，
          */}
                    <input type='text' className='searchInput' value={this.state.searchV} placeholder='搜索电影或参演名' onChange={(event) => (
                        this.setState({
                            searchV: event.target.value
                        })
                    )} />
                </div>
                <div className='Home-wrapper' style={{ border: '1px solid red', width: '100%', flex: '1', overflow: 'hidden' }}>
                    <ul onClick={(event) => { this.props.callback(event) }} >

                        {
                            // 如果搜索框 查询有返回值 使用搜索过滤返回的SearchList数据 否则使用原接口返回的list数据
                            // 更新 备份数据 缺点占用内存 - 移除 （使用受控组件 优化）
                            // (this.state.SearchList.length > 0 ? this.state.SearchList : this.state.list).map((item, index) => {

                            // 使用受控组件优化 - getFilmList()函数  使用 filter 函数过滤input上绑定的状态值state.searchV  返回创建一个新数组（不会影响原数据FilmList）
                            this.getFilmList().map((item, index) => {
                                return (
                                    <li className='main-tabs-item gg-flex-4' key={item.filmId}>
                                        <img className='main-tabs-item-img' src={item.poster} alt='' title={item.name} />
                                        <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
                                            {/* 电影名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */}
                                            <div className='main-tabs-item-name' title={item.name} dangerouslySetInnerHTML={
                                                {
                                                    __html: (`${item.name.replace(this.state.searchV, "<span class='keyHighlight' >" + this.state.searchV + "</span>")}`)
                                                }
                                            }></div>
                                            {/* 每次循环清空 performer + director 防止上一条数据的内容存在  多个变量 以数组的形式连接,隔离 赋 空值  */}
                                            {(this.performer !== '' || this.director !== '' ? [this.performer = '', this.director = ''] : '')}
                                            {
                                                [
                                                    //（forEach代替map） item.actors.map ，map要求有返回值(下方无return 返回值) 否则弹出黄色警告
                                                    item.actors.forEach((itemK) => {
                                                        if (itemK.role !== "导演") {
                                                            // 拼接多个 参演人员
                                                            this.performer += `${this.performer.length > 0 ? '、' : ''} ${itemK.name}`;
                                                            // this.performer+=`<span className='main-tabs-item-type' key=${item.filmId+'_'+itemK.name}>${this.performer.length>0?'、':''} ${itemK.name}</span>`
                                                            // return (<div className='main-tabs-item-type' key={item.filmId+itemK.name}>{itemK.name}</div>)
                                                        } else {
                                                            // 拼接多个 导演
                                                            this.director += `${this.director.length > 0 ? '、' : ''} ${itemK.name}`;
                                                            // return (<div className='main-tabs-item-type'  key={item.filmId+itemK.name}>{itemK.role}：{itemK.name}</div>)
                                                        }
                                                    }),
                                                    //方式1： 前面条件为真 执行&& 后面 输出标签
                                                    this.director.length > 0 && <div className='main-tabs-item-type-director' key={item.filmId + '_director'} title={this.director} dangerouslySetInnerHTML={
                                                        {
                                                            /* 姓名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */
                                                            __html: (`导演：${this.director.replace(this.state.searchV, "<span class='keyHighlight' >" + this.state.searchV + "</span>")}`)
                                                        }
                                                    }></div>,
                                                    //方式2： 三目运算 输出标签
                                                    this.performer.length > 0 ? <div className='main-tabs-item-type-performer' key={item.filmId + '_performer'} title={this.performer} dangerouslySetInnerHTML={
                                                        {
                                                            /* 姓名 查询关键字 高亮 使用 dangerouslySetInnerHTML 解析字符串标签 如 <h1>富文本展示</h1> */
                                                            __html: (`演员：${this.performer.replace(this.state.searchV, "<span class='keyHighlight' >" + this.state.searchV + "</span>")}`)
                                                        }
                                                    }></div> : '',
                                                ]
                                            }
                                            {/* {this.director.length>0?<div  className='main-tabs-item-type' title={this.director}>{"导演："+this.director}</div>:''}
                                {this.performer.length>0?<div  className='main-tabs-item-type' title={this.performer}>{"演员："+this.performer}</div>:''} */}


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

    handleChange = (e) => {
        const val = e.target.value;
        //  filter函数 用于对数组进行过滤 并且 不会对空数组进行检测、不会改变原始数组 因此 可不用 深度拷贝 数据 更新状态
        this.setState({
            searchV: val,
            SearchList: this.state.list.filter((item, index) => {
                let is = false;
                // 循环演员名称
                for (let i in item.actors) {
                    //当前电影下 演员名称内 包含搜索内容 跳出循环 返回true  对filter只需要true或false 来执行过滤返回 整个当前电影的数据
                    if (item.actors[i].name.includes(val)) {
                        // is 赋 true
                        is = item.actors[i].name.includes(val);
                        // 不需要在执行循环查找当前电影下演员名 跳出
                        break;
                    }
                }
                return (item.name.includes(val) || is)
            })
        })
        // input 值为空 赋 备份list 或者查询请求接口  item.name.includes(val) ||

        console.log(this.state.SearchList)
    }


    // 优化方案
    getFilmList = () => {
        /*
        input绑定的value状态state.searchV改变 触发React 重新渲染render()
          使用filter函数过滤input上绑定的状态值state.searchV  返回创建一个新数组（不会影响原数据FilmList）
        */
        return (
            this.state.FilmList.filter(item => {
                // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容
                let is = false;
                // 循环演员名称
                for (let i in item.actors) {
                    //当前电影下 演员名称内 包含搜索内容 跳出循环 返回true  对filter只需要true或false 来执行过滤返回 整个当前电影的数据
                    if (item.actors[i].name.includes(this.state.searchV)) {
                        // is 赋 true
                        is = item.actors[i].name.includes(this.state.searchV);
                        // 不需要在执行循环查找当前电影下演员名 跳出
                        break;
                    }
                }
                return (item.name.includes(this.state.searchV) || is)
            })
        )
    }
}
