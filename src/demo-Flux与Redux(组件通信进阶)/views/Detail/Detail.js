import React,{useEffect, useState} from 'react'
// css 模块化 与其他css隔离
import styles from './Detail.module.css'
import axios from 'axios'
// 导入 Redux  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
import Store from '../../redux/store+redux原理解析'
//导入 redux  reducer 函数被拆分 通过combineReducers 合并 因此 Store.getState() 读取最新的state值  通过Store.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
import newStore from '../../redux/combineReducers/store'
// 导入 封装的 函数生成 action 控制通知中心 隐藏显示底部tabbar组件
import {isTabBar as isShowTabBar} from '../../redux/actionCreators/TabBaractionCreator'
export default function Detail(props) {
    const [info,setInfo]=useState();
    const id=props.match.params.myid;
     // 获取电影详情
    useEffect(()=>{
        // store.dispatch  通知
        // Store.dispatch({
        //     type:'hidden-TabBer',
        // })

        //   isShowTabBar() 函数 等价 于{   type:'hidden-TabBer',key:false}

        // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
        Store.dispatch(isShowTabBar({type:'hidden-TabBer',key:false}))

        //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
        newStore.dispatch(isShowTabBar({type:'hidden-TabBer',key:false}))
        console.log(props.location.state)
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
                'X-Host': 'mall.film-ticket.film.info'
            },
            params: { filmId: id, k: 9554269 }
        }).then(res=>{
            if(res.data.status===0){
                setInfo(res.data.data.film)
            }
            // console.log(res)
        }).catch(err=>{console.log(err)})

        //useEffect没有注入任何依赖传入空数组  组件-销毁时触发 return ()=>{} 只执行一次
        return()=>{
            // 组件-销毁时 发起 - store.dispatch 通知 显示底部 TabBer 组件
            // Store.dispatch({
            //      type:'show-TabBer',
            //      key:true
            // })
            //   isShowTabBar() 函数 等价 于{   type:'hidden-TabBer',key:false}

            // 方式1  共用一个 reducer 函数 管理状态 缺点 不利于多人共同开发
            Store.dispatch(isShowTabBar({type:'show-TabBer',key:true}))

            //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
            newStore.dispatch(isShowTabBar({type:'show-TabBer',key:true}))
        }
    },[])
  return (
    <div className={styles.warper}>
        Detail
       {
           info?<div>
             <img src={info.poster} alt='' style={{width: '160px'}}/>
            <h4>{info.name}</h4>
            <div>{info.nation}</div>
            <div>{info.synopsis}</div>
         </div>:'没有查询到数据'
       }
    </div>
  )
}
