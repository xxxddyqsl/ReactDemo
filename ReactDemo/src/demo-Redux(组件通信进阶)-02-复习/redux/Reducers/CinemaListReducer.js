// 校验 值类型
import CheckPropsType from 'prop-types'
// 城市- 状态设置
const CinemaListReducer = (prevState = { list: [] }, action) => {
    // es6 展开对象 赋值给临时变量 （深度拷贝） 避免直接操作状态  注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    let newState = { ...prevState }
    // 获取 调用 dispatch 函数 传入的参数 根据参数 判断执行对应逻辑 修改状态 return 返回
    switch (action.type) {
        case "change-list":
            // 获取选中的城市 影院列表
            newState.list = action.payload
            return newState;
        default:
            // redux-persist持续数据化失效的经历 - 解构返回了一个新的对象 newState ，直接重置了为初始状态
            // return newState;错误 引发redux-persist持续数据化失效
            return prevState;
    }
}
export default CinemaListReducer