/*
    学习 封装组件 造轮子

    封装订阅发布模式 - 处理中心
*/
const PublishSubscriptionMode = {
    // 队列事件容器
    callbackList: {},
    is: false,
    //  订阅者调用 传入 回调函数+  传入（如：demoA）key 或者 id (方便利用key监听区分不同订阅+发布者的调用)不污染全局
    subscribe(callback, obj) {
        // 判断 callbackList 中是否存在 该订阅人id 的容器 ，没有则创建一个新数组容器
        if (!this.callbackList[obj.SubscriptionID]||this.callbackList[obj.SubscriptionID].length<=0) {
            // 为该订阅人id创建一个新数组容器
            this.callbackList[obj.SubscriptionID] = [];
            // 为该订阅人id 下增加 发布人的id 和 事件容器（后续传入订阅人的回调函数）
            this.callbackList[obj.SubscriptionID].push({ PublishingID: obj.PublishingID, callbackArr: [],state:true })
        }
        // 该订阅人id下 遍历 找到发布人的id下的事件容器callbackArr  将传入的回调函数 临时存入 callbackList 队列中 方便后续发布函数publish调用
        this.callbackList[obj.SubscriptionID].map(item => {
            item.PublishingID === obj.PublishingID && item.callbackArr.push(callback)
        })
        console.log('存入 callbackList 队列中', this.callbackList)
    },
    // 发布者调用 发布者传入（如：demoA）key 或者 id (方便利用key监听区分不同订阅+发布者的调用)不污染全局
    publish(data, obj) {
        // 若没有注册该订阅人id 事件容器则抛出错误
        if (!this.callbackList[obj.SubscriptionID]||this.callbackList[obj.SubscriptionID].length<=0) {
            alert(`请${obj.SubscriptionID}重新订阅注册:`)
            return  console.error('未注册该事件');
        }
        // 遍历 this.callbackList下订阅人id内的发布人id 将callbackArr 列表内部 订阅人的回调函数执行 并传入参数
        this.callbackList[obj.SubscriptionID].map(item => {
            item.PublishingID === obj.PublishingID && item.callbackArr.forEach(callback => {
                // callback 为真 执行回调函数
                callback && callback(data)
            })
        })
        // console.log('publish发布')
    },
    // 取消订阅 发布key 订阅人的id （可能存在同一个发布key 下 多个订阅人）
    Unsubscribe(obj) {
        
        // 若没有注册该订阅人id 事件容器则抛出错误
        if (!this.callbackList[obj.SubscriptionID]||this.callbackList[obj.SubscriptionID].length<=0) {
            return  console.error('未注册该事件');
        }
        this.callbackList[obj.SubscriptionID].map(item => {
            // 取消订阅的 发布人id 存在 则可取消订阅
            if (item.PublishingID === obj.PublishingID) {
                this.is = true;
            } else {
                this.is = false;
            }
        })
        // 发布人id 存在 则可取消订阅
        if (this.is) {
            // 过滤 删除订阅人 数据内 存在的 该发布者 id 数据
            this.callbackList[obj.SubscriptionID] = this.callbackList[obj.SubscriptionID].filter(item => {
                return item.PublishingID !== obj.PublishingID
            })
            console.log( this.callbackList)
        } else {
            return console.error('未订阅该发布');
        }
        console.log('取消订阅 - callbackList 队列中', this.callbackList)
        // console.log(this.callbackList)
    }
}
export default PublishSubscriptionMode