// Redux 生产 
// 定义一个函数来生成 action，这个函数就称作 Action Creator，如下面代码中的 isShowTabBar 函数：
function isTabBar(data){
    let {type,payload}=data;
    return {
        type:type||'show-TabBer',
        payload:payload
    }
}

export {isTabBar}