import React, { useEffect, useState } from 'react'
// 导入封装的 公共处理状态 函数 入口文件
import Store from '../../redux/store'

import styles from './Cinemas.module.css'
// 方式1： redux-thunk 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
import { getCinemaListAction } from '../../redux/actionCreators/getCinemaListAction'
// dispatch函数 通知 修改 公共状态 - header 组件状态
const SetHerder = (props) => {
  Store.dispatch({
    type: 'header-leftSlot', value: {
      elem:  <button onClick={() => {
        // 跳转到 城市切换页
        props.history.push('/city')
      }}>切换城市</button>
    }
  })
  Store.dispatch({
    type: 'header-centerSlot', value: {
      elem: <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{Store.getState().CityReducer.name}-影院</div>
    }
  })
  Store.dispatch({
    type: 'header-rightSlot', value: {
      elem:  <button onClick={() => {
        // 跳转到 城市切换页
        props.history.push('/cinemas/search')
      }} >搜索</button>
     
    }
  })
}
const Destruction = () => {
  // 组件-销毁时 发起 - store.dispatch 通知 显示底部 TabBer 组件 重新修改头部 状态
  Store.dispatch({ type: 'header-leftSlot', value: { elem: '' } })
  Store.dispatch({ type: 'header-centerSlot', value: { elem: '' } })
  Store.dispatch({ type: 'header-rightSlot', value: { elem: '' } })
}
export default function Index(props) {
  const [CityName, setCityName] = useState(Store.getState().CityReducer.name);
  const [CityId, setCityId] = useState();
  const [CinemaList, setCinemaList] = useState(Store.getState().CinemaListReducer.list);
  useEffect(() => {
    console.log('Cinema订阅11==>',CityId,CityId !== Store.getState().CityReducer.id)
    // reducer 函数 - 影院状态管理中列表没有数据 请求接口
    if (Store.getState().CinemaListReducer.list.length === 0) {
      // 未选择 城市 默认城市id ：110100
      /*
        Store.dispatch(action) action 内写异步-在 action（action可写成一个函数）中如getCinemaListAction函数中 请求数据 -
        方式1：redux-thunk 详细案例可见 getCinemaListAction.js
        getCinemaListAction 为一个函数 没有中间件redux-thunk时 仅仅是普通的函数并且 action（就是getCinemaListAction） 只支持返回一个对象 因此return返回的必须是一个对象 如（{type:'change-list',}），
        这引发了异步赋值return返回的问题。
      */
      //  方式2： redux-promise 中间件 async await 等待异步加载
      Store.dispatch(getCinemaListAction(Store.getState().CityReducer.id || 110100))
    } else {
       // 使用  reducer 函数 - 影院状态管理的list列表 缓存的数据
      console.log('使用缓存数据',Store.getState().CinemaListReducer.list)
    }
    // 初始化
    SetHerder(props)
    // subscribe 订阅 - 每次订阅完之后会返回一个函数 这个函数就是取消订阅的唯一函数，通过var unsubscribe 一个变量接收这个 返回的取消函数  名称可任意命名 如：var unsubscribe = Store.subscribe(()=>{})
    var unsubscribe = Store.subscribe(() => {
      console.log('Cinema订阅==>',CityId, Store.getState().CityReducer)

      // 获取list 更新 状态 
      setCinemaList(Store.getState().CinemaListReducer.list)
      setCityName(Store.getState().CityReducer.name)
      setCityId(Store.getState().CityReducer.id)
    })
    // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
    return () => {
      // 取消订阅
      unsubscribe();
      console.log('取消订阅==> unsubscribe ')
      // 重置 header 状态
      Destruction()
    }

  }, [])
  useEffect(()=>{
    // if(City?.id != Store.getState().CityReducer?.id){
    //   // console.log(123123123)
    //   Store.dispatch(getCinemaListAction(Store.getState().CityReducer.id || 110100))
    //   }
    // if(CityId&&CityId!=Store.getState().CityReducer?.id){
     

    //   Store.dispatch(getCinemaListAction(Store.getState().CityReducer.id || 110100))
    // }
    console.log('监听-城市id',Store.getState().CityReducer)
  },[Store.getState().CityReducer.id])
  return (
    <div className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
      {/* // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发 */}
      {/* <h4>Cinemas-方式1：{Store.getState().CityName} </h4> */}

      {/*  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 */}
      <h4 id={CityId}>Cinemas-{CityName}</h4>
      <div>方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 </div>
      <ul>
        {
          CinemaList.map(item => {
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
