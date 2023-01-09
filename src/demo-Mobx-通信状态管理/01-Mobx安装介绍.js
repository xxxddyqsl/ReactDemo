import React from 'react'
import '../css/app.css'
/*
    React+Redux 正宗的开发全家桶中的要员


    Mobx 为了替代 Redux 但是使用上 相对少一点
    
    Mobx  - 安装介绍 @5 指定版本
    安装： npm install --save mobx@5

    Mobx 介绍：
      (1) Mobx 是一个功能强大，上手非常容易的状态管理工具
      (2) Mobx背后的哲学很简单，任何源自应用的状态的东西都应该自动的获得
      (3) Mobx利用getter和setter来收集组件的数据依赖关系，从而在数据发生变化的时候精确知道哪些组件需要重绘，在界面的规模变大的时候，往往会有很多细粒度更新
      (vue类似)

    Mobx与Redux的区别：
      (1) Mobx写法更偏向于OOP（面向对象编程）
      (2) 对一份数据直接进行修改操作，不需要始终返回一个新的数据
      (3) 并非单一的store，可以多store
      (4) Redux默认以JavaScript原生对象形式存储数据，而Mobx使用可观察对象

    Mobx优点：
      (1) 学习成本小
      (2) 面向对象编程，而且对TS友好

    Mobx缺点：
      (1) 过于自由,Mobx提供的约定及模板代码很少，代码编写自由，如果不做一些约定，比较容易导致团队代码风格不统一
      (2) 相关的中间件很少，逻辑层业务整合是问题

*/
export default function Test() {
  return (
    <div className='app-assembly'>
      <h1>01-Mobx安装介绍 - Mobx 为了替代 Redux</h1>
    </div>
  )
}
