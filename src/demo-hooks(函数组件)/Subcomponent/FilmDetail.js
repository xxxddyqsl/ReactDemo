import React ,{useContext} from 'react'
// 引入 父组件 声明的 全局变量 GlobalContext
import {GlobalContext} from '../12-useReducer+useContext-通信案例'
// 子组件 - 右侧详情 export default 默认导出
export default function FilmDetail() {
    var styleObj = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    };
    /*
        通过 useContext(GlobalContext)钩子函数 传入参数 供应商临时变量-GlobalContext 可以直接获取到 供应商通过的服务 如当前（GlobalContext.Provider 上的唯一参数 value ）
        就不需要 像 class 类组件 一样 通过<GlobalContext.Consumer> 声明此组件为消费者通过回调函数来获取 供应商提供的服务（参数value）
        固定语法  <GlobalContext.Consumer>  {(value)=>{console.log(value)}}  </GlobalContext.Consumer> 如下
    */
    const value = useContext(GlobalContext);
    console.log(value);
    const { title, content } = value.state.FilmInfo;

    return (
        <div style={styleObj}>
            FilmDetail
            <h3>{title}</h3>
            <div>{content}</div>
        </div>

        /*
            GlobalContext.Consumer相当于声明此组件为消费者 通过回调函数来获取 供应商提供的服务（参数value）固定语法
        */
        // <GlobalContext.Consumer>
        //     {
        //         (value) => {
        //             const { title, content } = value.FilmInfo;
        //             return (
        //                 <div style={styleObj}>
        //                     FilmDetail
        //                     <h3>{title}</h3>
        //                     <div>{content}</div>
        //                 </div>
        //             )
        //         }
        //     }
        // </GlobalContext.Consumer>
    )
}