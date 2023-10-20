import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Styles from './City.module.css'
import Store from '../../redux/store'
// 获取城市
function useGetCity() {
  const [CityList, setCityList] = useState([])
  useEffect(() => {
    axios({
      url: 'https://m.maizuo.com/gateway',
      method: 'GET',
      params: {
        k: 8566552
      },
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
        'X-Host': ' mall.film-ticket.city.list'
      },
    }).then(res => {
      if (res.data.status === 0) {
        // 更新 状态值 调整react 更新dom
        setCityList(res.data.data.cities)
      }
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
    // 依赖 - 传入空数组 useEffect 只执行一次
  }, [])
  return {
    CityList
  }
}
const SetHerder = (props) => {
  Store.dispatch({
    type: 'header-leftSlot', value: {
      elem: <button onClick={() => { props.history.go(-1) }}>返回--1</button>
    }
  })
  Store.dispatch({
    type: 'header-centerSlot', value: {
      elem: <div style={{ fontSize: '16px', fontWeight: 'bold' }}>城市选择</div>
    }
  })
  Store.dispatch({
    type: 'header-rightSlot', value: {
      elem: <button onClick={() => { props.history.push({ pathname: '/' }); }}>首页</button>
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
  const { CityList } = useGetCity()
  useEffect(() => {
    SetHerder(props);
    return () => {
      Destruction()
    }
  }, [])
  return (
    <div className={'gg-flex-4 gg-flex-2 ' + Styles.wrapper} >
      <ul   >
        {CityList.map(item => <CityItem key={item.cityId} {...item} {...props}></CityItem>)}
      </ul>
    </div>
  )
}
function CityItem(props) {
  let { cityId, name } = props;
  return (
    <li id={cityId} onClick={() => {

      //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
      Store.dispatch({ type: 'change-city', value: { id: cityId, name: name } })
      // 方式2- 退回上一页 -  到 影院
      props.history.goBack()
      console.log(props)
    }}>{name}</li>
  )
}