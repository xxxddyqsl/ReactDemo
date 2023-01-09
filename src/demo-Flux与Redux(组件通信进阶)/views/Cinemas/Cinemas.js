import React, { useState, useEffect } from 'react'
import styles from './Cinemas.module.css'
// 导入 Redux 单个  reducer 函数 单人开发可行 但是不能满足 多人开发共用一个 reducer 函数 管理状态
// import Store from '../../redux/store+redux原理解析'
//导入 Redux  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
import newStore from '../../redux/combineReducers/store'
// 方式1： redux-thunk 风格 action（action可写成一个函数）中如getCinemaListAction函数并且在此函数中 进行了 ajax 请求
import { getCinemaListAction } from '../../redux/actionCreators/getCinemaListAction'

export default function Cinemas(props) {
  // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
  // const [CityName,setCityName]=useState(Store.getState().CityName );

  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
  const [CityName, setCityName] = useState(newStore.getState().CityReducer.CityName);
  // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
  // const [cityId,setcityId]=useState(Store.getState().cityId );
  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
  const [cityId, setCityId] = useState(newStore.getState().CityReducer.cityId);

  const [CinemaList, setCinemaList] = useState(newStore.getState().CinemaListReducer.list);

  useEffect(() => {
    console.log('Cinema订阅==>',cityId,cityId !== newStore.getState().CityReducer.cityId)
    
    // reducer 函数 - 影院状态管理中列表没有数据 请求接口
    if (newStore.getState().CinemaListReducer.list.length === 0 ) {
      /*
        newStore.dispatch(action) action 内写异步-在 action（action可写成一个函数）中如getCinemaListAction函数中 请求数据 -
        方式1：redux-thunk 详细案例可见 getCinemaListAction.js
        getCinemaListAction 为一个函数 没有中间件redux-thunk时 仅仅是普通的函数并且 action（就是getCinemaListAction） 只支持返回一个对象 因此return返回的必须是一个对象 如（{type:'change-list',}），
        这引发了异步赋值return返回的问题。
      */
      newStore.dispatch(getCinemaListAction(newStore.getState().CityReducer.cityId||110100))
    } else {
      // 使用  reducer 函数 - 影院状态管理的list列表 缓存的数据
      console.log(newStore.getState().CinemaListReducer)
    }
    // subscribe 订阅 - 每次订阅完之后会返回一个函数 这个函数就是取消订阅的唯一函数，通过var unsubscribe 一个变量接收这个 返回的取消函数  名称可任意命名 如：var unsubscribe = newStore.subscribe(()=>{})
   var unsubscribe = newStore.subscribe(()=>{
      // 获取list 更新 状态 
      setCinemaList(newStore.getState().CinemaListReducer.list)
      setCityId(newStore.getState().CityReducer.cityId);
      // console.log('Cinema订阅==>', newStore.getState().CinemaListReducer)
    })
    // 组件销毁时 触发 （ useEffect 依赖必须是空数组 没有依赖）
    return ()=>{
      // 取消订阅
      unsubscribe();
      console.log('取消订阅==> unsubscribe ')
    }
    // 依赖 - 传入空数组 useEffect 只执行一次
  }, []);
  return (
    <div  className={'gg-flex-4 gg-flex-2 ' + styles.wrapper}>
     <div className='gg-flex-3' style={{width: '100%',}}>
     <button onClick={() => {
        // 跳转到 城市切换页
        props.history.push('/city')
      }}>切换城市</button>
      <button onClick={() => {
        // 跳转到 城市切换页
        props.history.push('/cinemas/search')
      }} style={{marginLeft:'auto'}}>搜索</button>
     </div>
      {/* // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发 */}
      {/* <h4>Cinemas-方式1：{Store.getState().CityName} </h4> */}

      {/*  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 */}
      <h4 id={cityId}>Cinemas-{CityName}</h4>
      <div>方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 </div>
      <ul>
        {
          CinemaList.map(item=>{
            return(
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
