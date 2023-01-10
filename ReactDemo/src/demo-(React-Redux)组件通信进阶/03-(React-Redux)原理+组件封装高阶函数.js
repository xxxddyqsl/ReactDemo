import React, { useEffect } from 'react'
// 导入路由 
import { HashRouter, Route, Switch, } from 'react-router-dom'
/*
    React-Redux 原理
        1. connect 是HOC：缩写（ 高阶组件） 可以将一个能力不太强的低阶组件变为高阶组件 如 connect()(Test) 此时 Test内的props已经可以获取到 公共的state 并且Test已经是 connect 的孩子组件
        2. Provider组件 可以让容器组件拿到state ，使用了context

    高阶组件 构建 与 应用
        HOC不仅仅是一个方法，确切的说应该是一个组件工厂，获取低阶组件，生成高阶组件。
    高阶组件作用：
        1. 代码复用，代码模块化
        2. 增删改props
        3. 渲染劫持
*/

function Test(props) {
    return (
        <div className='app-assembly'>
            <h1>03-(React-Redux)原理+组件封装高阶函数（ 类似React-Redux 的connect高阶函数 获取低阶组件，生成高阶组件 ） </h1>
            {/* 路由 */}
            <HashRouter>
                <Switch>
                    {/* 路由-测试组件 */}
                    <Route path={'/films'} component={NewTestB}></Route>
                </Switch>
           </HashRouter>

           {/* 测试组件 */}
           <NewTestC1/>
        </div>
    )
}

function NewTestC(props){
    useEffect(()=>{
        console.log('测试B-自定义封装高阶函数==>',props)
    },[props])
    return (
        <h3>测试B - 封装高阶函数</h3>
    )
}
function NewTest(props){
    useEffect(()=>{
        console.log('测试A-自定义封装高阶函数==>',props)
    },[props])
    return (
        <h3>测试A - 封装高阶函数</h3>
    )
}
/*
    自封装高阶函数(类似 React-Redux 的connect 函数)  callback为传入的函数并且必须有返回值
    第一个参数为函数 callback  但必须有返回值
    第二个参数为对象 obj  内为传给孩子组件 调用
*/
function newConnect(callback,obj){
    // 运行传入的函数 得到callback的返回值
    var value = callback();
    /*
        此处 return是返回函数  为了获取传入的低阶组件 将其变为自己的孩子组件
        而这个函数的形参 MyComponent 就是传入的低阶组件 如 NewTest 或者 Test
    */
    return (MyComponent)=>{
        /*
            此处 return 是返回加工后的函数式组件
            并且有一个 props属性 ( 就是传入的低阶组件MyComponent 的 props 内部可能有路由属性 )
            需要将原传入的低阶组件MyComponent 的 props 再次赋值给返回的组件 否则没有路由属性 因为返回的 是一个新生成的 高阶组件
        */
        return (props)=>{
            // console.log('传入的低阶组件自己的props==>',props)
            // return <MyComponent {...value}/>
            /*
                增加props属性 通过es6展开{...value} 直接将value值 赋给传入的孩子组件（低阶组件如 NewTest 或者 Test ）
                渲染劫持 - 在传入的低阶组件( NewTest 或者 Test )外包上一层 div 并且给了指定的样式  传入的低阶组件都会被影响 如下
            */
            return <div style={{color:'red'}}><MyComponent {...value} {...props} {...obj}/></div>
        }
    }
}
/*
    调用 自己的封装高阶函数 newConnect
    第一个参数为函数 但必须有返回值
    将 低阶组件 NewTest 变为高阶组件 通过变量 NewTestB 接收 在Test组件内写的路由 匹配展示该组件
*/
const NewTestB = newConnect(()=>{
    return {
        a:'测试A-自定义封装高阶函数'
    }
},{
    aa(){
        return {type:'测试type',payload:'测试payload'}
    },
    bb(){},
})(NewTest)

const NewTestC1 = newConnect(()=>{
    return {
        a:'测试B-自定义封装高阶函数'
    }
},{
    aa:()=>{
        return {type:'测试type',payload:'测试payload'}
    },
    bb(){},
})(NewTestC)

// export default newConnect(()=>{
//     return {
//         a:'测试-自定义封装高阶函数'
//     }
// })(Test)
export default Test