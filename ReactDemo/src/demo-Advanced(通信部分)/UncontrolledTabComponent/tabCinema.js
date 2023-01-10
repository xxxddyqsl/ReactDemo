import React, { Component } from 'react'
import axios from 'axios'
export default class tabCinema extends Component {
  // 影院 地址接口
  // url='https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=584748'
  url = 'https://m.maizuo.com/gateway'
  // 状态值
  state = {
    // （使用受控组件 优化）
    searchV: '',
    CinemaList: [],
    // 搜索内容 缺点占用内存 - 弃用 （使用受控组件 优化）
    // SearchList: [],
    // 备份数据   备份数据 缺点占用内存 - 弃用 （使用受控组件 优化）
    // backCinemaList: [],
  }
  //   生命周期 - componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    // 页面加载完成 请求接口
    this.getCinema()
  }
  // 生命周期 - componentWillUnmount 。这在 React 中被称为“卸载（unmount）”。
  componentWillUnmount() {

  }
  getCinema = () => {
    axios({
      url: this.url,
      method: 'GET',
      params: {
        cityId: 110100,
        ticketFlag: 1,
        k: 584748,
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      },
    }).then(res => {
      const data = res.data;
      if (data.status === 0) {
        // 更新 状态值 调整react 更新dom
        this.setState({
          CinemaList: data.data.cinemas,
          // 更新 备份数据 缺点占用内存 - 弃用 （使用受控组件 优化）
          // backCinemaList:data.data.cinemas,
        })
      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        {/* 搜索 */}
        <div className='main-tabs-header gg-flex-1'>
          {/* 监听 input  */}
          {/* <input type='text' className='searchInput' placeholder='搜索影院' onInput={(event) => (this.handleChange(event))} /> */}

          {/* 使用受控组件优化 onChange监听 input 状态绑定input的 value值   状态更新React重新渲染 render() 
              调用getCinemaList函数且使用filter函数过滤input上绑定的状态值state.searchV  返回创建一个新数组（不会影响原数据CinemaList）
              所以无需使用备份数据backCinemaList或者过滤搜索返回的值SearchList，
          */}
          <input type='text' className='searchInput' value={this.state.searchV} placeholder='搜索影院' onChange={(event) => (
            this.setState({
              searchV: event.target.value
            })
          )} />
        </div>
        <ul className='main-tabs-list' onClick={(event) => { this.props.callback(event) }} >
          {
            // 更新 备份数据 缺点占用内存 - 移除 （使用受控组件 优化）
            // (this.state.SearchList.length > 0 ? this.state.SearchList : this.state.CinemaList).map((item, index) => {

            // 使用受控组件优化
            this.getCinemaList().map((item, index) => {
              return (<li className='main-tabs-item gg-flex-4' key={item.cinemaId}>
                {/* <img className='main-tabs-item-img' src={item.logoUrl} alt='' title={item.name} /> */}
                <div className='main-tabs-item-right  gg-flex-4  gg-flex-2'>
                  <div className='main-tabs-item-name' title={item.name} dangerouslySetInnerHTML={
                    {
                      __html: (`${this.heightLight(item.name, this.state.searchV)}`)
                      // __html: (`${item.name.toUpperCase().replace(this.state.searchV.toUpperCase(), (text)=> "<span class='keyHighlight' >" + text+ "</span>")}`)
                    }
                  }></div>
                  <div className='main-tabs-item-address' title={item.address} dangerouslySetInnerHTML={
                    {
                      __html: (`${item.address.toUpperCase().replace(this.state.searchV.toUpperCase(), (text) => "<span class='keyHighlight' >" + text + "</span>")}`)
                    }
                  }></div>

                </div>
              </li>)
            })
          }
        </ul>

      </div>
      // <div className={this.props.className}  onClick={(event) => { this.props.callback(event) }} >影院 - 组件</div>
    )
  }
  // 监听input 模糊查询- 弃用
  handleChange = (event) => {
    const val = event.target.value;
    // 更新状态
    this.setState({
      searchV: val,
      SearchList: this.state.CinemaList.filter(item => {
        // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容
        return (item.name.toUpperCase().includes(val.toUpperCase()) || item.address.toUpperCase().includes(val.toUpperCase()))
      })
    })
  }
  // 优化方案
  getCinemaList = () => {
    /*
    input绑定的value状态state.searchV改变 触发React 重新渲染render()
      使用filter函数过滤input上绑定的状态值state.searchV  返回创建一个新数组（不会影响原数据CinemaList）
    */
    return (
      this.state.CinemaList.filter(item => {
        // 搜索 内容val +电影院名称item.name+地址item.address 都转大写 这样匹配时不管输入的大小写 都可以匹配返回对应内容
        return (item.name.toUpperCase().includes(this.state.searchV.toUpperCase()) || item.address.toUpperCase().includes(this.state.searchV.toUpperCase()))
      })
    )
  }
  //高亮字符串 string: 需要处理的字符串，keyword：键盘输入的内容
  heightLight = (string, keyword) => {
    var reg = new RegExp(keyword, "gi");
    string = string.replace(reg, (text) => "<span class='keyHighlight' >" + text + "</span>");
    return string;
  }
}
