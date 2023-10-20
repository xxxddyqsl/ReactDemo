import React from 'react'
import {withRouter} from 'react-router-dom'
const styles ={
    width: '100%',
    justifyContent: 'space-between',
}
// 头部 组件 - 右侧子组件 默认显示
const RightSlot = withRouter((props)=>{
    return''
    // return (<button onClick={()=>{
    //     // console.log(props)
    //          props.history.push({ pathname: '/'});
    //     }}>首页</button>)
})
// 头部 组件 - 左侧子组件 默认显示
const LeftSlot = withRouter((props)=>{
    return<div onClick={()=>{
        props.history.push({pathname:'/city'})
    }}>{props.CityName?.name||'位置'}</div>//左侧子组件
})
// 头部 组件 - 标题子组件 默认显示
const CenterSlot = withRouter((props)=>{
    return <div style={{fontSize:'16px',fontWeight:'bold',margin:'0 auto'}}>首页</div>//标题子组件
})
function Header(props) {
    // props.rightSlot.props.a=props
    const {leftSlot,rightSlot,centerSlot} =props;
    // console.log('header=>',props)
    return (
        <div className='gg-flex-4' style={styles}>
            {/* 具名插槽 */}
            {leftSlot?leftSlot:<LeftSlot {...props}></LeftSlot>}
            {centerSlot?centerSlot:<CenterSlot></CenterSlot>}
            {rightSlot?rightSlot:<RightSlot></RightSlot>}
        </div>
    )
}


export default withRouter(Header)