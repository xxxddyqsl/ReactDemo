import React, { Component } from 'react'
import BetterScroll from 'better-scroll'

// betterScroll  是一款重点解决移动端各种滚动场景需求的开源插件， 纯js实现 无任何依赖- 可以做普通的滚动列表，还可以做轮播图、picker 等等  cnpm install --save better-scroll
export default class TestBetterScroll extends Component {
  state = {
    list: []
  }
  render() {
    return (
      <div className='app-assembly'>
        <h1>10-betterScroll</h1>
        <button onClick={() => { this.getData() }}>获取数据</button>
        <div className='wrapper' style={{ height: '200px', border: '1px solid red', overflow: 'hidden' }}>
          <ul className='content '>
            {
              this.state.list.map((item, index) => {
                return (<li key={index}>{item}</li>)
              })
            }
          </ul>
        </div>

      </div>
    )
  }
  getData = () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //  React 18版本后setState  不管是处于在异步还是同步逻辑中， 都是 异步更新状态，异步更新真实dom 所以 要在 setState 第二个参数回调函数内使用 BetterScroll
    this.setState({
      list: arr
    }, () => {
      console.log(this.state.list)
      console.log(document.querySelectorAll('li'))
      
      //  setState 第二个 参数 为回调函数，  状态和真实dom已经更新完成之后会触发 执行回调
      // 需要在  状态和真实dom 已经更新完成之后会调用 BetterScroll
      const bScroll = new BetterScroll('.wrapper', {
        // probeType: 0,1都是不侦测实时位置，2是在手指滚动的过程中监测，手指离开后的惯性滚动过程不监测，3是只要滚动，都监测
        probeType: 3,
        click: true, //点击
        pullUpLoad: true //上拉加载更多
      });
      console.log(this.scroll)
      //监听滚动位置 默认情况下BScroll 是不可以监听滚动位置的，只有在初始化的时候设置了probeType才可以监听
      bScroll.on('scroll', function (position) {
        console.log(position)
      })
      bScroll.on('pullingUp', function () {
        console.log('上拉触底 加载更多');
        //发送网络请求，请求更多页的数据

        //等请求完成，进行数据展示

        //调用finishiPullUp()表示本次上拉加载完成，可以进行下次上拉加载更多，不调用这个的话，默认只能由一次上拉加载更多
        setTimeout(function () {
          bScroll.finishPullUp()
        }, 2000)
      })
      /*
        把要滚动的内容放在wrapper里面包裹起来，要给最外层的div一个固定高度，设置超出部分隐藏，overflow: hidden;只有当内容超过了最外层div的高度时才会滚动，
        最长用的就是监听滚动位置，上拉加载更多，以及点击事件，特别需要注意的是，点击事件，BetterScroll 默认会阻止浏览器的原生 click 事件。
        当设置为 true，BetterScroll 会派发一个 click 事件，亲测当点击的元素是button时，并不会阻止点击事件，但是当点击的是div元素的时候，必须要设置click 为true，才能点击事件。
      */
    })


  }
}
