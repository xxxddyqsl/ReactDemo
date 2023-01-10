import React,{useContext,} from 'react'
// 导入 父节点 声明的 createContext 通过const value = useContext(GlobalContext); 获取父组件(供应商) 提供的服务
import {GlobalContext} from '../11-useReducer+useContext-通信'
export default function ChildA(props) {
    const value = useContext(GlobalContext);
  return (

    <div style={{border:'1px solid red',padding:'4px 10px'}}>
           { console.log('ChildA-组件')}
        <h4>ChildA</h4>
        <button onClick={()=>{
            props.callback({type:'modifyChildB',value:'ChildA点击事件修改状态-子组件-ChildB'});
            console.log(props);
            }}>改变其他组件ChildB的内容</button>
        <button onClick={()=>{
            value.dispatch({type:'modifyChildC',value:'ChildA点击事件修改状态-子组件-ChildC'});
            console.log(value);
            }}>改变其他组件ChildC的内容</button>
    </div>
  )
}
