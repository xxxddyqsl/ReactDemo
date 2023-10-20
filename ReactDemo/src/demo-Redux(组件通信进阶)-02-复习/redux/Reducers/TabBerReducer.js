
// 校验 值类型
import CheckPropsType from 'prop-types'
// 在 状态管理 管理 入口文件中 使用 combineReducers 合并 封装的状态管理， 利于多人开发
//  reducer 状态管理 拆分  只处理 tabBer 相关的 状态
const TabBerReducer = function (prevState = { isShow: true }, action) {
    // es6 展开对象 赋值给临时变量 （深度拷贝） 避免直接操作状态  注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    let state = { ...prevState };
    // 获取 调用 dispatch 函数 传入的参数 根据参数 判断执行对应逻辑 修改状态 return 返回
    switch (action.type) {
        case 'hideTabBer':
            state.isShow = action.value;
            // 返回 修改后-新状态
            return state;
        case 'showTabBer':
            // 返回 修改后-新状态
            state.isShow = action.value;
            return state;

        default:
            // 返回 原状态
            return prevState;
    }
}
 // 校验值传入的类型
 TabBerReducer.propTypes={
    action:CheckPropsType.object
}
export default TabBerReducer;
