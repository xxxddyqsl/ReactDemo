
// 校验 值类型
import CheckPropsType from 'prop-types'
const HeaderReducer = (prevState={leftSlot:'',centerSlot:'',rightSlot:''}, action) => {
    // let state = JSON.parse(JSON.stringify(prevState));
    let state ={...prevState}
    // console.log(action)
    if (action.type) { }
    switch (action.type) {
        case 'header-leftSlot':
            state.leftSlot = action.value.elem;
            return state;
        case 'header-centerSlot':
            state.centerSlot = action.value.elem;
            return state;
        case 'header-rightSlot':
            state.rightSlot = action.value.elem;
            return state;
        default:
            return prevState;
    }
}
 
export default HeaderReducer