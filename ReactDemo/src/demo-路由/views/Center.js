import React from 'react'
// withRouter 将组件包装一层 提供 props 及 需要的路由如（props.history）  withRouter可以帮助跨级 传输  props及history路由这些值
import { withRouter} from 'react-router-dom'
 function center(props) {
  return (
    <div>center
      <div onClick={() => {  console.log('我的页面', props)  }}>
        电影订单
      </div>
    </div>
  )
}
export default withRouter(center)