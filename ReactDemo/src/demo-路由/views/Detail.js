import React, { useEffect } from 'react'

export default function Detail(props) {
  useEffect(()=>{
    console.log(props.location.state)
  },[])
  return (
    <div>detail
      {/* 获取 携带state参数 props.location.state*/} 
        {console.log(props,'路由传参方式1：动态路由 params 参数 刷新参数消失 ==>',props.match.params)}
        {console.log(props, '路由传参方式2： query 参数 刷新参数消失 ==>',props.location.query)}
        {console.log(props,'路由传参方式3： state 参数 刷新参数丢失==>',props.location.state)}
    </div>
  )
}
