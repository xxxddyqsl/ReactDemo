/*
 Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可


*/
//reducer 拆分 此处 只需要管理 TabBer 状态 是否显示 - reducer - 处理函数 prevState 老的状态    纯函数设计  prevState没有值时 通过 prevState={hiddenTabBer:true} 设置默认属性
import {fromJS} from 'immutable'
const TabBerReducer = function (prevState={hiddenTabBer:true}, action) {
    // es6 展开对象 赋值给临时变量 （深度拷贝） 避免直接操作状态  注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    // let newState = { ...prevState }

    // 使用 fromJS （深度拷贝） 转为 immutable 不可变对象
    let newState = fromJS(prevState)

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
            // newState.hiddenTabBer = false;
            // return newState;
             //方式2: 使用 fromJS （深度拷贝） 方式 setIn 修改属性 toJS()转为普通js对象
             return newState.setIn(['hiddenTabBer'],false).toJS();
        case "show-TabBer":
            // newState.hiddenTabBer = true;  return newState;
            //方式2: 使用 fromJS （深度拷贝） 方式 setIn 修改属性 toJS()转为普通js对象
            return newState.setIn(['hiddenTabBer'],true).toJS();
        default:
            // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
    }
} 
export default TabBerReducer