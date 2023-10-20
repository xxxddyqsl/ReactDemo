// 校验 值类型
import CheckPropsType from 'prop-types'
// 城市- 状态设置
const CityReducer = (prevState={name:'北京',id:''}, action) => {
    let state = { ...prevState };
    if (action.type) { }
    switch (action.type) {
        case 'change-city':
            state.id = action.value.id;
            state.name = action.value.name;
            return state;
        default:
            return prevState;
    }
}
 
export default CityReducer