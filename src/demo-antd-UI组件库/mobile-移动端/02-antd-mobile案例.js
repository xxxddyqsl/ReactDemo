import React ,{useEffect, useState} from 'react'
import TabBar from './app/Component/tabBar/tabBar'
// 导入封装的路由 组件
import MRouter from './app/router/indexRouter-v5'

import {connect} from "react-redux"

  function Test(props) {
        const [isShow,setIsShow]=useState(props.hiddenTabBer);
        // const [CityName,setCityName]=useState(props.CityName);
        useEffect(()=>{
            setIsShow(props.hiddenTabBer)
            // setCityName(props.CityName)
        },[props.hiddenTabBer])
    return (
        <div className='app-assembly'  >
            <h1>02-antd-移动端-UI组件库-案例</h1>
            <div >
                {/* 导入自定义 封装的路由组件  */}
                <MRouter>
                    {/* 通过-插槽 将TabBar组件 插入 路由组件内 MRouter*/}
                    {isShow && <TabBar></TabBar>}
                </MRouter>
            </div>
        </div>
  )
}
const mapStateToProps=(state)=>{
   return {
       hiddenTabBer:state.TabBerReducer.hiddenTabBer,
    //    CityName:state.CityReducer.CityName,
   }
}
export default connect(mapStateToProps,null)(Test)