import React,{useEffect, useState} from 'react'
// css 模块化 与其他css隔离
import styles from './Detail.module.css'
import axios from 'axios'
//导入 redux  reducer 函数被拆分 通过combineReducers 合并 因此 newStore.getState() 读取最新的state值  通过 newStore.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
// import newStore from '../../redux/combineReducers/store'

// react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 语法： connect()(Detail) 此时 Detail 已经是 connect 的孩子组件
import {connect} from "react-redux"
//     导入isTabBar通过 as 设置别名为 isShowTabBar 封装的 函数 生成 action 控制通知中心 隐藏显示底部tabbar组件
import {isTabBar as isShowTabBar} from '../../redux/actionCreators/TabBaractionCreator'
function Detail(props) {
    console.log('Detail=>',props)
    const [info,setInfo]=useState();
    // 路由跳转 传入的参数
    // const id=props.match.params.myid;
    // 通过e6解构 取出 路由传入的参数match.params.myid 控制底部tabber组件是否显示 函数isShowTabBar
    let {match,isShowTabBar}=props;
     // 获取电影详情
    useEffect(()=>{
        // store.dispatch  通知 

        //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
        // newStore.dispatch(isShowTabBar({type:'hidden-TabBer',key:false}))
        // 
        isShowTabBar({type:'hidden-TabBer',key:false})
        console.log(props.location.state)
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
                'X-Host': 'mall.film-ticket.film.info'
            },
            params: { filmId: match.params.myid, k: 9554269 }
        }).then(res=>{
            if(res.data.status===0){
                setInfo(res.data.data.film)
            }
            // console.log(res)
        }).catch(err=>{console.log(err)})

        //useEffect 注入任何依赖  组件-销毁时触发 return ()=>{} 只执行一次
        return()=>{
            // 组件-销毁时 发起 - store.dispatch 通知 显示底部 TabBer 组件 

            //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
            // newStore.dispatch(isShowTabBar({type:'show-TabBer',key:true}))
            isShowTabBar({type:'show-TabBer',key:true})
        }
    },[match.params.myid,isShowTabBar])
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
/*
 connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app) 此时 Detail 已经是 connect 的孩子组件
 connect第二个参数: 对象 内部为回调函数 将来传给孩子的回调函数 子组件调用回调函数 通知reducer根据 action 修改状态  此时 Detail 已经是 connect 的孩子组件

 isShowTabBar 自定义函数 返回一个 action 其实就是 对象 {type:'xxx',payload:'payload'} 通知reducer 函数 根据type修改状态
    类似 store.dispatch(action)
*/
//  写法1 ： 此时 Detail 已经是 connect 的孩子组件  connect将UI组件（ Detail 组件）变成 容器组件
// export default  connect(null,{
//     isShowTabBar,
//     // 测试 回调函数
//     b(){

//     }
// })(Detail)

//  写法2： 此时 Detail 已经是 connect 的孩子组件  connect将UI组件（ Detail 组件）变成 容器组件
const mapDispatchToProps={
        isShowTabBar,
        // 测试 回调函数
        b(){ },
}
//  写法2： 此时 Detail 已经是 connect 的孩子组件
export default  connect(null,mapDispatchToProps)(Detail)