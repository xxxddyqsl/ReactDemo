import React, { useContext } from 'react'
// 导入 父节点 声明的 createContext 通过const value = useContext(GlobalContext); 获取父组件(供应商) 提供的服务
import {GlobalContext} from '../11-useReducer+useContext-通信'
export default function ChildC() {
    const value = useContext(GlobalContext)
  return (
    <div style={{border:'1px solid red',padding:'4px 10px'}}>
         { console.log('ChildC-组件')}
         <h4>ChildC</h4>
         {value.state.stateChildC}
    </div>
  )
}
