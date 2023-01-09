import React,{useEffect,useState,useMemo} from 'react'
import axios from 'axios'
import Styles from './City.module.css'
//导入 redux  reducer 函数被拆分 通过combineReducers 合并 因此 newStore.getState() 读取最新的state值  通过 newStore.getState().CityReducer 自己定义的键名 CityReducer 才能获取到管理该reducer的状态
import newStore from '../../redux/combineReducers/store'
// react-redux 库 提供 connect 函数生成一个父组件(高阶级组件) 语法： connect()(City)  此时 City 已经是 connect 的孩子组件
import {connect} from "react-redux"
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
function City(props) {
    const {CityList}=useGetCity()
  return (
    <div className={'gg-flex-4 gg-flex-2 ' + Styles.wrapper} >

        {/* 方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态 */}
        {/* <h4>城市切换- 方式2：{newStore.getState().CityReducer.CityName}</h4> */}

        <h4>城市切换- ：{props.CityName}</h4>
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

            //  方式2：reducer 函数被拆分 通过combineReducers 合并  利于多人共同开发 管理各自的状态
            // newStore.dispatch({type:'change-city',payload:name,cityId:cityId })

            props.setCityName(name,cityId)
            // 方式1-跳转到 影院
            // props.history.push('/cinemas');
             // 方式2- 退回上一页 -  到 影院
             props.history.goBack()
            console.log(props)
        }}>{name}</li>
    )
}
/*
 connect第一个参数: 函数 如果没有要给子组件传的属性  第一个参数可给null 如connect(null,{})(app) 此时 City 已经是 connect 的孩子组件
 connect第二个参数: 对象 内部为回调函数 将来传给孩子的回调函数 子组件调用回调函数 通知reducer根据 action 修改状态  此时 City 已经是 connect 的孩子组件

 setCityName 自定义函数 返回一个 action 其实就是 对象 {type:'xxx',payload:'payload'} 通知reducer 函数 根据type修改状态
    类似 store.dispatch(action)
*/
//  写法1 ： 此时 City 已经是 connect 的孩子组件
// export default  connect(null,{
//     setCityName(name,cityId){
//         return{type:'change-city',payload:name,cityId:cityId }
//     }
// })(City)
//  写法2 ： 此时 City 已经是 connect 的孩子组件  connect将UI组件（ City 组件）变成 容器组件
const mapDispatchToProps={
    setCityName(name,cityId){
        return{type:'change-city',payload:name,cityId:cityId }
    }
}
// connect将UI组件（City组件）变成 容器组件  connect将UI组件（ City 组件）变成 容器组件
export default connect(null,mapDispatchToProps)(City)