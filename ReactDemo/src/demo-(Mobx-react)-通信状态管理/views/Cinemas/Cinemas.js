import React, { useState, useEffect } from 'react'
import styles from './Cinemas.module.css'
import axios from 'axios'
// 导入 创建 声明好的 mobx
import Store from '../../mobx/store'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听 类似订阅
*/
import { autorun } from 'mobx'
export default function Cinemas(props) {
  // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
  // const [CityName,setCityName]=useState(Store.getState().CityName );

  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
  const [CityName, setCityName] = useState(Store.CityName);
  // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
  // const [cityId,setcityId]=useState(Store.getState().cityId );
  //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
  const [cityId, setCityId] = useState(Store.cityId);

  const [CinemaList, setCinemaList] = useState(Store.list);
 
  useEffect(() => {
    console.log('Cinema订阅==>', cityId, cityId !== Store.cityId)

    // reducer 函数 - 影院状态管理中列表没有数据 请求接口
    if (Store.list.length === 0) {
      // 开启严格模式 不直接通过Store.list 修改observable可观察对象 集中 在 store.js 中管理处理数据 通过方法修改observable可观察对象 保证代码风格统一 降低耦合度
      Store.getList(Store.cityId || 110100) 
    }
    //  autorun 监听 类似订阅 需要取消订阅
    var unsubscribeList=autorun(() => {
      console.log(Store.list)
      // 获取list 更新 状态
      setCinemaList(Store.list)
    })
    // 城市id发生改变  //  autorun 监听 类似订阅 需要取消订阅
    var unsubscribe=autorun(() => {
      console.log(Store.cityId)
      // 开启严格模式 不直接通过Store.list 修改observable可观察对象 集中 在 store.js 中管理处理数据 通过方法修改observable可观察对象 保证代码风格统一 降低耦合度
      setCityId(Store.cityId);
      // 重新获取数据
      Store.getList(Store.cityId || 110100)
    })
    return () => {
      // 销毁 取消订阅
      unsubscribe();
      unsubscribeList()
    }
    // 依赖 - 传入空数组 useEffect 只执行一次
  }, []);
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
      <h4 id={cityId}>Cinemas-{CityName}</h4>
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
