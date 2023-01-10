import React,{useEffect,useState,useMemo} from 'react'
import axios from 'axios'
import Styles from './City.module.css'
// 导入 redux
import Store from "../../redux/store+redux原理解析"
//导入 redux  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
import newStore from '../../redux/combineReducers/store'
// 获取城市
function useGetCity(){
    const [CityList,setCityList]=useState([])
     useEffect(()=>{
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'GET',
            params: {
                k:8566552
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
    },[])
    return {
        CityList
    }
} 
export default function City(props) {
    const {CityList}=useGetCity()
  return (
    <div className={'gg-flex-4 gg-flex-2 ' + Styles.wrapper} >
        {/* 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发 */}
        <h4>城市切换-方式1：{Store.getState().CityName}</h4>

        {/* 方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 */}
        <h4>城市切换- 方式2：{newStore.getState().CityReducer.CityName}</h4>
        <ul>
           {
              CityList.map(item=>{
                    /*
                                方式1：
                                    此时 <CityItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 需要手动传入<CityItem/> 子组件内
                                        es6 展开 {...props} 将 props （props内包含了history路由的信息） 赋值给子组件的props 否则子组件内的props没有路由的信息
                                        es6 展开 {...item} 将数据赋值给子组件的props
                                */
                                // <CityItem key={item.cityId} {...item} {...props} />
                                 /*
                                方式2：
                                    此时 <CityItem/> 子组件内的 props 是个空对象并且没有 history路由的信息 通过 withRouter(CityItem)
                                         此时 withRouter 会在 CityItem 外包装一层 并且提供 props及history路由的信息
                                         withRouter可以帮助跨级 传输  props及history路由这些值
                                        es6 展开 {...item} 将数据赋值给子组件的props
                                */
                  return  <CityItem key={item.cityId} {...item} {...props}></CityItem>
              })
           }
        </ul>
    </div>
  )
}

function CityItem(props){
    let {cityId,name}=props;
    return(
        <li id={cityId} onClick={()=>{
            // 方式1 通知 更新  选择的城市状态 - 此时不需要 cinemas 影院页 发起订阅 因为下方路由跳转到 影院 会重新加载 重新获取Store.getState().CityName 最新的 城市名状态
            Store.dispatch({type:'change-city',payload:name,cityId:cityId })

            //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
            newStore.dispatch({type:'change-city',payload:name,cityId:cityId })
            // 方式1-跳转到 影院
            // props.history.push('/cinemas');
             // 方式2- 退回上一页 -  到 影院
             props.history.goBack()
            console.log(props)
        }}>{name}</li>
    )
}