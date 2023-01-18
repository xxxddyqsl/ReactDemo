/*
    1. 安装 npm install --save redux 引入 Redux
    import { createStore } from 'redux';

    createStore用来创建一个Redux中的容器对象，它需要三个参数：reducer、preloadedState、enhancer。
    2. createStore( reducer, [preloadedState], enhancer)
    reducer 是一个函数，是state操作的整合函数，每次修改state时都会触发该函数，它的返回值会成为新的state。
    preloadedState 就是state的初始值，可以在这里指定也可以在reducer中指定。
    enhancer 增强函数用来对state的功能进行扩展，暂时先不理它

    Store.subscribe(()=>{})// 订阅state变化-state发生变化时，回调函数会自动调用
    Store.getState() 读取最新的state值 
    Store.dispatch()  视图发出 action 的唯一方法，该方法接受一个 action 对象作为参数： 通知修改state值


   Redux介绍及设计和使用的三大原则
    1： state 以单一对象存储在 store 对象中
    2：state 只读 （每次都会返回一个新的对象）
    3： 使用纯函数 reducer 执行 state 更新


    Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可
*/
import { createStore,combineReducers } from 'redux'
// 校验 值类型
import kerwinPropsType from 'prop-types'
//reducer - 处理函数 prevState 老的状态    纯函数设计 
const reducer = function (prevState, action) {
    console.log(prevState, action)
    // es6 展开对象 赋值给临时变量 （深度拷贝） 避免直接操作状态  注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    let newState = { ...prevState }
    // 获取 调用 dispatch 函数 传入的参数 根据参数 判断执行对应逻辑 修改状态 return 返回
    switch (action.type) {
        case "hidden-TabBer":
            // 方式1：返回一个对象 对象格式包含了 状态名称count ：状态值 prevState.count - 1 此方式 有缺陷 如果有多个状态 修改一个个写出来 并且保持其他状态的值不变 直接返回一个对象 会覆盖之前声明的 状态对象initialState 内容
            // return { count: prevState.count - 1 };
            /*
            方式2：将状态prevState 深度拷贝给临时变量 newState 通过临时变量直接操作对应的状态 newState.count--; return 返回 临时变量 newState
            （其实返回的newState也是对象 格式也是同上例 {状态key： 状态新的值} ）
            指定需要修改状态对象key 然后返回整个对象 只改变了 需要改变状态 其他状态不变
            */
            newState.hiddenTabBer = false;
            return newState;
        case "show-TabBer":
            newState.hiddenTabBer = true;
            return newState;
        case "change-city":
            // 选中的城市 更新修改老的城市状态
            newState.CityName=action.payload
            newState.cityId=action.cityId
            return newState;
        default:
            // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
    }
}
// 公共状态 - 状态是存在浏览器的内存中 刷新页面才会丢失
const preloadedState = {
    // 默认值-显示底部 TabBer 组件
    hiddenTabBer:true,
    // 默认值- 城市名
    CityName:'北京',
}
const store = createStore(reducer, preloadedState);
// 验证-自定义封装的Redux 是否可行
// const store = newCreateStore(reducer, preloadedState);
export default store


/*
    Store.subscribe()
    Store.getState()
    Store.dispatch()

    redux 原理解析-简易版
*/
//  redux 原理解析-手搓简易版
function newCreateStore(newReducer){
    // 订阅的容器
    var list=[];
    // 状态- 此处 第一次执行 newReducer(undefined,{})传入没有声明的state状态和空对象 action newReducer在返回的初始默认值
    var state=newReducer(undefined,{});
    function subscribe(callback){
        // 将订阅的匿名函数 存入list订阅的容器中
        list.push(callback)
    }
    // dispatch 函数 调用 newReducer函数 执行 根据传入的action 修改返回新的状态 并且调用订阅函数 通知订阅函数更新
    function dispatch(action){
        /*
            调用 newReducer 执行 - 将状态state传入 和 action 如{type:'hidden-TabBar'},
            然后将新的state = newReducer () 返回的最新值 赋值给state 覆盖老的state
        */
        state = newReducer(state,action);
        for(let i in list){
            // 存入的回调函数存在 执行订阅回调函数-通知订阅者更新
            list[i]&&list[i]()
        }
    }
    // 返回全部状态state -
    function getState(){
        return state||{};
    }
    // 返回 订阅函数 subscribe ，通知更新+修改状态函数dispatch，获取状态函数getState
    return {
        // 订阅-匿名函数传入订阅列表
        subscribe,
        //调用newReducer根据action修改状态 调用订阅列表通知修改状态
        dispatch,
        // 获取状态值
        getState,
    }

}
// 根据action修改状态 - 必须有一个返回值 覆盖原来的状态对象 - 属于纯函数设计 不会影响 原来的状态State对象
function newReducer(prevState,action){
    console.log('newReducer原理',prevState,action)
    return prevState
}
// 声明 获取 newCreateStore(newReducer)函数传入newReducer修改状态的函数 return 返回的3个函数
const newStore=newCreateStore(newReducer)

// 订阅 - 传入订阅匿名函数 
newStore.subscribe(()=>{
    console.log('newReducer原理-订阅',)
    console.log('newReducer原理-订阅-获取最新的state',newStore.getState())
})
// 调用 dispatch 函数修改返回新的状态 并且调用订阅函数 通知订阅函数更新
newStore.dispatch({type:'newReducer原理'});

/*
    // 纯函数设计-例子
    var obj={
        name:'纯函数设计'
    }
     var obj2={
        name:'纯函数设计'
    }
    // 纯函数设计
    function test(obj){
        // 深度拷贝 注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
        let newobj={...obj}
        newobj.name='修改传入对象-不会影响原来的obj对象';
        return newobj;
    }
    // 不属于纯函数设计
    function test2(obj2){
        obj2.name='修改传入对象-会影响原来的obj对象';
        return obj2;
    }
    test(obj)
    test2(obj2)
    console.log(obj,obj2)

    纯函数定义：
    1:对外界没有副作用(如对调用的变量 或 对象没有产生任何的影响) （如上例：test(obj)和test2(obj2)两个例子的说明 ）
    2：同样的输入得到同样的输出 (如上例：test(obj);test(obj); 不管调用多少次 返回的值都是一样的没有变)
    必须同时满足上面的2个条件才属于纯函数
*/
