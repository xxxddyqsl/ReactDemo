/*
 Redux 扩展 - combineReducers 利于多人开发 共一个reducer时 将其拆分 互不影响
    如果不同的action所处理的属性之间没有联系，我们可以把 reducer 函数拆分，不同的函数负责处理不同的属性，
    最终把它们合并成一个大的 reducer 即可


*/
import {fromJS} from 'immutable'
//reducer 拆分 此处 只需要管理城市状态 - reducer - 处理函数 prevState 老的状态    纯函数设计  prevState没有值时 通过 prevState={CityName:'北京'} 设置默认属性
const CityReducer = function (prevState={CityName:'北京'}, action) {
    // es6 展开对象 赋值给临时变量 （深度拷贝） 避免直接操作状态  注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    // let newState = { ...prevState }

    // 使用 fromJS （深度拷贝） 转为 immutable 不可变对象
    let newState = fromJS(prevState)

    // 获取 调用 dispatch 函数 传入的参数 根据参数 判断执行对应逻辑 修改状态 return 返回
    switch (action.type) {
        case "change-city":
            // 方式1:es6 展开对象 赋值给临时变量 （深度拷贝）- 选中的城市 更新修改老的城市状态
            // newState.CityName=action.payload
            // newState.cityId=action.cityId
            // return newState;
            //方式2: 使用 fromJS （深度拷贝） 方式 setIn 修改属性 toJS()转为普通js对象
            return newState.setIn(['CityName'],action.payload).setIn(['cityId'],action.cityId).toJS();
        default:
            return prevState;
    }
} 
export default CityReducer