import React from 'react'
import styles from './Center.module.css'
// withRouter 将组件包装一层 提供 props 及 需要的路由如（props.history）  withRouter可以帮助跨级 传输  props及history路由这些值
import { withRouter} from 'react-router-dom'
 function Center() {
  return (
    <div className={styles.warper}>
      Center
    </div>
  )
}
export default withRouter(Center)