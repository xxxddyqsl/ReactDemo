import React, { Component } from 'react'
import Navbar from './UncontrolledTabComponent/Navbar'
import TabBar from './UncontrolledTabComponent/tabBar'
import TabHome from './UncontrolledTabComponent/tabHome'
import TabCinema from './UncontrolledTabComponent/tabCinema'
import TabMine from './UncontrolledTabComponent/tabMine'

export default class testTab extends Component {

  state = {
    // tab选项卡 默认选中的状态
    Check: 'home',
    tabs: [
      { id: 'home', mytext: '首页' },
      { id: 'cinema', mytext: '影院' },
      { id: 'mine', mytext: '我的' }
    ]
  };
  which() {
    // 可用 switch case （内已经return 就不需要 break 打断执行了而且jsx 语法需要return 进行返回的 标签 ）或者 if 条件渲染
    switch (this.state.Check) {
      case 'home':
        return (<TabHome className={'main-tabs-wrapper ' + this.state.Check} callback={this.getMainTab} />)
      case 'cinema':
        return (<TabCinema className={'main-tabs-wrapper ' + this.state.Check} callback={this.getMainTab} />)
      case 'mine':
        return (<TabMine className={'main-tabs-wrapper ' + this.state.Check} callback={this.getMainTab} />)
      default:// 所有条件 都不满足 默认执行
        return null;
    }
  }
  render() {
    return (
      <div className='app-assembly'>
        <h1>02-非受控选项卡功能案例</h1>
        <div className='tabs-wrapper'>
          {/* 子组件- 导航栏 传入回调函数 */}
          <Navbar callback={()=>{
            this.setState({
              Check:'mine'
            });
            alert('通知底部TabBar子组件更新状态会报错的')
          }}/>
          <div className='main-tabs'>
            {/* {
                          // 方式1：
                          this.state.tabs.map((item, index) => {
                              return (
                                  this.state.Check === item.id ? <div className={'main-tabs-item ' + item.id} onClick={(event) => { this.getMainTab(event) }} key={item.id}>{item.mytext+' - 组件'}</div> : ''
                              )
                          })
                      } */}
            {/* 方式2  this.state.Check === 'home' 条件为真  引入首页组件 给首页组件传入class名  传入this.getMainTab函数 否则删除组件 */}
            {/* {this.state.Check === 'home' && <TabHome className={'main-tabs-item ' + this.state.Check}  callback={this.getMainTab} />}
                      {this.state.Check === 'cinema' && <TabCinema className={'main-tabs-item ' + this.state.Check}  callback={this.getMainTab} />}
                      {this.state.Check === 'mine' && <TabMine className={'main-tabs-item ' + this.state.Check}  callback={this.getMainTab} />} */}


            {
              //方式3： 表达式-支持函数表达  改造 上面啰嗦的方式2 使用函数表达式 直接执行 this.which() 函数 且利于维护
              this.which()
            }

          </div>
          {/* 底部按钮 */}
          {/* <div className='footer-tabs'> */}

          {/*
            点击 导航栏内按钮 后进入我的页面 底部tab 需要我的按钮高亮选中状态 此时需要将 状态Check 传入 TabBar子组件（如: <TabBar  Check={this,state.Check} />）
            而TabBar子组件本身就有this.state,Check状态  所以需要在 render() {}内使用 this.setState({ Check: this.props.Check}) 来更新状态（如： render() {this.setState({ Check: this.props.Check})} ）
             setState更新状态的 就会触发 重新渲染render() {}至 此时发生冲突 陷入死循环、

             此时父组件 无法控制 子组件的状态-非受控组件
            */}
          <TabBar className='footer-tabs'  callback={(id) => {
            // 收到子组件 回调 点击了底部 按钮
            console.log(id);
            // 父组件修改 自己的状态
            this.setState({
              Check: id
            })
          }}  Check={this.state.Check}/>
          {/* {
                          this.state.tabs.map((item, index) => <div className={'footer-tabs-btn ' + (this.state.Check === item.id ? "active" : "")} onClick={() => { this.tabCheck(item.id) }} key={item.id}>{item.mytext}</div>)
                      } */}
          {/* </div> */}
        </div>
      </div>
    )
  }
  //   点击 tab按钮 Check 更新状态
  // tabCheck = (id) => {
  //   // 通过 setState 修改 this.state.Check 状态  通知React 更新dom
  //   this.setState({
  //     Check: id
  //   })
  // }
  //   点击tab展示内容
  getMainTab = (event) => {
    console.log(event.target)
    // alert(event.target.innerText)
  }
}
