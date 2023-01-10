import React ,{useRef}from 'react'

export default function Login(props) {
    const myInput=useRef();
  return (
    <div>
        <h1>Login-登录页</h1>
        <input type={'text'} ref={myInput}></input>
        <button onClick={()=>{
            console.log(myInput.current.value)
            if(!window.localStorage.getItem('token')){
                // 存入本地
                window.localStorage.setItem('token','测试登录token');
                // 编程式路由导航 - 重新进入 我的页面
                props.history.push('/center/')
            }
            // 清空 input 框
            myInput.current.value=''
        }}>登录</button>
    </div>
  )
}
