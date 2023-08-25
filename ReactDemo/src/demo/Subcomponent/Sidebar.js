import React from 'react'

// 校验 值类型
import kerwinPropsType from 'prop-types'

// 函数组件 - 验证 props 值类型

// 函数组件 设置 默认值 如 父组件未传入 bg背景色 值 调用通过defaultProps设置 props属性 的默认值 ，如果父组件传入了bg背景色  父组件传的值覆盖通过defaultProps 默认的值 
Sidebar.defaultProps = {
  bg: 'red',
  w: '200px',
}
// 函数组件 设置校验 props属性 类型  使用 Sidebar.propTypes 校验props 接收到的父组件传入的值类型 如props.bg 传入的值类型必须为字符串 否则 传入的值不通过
//  有利用后期维护
Sidebar.propTypes = {
  // 校验 传入 bg 是否是 字符串
  bg: kerwinPropsType.string,
  // 校验 传入 position 是否是 对象
  position: kerwinPropsType.object
}

export default function Sidebar(props) {

  // 通过 ES6解构的方式 取出 props 对象内部的属性
  let { position ,about} = props;
  let obj1={
    left:'0px',
  }
  let obj2={
    right:'0px',
  }
  // es6 通过{...position,...obj1} 对象position和obj1合并 返回一个 新对象
  let styleObj = about==='left'?{...position,...obj1}:{...position,...obj2};

  console.log(position, props,styleObj)
  return (
    <div style={{ position: 'relative' }}>
   
      <ul style={{
          width: props.w,
          background: props.bg,
          /* 可  通过es6的对象简写 {...position} 输出 position对象内部值（position:'absolute',top:'0px'） 但是 父组件传入的值 必须是符合React对 style 格式的方式  position={position:'absolute',top:'0px'} */
          ...position,
          // 三目运算 合并的对象 定位在 left 左 或者 右边
          ...styleObj
      }}>
        <li>侧边栏-1</li>
        <li>侧边栏-2</li>
        <li>侧边栏-3</li>
      </ul>
    </div>
  )
}



