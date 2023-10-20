import axios from 'axios'
/*
方式1： redux-thunk 风格 - 安装 npm install --save redux-thunk
    actionCreator 内写异步-在 action（action可写成一个函数）中如getCinemaListAction函数中 请求数据 -
      
       getCinemaListAction 为一个函数 没有中间件redux-thunk时 仅仅是普通的函数并且 action（就是getCinemaListAction） 只支持返回一个对象 因此return返回的必须是一个对象 如（{type:'change-list',}），
       这引发了异步赋值return返回的问题。
       使用 redux-thunk 中间件 时  action（就是getCinemaListAction） 可支持返回一个 函数 如下

       function getCinemaListAction(){
        //    redux-thunk 中间件 是需要返回一个函数 内部会判断 如果返回是一个对象就交给redux 默认处理，
        如果返回是一个函数就按照  redux-thunk 的流程  并且帮你执行这个 return()=>{} 函数并且会往这个函数中 塞入一个 dispatch方法 （注 dispatch 可任意命名）
        但此处的 dispatch方法 和外面的 Store.dispatch() 是一样的  因为只有自己才知道 什么时候数据请求或者准备好了 然后利用 塞入的 dispatch方法 进行提交 到 reducer函数 通知更新状态
           return (dispatch)=>{
               axios({  url: 'https://m.maizuo.com/gateway', method: 'GET',  params: { cityId: 110100,  ticketFlag: 1,  k: 584748,  }, headers: {  'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}', 'X-Host': 'mall.film-ticket.cinema.list'
                },
                }).then(res => {
                    dispatch({ type: 'change-list',  payload: res.data.data.cinemas })
                })
            }
        }
*/

// 方式1： redux-thunk 风格 是需要返回一个函数 内部会判断
// function getCinemaListAction(cityId) {
//     console.log('getCinemaListAction==>', cityId)
//     return (dispatch) => {
//         axios({
//             url: 'https://m.maizuo.com/gateway',
//             method: 'GET',
//             params: {
//                 cityId: cityId,
//                 ticketFlag: 1,
//                 k: 584748,
//             },
//             headers: {
//                 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
//                 'X-Host': 'mall.film-ticket.cinema.list'
//             },
//         }).then(res => {
//             if (res.data.status === 0) {
//                 // data=res.data.data.cinemas 
//                 dispatch(
//                     {
//                         type: 'change-list',
//                         payload: res.data.data.cinemas
//                     }
//                 )
//             }
//             // console.log(res)
//         }).catch(err => {
//             console.log(err)
//         })

//     }
// }

/*
    方式2： redux-promise 风格 -  安装 npm install --save redux-promise
        redux-promise  是需要保证return返回的是一个 promise对象 如果返回是一个 promise对象 就按照  redux-promise 的内部流程
        如 getCinemaListAction().then(res=>{
            redux-promise 中间件内部 会将结果 （ return ({type: 'change-list',payload: res.data.data.cinemas }) ） dispatch 发送出去  进行提交 到 reducer函数 通知更新状态
        })
        内部会判断 如果返回是一个对象就交给 redux 默认处理，
*/
// function getCinemaListAction(cityId) {
//     console.log('getCinemaListAction==>', cityId)
//     return (
//         axios({
//             url: 'https://m.maizuo.com/gateway',
//             method: 'GET',
//             params: {
//                 cityId: cityId,
//                 ticketFlag: 1,
//                 k: 584748,
//             },
//             headers: {
//                 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
//                 'X-Host': 'mall.film-ticket.cinema.list'
//             },
//         }).then(res => {
//             if (res.data.status === 0) {
//                 // 需要 redux-promise 中间件 返回的给 dispatch 发送出去的结果
//                 return (
//                     {
//                         type: 'change-list',
//                         payload: res.data.data.cinemas
//                     }
//                 )
//             }
//             // console.log(res)
//         }).catch(err => {
//             console.log(err)
//         })
//     )
// }


/*
    方式3：async await 等待异步加载

*/
async function getCinemaListAction(cityId) {
    console.log('getCinemaListAction==>', cityId)
    let list = await axios({
        url: 'https://m.maizuo.com/gateway',
        method: 'GET',
        params: {
            cityId: cityId,
            ticketFlag: 1,
            k: 584748,
        },
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
            'X-Host': 'mall.film-ticket.cinema.list'
        },
    }).then(res => {
        if (res.data.status === 0) {
            // 需要 redux-promise 中间件 返回的给 dispatch 发送出去的结果
            return (
                {
                    type: 'change-list',
                    payload: res.data.data.cinemas
                }
            )
        }
        // console.log(res)
    }).catch(err => {
        console.log(err)
    })
    // 将异步接口 return返回给外面的   dispatch() 发送出去
    return list;
}
export { getCinemaListAction }