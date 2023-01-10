import React from 'react'
import style from './css/02css.module.css'
export default function Test() {
  return (
    <div>
        02-css模块化-子组件
        <br></br>
        <div className={style.warper}>子组件使用warper-02css.module.css的class名: warper</div><br></br>
        <div className={style.warper}>子组件使用warper-02css.module.css的class名: warper</div><br></br>
        <div className='win_warper'>全局样式 - 样式名称不被Module计算 保留原样式名</div><br></br>
    </div>
  )
}
