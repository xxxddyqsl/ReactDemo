import React, { useState, useEffect } from 'react'
import styles from './Cinemas.module.css'
// 方式1： redux-thunk 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
// 方式2： redux-promise 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
import { getCinemaListAction } from '../../redux/actionCreators/getCinemaListAction'
// react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 语法： connect()(Cinemas) 此时 Cinemas 已经是 connect 的孩子组件
import { connect } from "react-redux"

function Cinemas(props) {
  // react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 此时 Cinemas 已经是 connect 的孩子组件 通过 props访问connect提供的状态
  // 通过 ES6解构的方式 取出 props 对象内部的属性
  let { list, cityId, CityName, newGetCinemaListAction } = props;
  useEffect(() => {
    console.log('Cinema==>', props)
    // 影院状态管理中列表没有数据 请求接口
    if (list.length === 0) {
      // newGetCinemaListAction- connect提供的函数 返回 action对象 类似newStore.dispatch(action) 通知 reducer 函数 修改更新状态
      newGetCinemaListAction(props.cityId || 110100)
    }
    // 依赖 - 传入空数组 useEffect 只执行一次
  }, [list, cityId, CityName, newGetCinemaListAction]);
  return (
    <div className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
      <div className='gg-flex-3' style={{ width: '100%', }}>
        <button onClick={() => {
          // 跳转到 城市切换页
          props.history.push('/city')
        }}>切换城市</button>
        <button onClick={() => {
          // 跳转到 城市切换页
          props.history.push('/cinemas/search')
        }} style={{ marginLeft: 'auto' }}>搜索</button>
      </div>

      {/*  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 */}
      <h4 id={cityId}>Cinemas-{CityName}</h4>
      <div>方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 </div>
      <ul>
        {
          list.map(item => {
            return (
              <li key={item.cinemaId} className={item.cityId}>
                <div>影院：{item.name}</div>
                <div>位置：{item.address}</div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
/*
 connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(Cinemas) 此时 Cinemas 已经是 connect 的孩子组件
 connect第二个参数: 对象 内部为回调函数 将来传给孩子的回调函数 子组件调用回调函数 通知reducer根据 action 修改状态  此时 Cinemas 已经是 connect 的孩子组件

 getCinemaListAction 自定义函数 返回一个 action 其实就是 对象 {type:'xxx',payload:'payload'} 通知reducer 函数 根据type修改状态
    类似 store.dispatch(action)
*/
//  写法1 ： 此时 Cinemas 已经是 connect 的孩子组件 connect将UI组件（ Cinemas 组件）变成 容器组件
// export default connect((state)=>{
//   return {
//     list:state.CinemaListReducer.list,
//     CityName:state.CityReducer.CityName,
//     cityId:state.CityReducer.cityId
//   }
// },{
//   getCinemaListAction,
// })(Cinemas);

//  写法2 ： 此时 Cinemas 已经是 connect 的孩子组件 connect将UI组件（ Cinemas 组件）变成 容器组件
const mapStateToProps = (state) => {
  return {
    list: state.CinemaListReducer.list,
    CityName: state.CityReducer.CityName,
    cityId: state.CityReducer.cityId
  }
};
const mapDispatchToProps = {
  newGetCinemaListAction: getCinemaListAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(Cinemas)