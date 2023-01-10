import React from 'react'
/*
    Flux 与 Redux

    Flux 是一种架构思想，专门解决软件的结构问题 它跟MVC架构是同一类东西，但是更加简单和清晰。Flux存在多种实现（至少15种，Redux（状态管理库） 只是其中的一种）。

    Facebook Flux 是用来构建客户端web应用的应用架构，它利用单向数据流的方式来组合React中的视图组件。它更像一种模式而不是一种正式的框架，
    开发者不需要太多的新代码就可以快速的上手Flux。

    1、用户访问 view
    2、view 发出用户的 Action
    3、Dispatcher 收到 Action , 要求 Store 进行相应的更新
    4、Store 更新后 ， 发出一个 'change' 事件
    5、view 收到 'change' 事件后 ， 更新页面

    Redux 最主要是用作应用状态的管理，简而言之， Redux 用一个单独的常量状态树 （ state 对象 ）保存这一整个应用的状态，这个对象不能直接被改变，当一些数据发送变化，一个新的
    对象被创建 （ 使用 actions 和 reducers ）, 这样就可以进行数据追寻，实现时光旅行。

    1、Redux介绍及设计和使用的三大原则
    state 以单一对象存储在 store 对象中
    state 只读 （每次都会返回一个新的对象）
    使用纯函数 reducers 执行 state 更新

*/
export default function Test() {
  return (
    <div className='app-assembly'>
        <h1>01-组件通信-Flux及Redux介绍</h1>
    </div>
  )
}
