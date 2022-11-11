import React, { Component } from 'react'

export default class textFor extends Component {
    state = {
        list: [
            {
                // 调用自定义GenNonDuplicateID函数 生成唯一id
                id: this.GenNonDuplicateID(),
                myText: 'aaa',
            },
            {
                id: this.GenNonDuplicateID(),
                myText: 'bbb',
            },
            {
                id: this.GenNonDuplicateID(),
                myText: 'ccc',
            },
        ],
    }
    myText = '';
    render() {
        var showTitle = <div>暂无列表数据1</div>;
        return (
            /* 循环绑定key值说明：
                为了列表的复用和重排 ， 设置key 提高性能
                理想key 为唯一不重复的标识值 如 item.id
                不涉及到列表的增加，删除，重排，设置成索引也是可以的
                */
            <div className='app-assembly'>
                <h1>07-循环渲染</h1>
                <input type='text' ref={(event) => { this.myText = event }}></input>
                <button onClick={() => {

                    this.addList()
                }
                }>增加</button>
                <ul>
                    <div> 循环渲染方式1：原生js的map 方法</div>
                    {
                        // 循环渲染方式1：原生js的map 方法
                        this.state.list.map((item, index) => {
                            // 注意：必须在循环内 注入唯一的key 否则报错 （通过 diff 算法 对比key 更新渲染真实dom）
                            return (
                                <li key={item.id} onClick={(event) => { this.handleClick(event, item) }} >
                                    {/* {item.myText} */}
                                    {/* 富文本展示 ： 如在input内输入 <h1>富文本展示</h1> */}
                                    <span dangerouslySetInnerHTML={ {__html: ' 富文本展示 ：'+item.myText} }></span>

                                    <button onClick={(event) => {
                                        this.deleList(event, item.id)
                                    }
                                    }>删除</button>
                                </li>
                            )
                        })
                    }
                    <br></br>
                    <div> 循环渲染方式2：使用函数方法 </div>
                    {

                        // 循环渲染方式2：使用函数方法
                        this.setList(this.state.list)
                    }
                </ul>
                {/* 条件渲染 可直接是 标签 组件 变量 */}
                {/* 条件渲染 方式1:  创建节点 + 删除节点 */}
                {/* {this.state.list.length<=0?<div>暂无列表数据</div>:null} */}
                {/* 条件渲染 方式2: 创建节点 + 删除节点*/}
                {this.state.list.length <= 0 ? showTitle : null}
                {/*条件渲染 方式3:创建节点 + 删除节点 前面的条件（ this.state.list.length<=0 ）为真时 才能执行后面的创建div 节点  条件为假 删除div 节点*/}
                {this.state.list.length <= 0 && <div>暂无列表数据2</div>}
                {/* 条件渲染 方式4: 元素节点一直在 只是 通过设置 class 控制隐藏显示  节点不会被删除*/}
                <div className={this.state.list.length <= 0?'':'hidden'}>暂无列表数据3</div>
                {/* 条件渲染 方式5: 元素节点一直在 只是 通过行内样式设置   控制隐藏显示 节点不会被删除*/}
                <div style={this.state.list.length <= 0?{}:{display: 'none'} }>暂无列表数据4</div>
            </div>
        )
    }
    handleClick = (event, data) => {
        //阻止事件冒泡
        event.preventDefault()
        event.stopPropagation()
        //   点击改变自己的背景色
        // event.target.style.backgroundColor='red';
        // 获取父节点event.target.parentNode 下的所有子节点children
        let parentElm = event.target.parentNode.children;
        console.log(parentElm)
        // 遍历所有子节点
        for (let i in parentElm) {
            // 节点必须为li 不是li的过滤  nodeName获取的标签名为大写 需toUpperCase字符串转换为大写
            if (parentElm[i].nodeName === 'li'.toUpperCase()) {
                //    修改自己的背景色
                if (parentElm[i] === event.target) {
                    event.target.style.backgroundColor = 'red';
                } else {
                    // 移除其他兄弟节点的背景色
                    if (parentElm[i].style && parentElm[i].style.backgroundColor) {
                        parentElm[i].style.backgroundColor = '';
                    }
                    // parentElm[i].style.backgroundColor = 'blue';
                }
            }
        }


        // console.log('li点击：' + data, event)
    }
    // 设置渲染列表
    setList = (list) => {
        let res = [];
        for (let i in list) {
            // 注意：必须在循环内 注入唯一的key 否则报错 （通过 diff 算法 对比key 更新渲染真实dom）
            res.push(
                    <li key={list[i].id} onClick={(event) => { this.handleClick(event, list[i]) }}>
                        {list[i].myText}
                        <button onClick={(event) => { this.deleList(event, list[i].id) }}>删除</button>
                    </li>
                    );
        }
        return res;
    }
    // 点击新增 列表
    addList = () => {
        // 尽量不用直接操作修改this.state.list状态值  使用 slice()截取或concat()也可以 只要是能深度拷贝都可以 ( 不传参时为复制一份数据给newList ) 深度拷贝（操作修改newList就无法影响状态值this.state.lis） 
        let data = this.state.list.slice();
        // 调用 this.GenNonDuplicateID() 生成唯一id
        data.push({ id: this.GenNonDuplicateID(), myText: this.myText.value })
        // 通过 setState 修改 this.state.list 状态  通知React 更新dom
        this.setState({
            list: data
        })
        // 新增完成 清空input
        this.myText.value = '';
        // console.log(data)
    }

    // 点击删除 列表指定数据
    deleList = (event, key) => {
        // 尽量不用直接操作修改this.state.list状态值  使用 slice()截取或concat()也可以 只要是能深度拷贝都可以 ( 不传参时为复制一份数据给newList ) 深度拷贝（操作修改newList就无法影响状态值this.state.lis） 
        // let data = this.state.list.slice();
        // 方式1：
        // 删除指定数据
        // for (let i in data) {
        //     if (data[i].id === key) {
        //         data.splice(i, 1);
        //     }
        // }
        // // 通过 setState 修改 this.state.list 状态  通知React 更新dom
        // this.setState({
        //     list: data
        // });
        // 方式2： filter函数 用于对数组进行过滤 并且 不会对空数组进行检测、不会改变原始数组 因此 可不用 如上方例子 深度拷贝 数据
        this.setState({
            list: this.state.list.filter((item, index) => { return (item.id !== key) })
        });
        console.log(this.state.list.filter((item, index) => { return (item.id !== key) }))

        //阻止事件冒泡
        event.preventDefault()
        event.stopPropagation()
    }
    // 利用时间戳 + Math.random()随机数 + toString转换36进制版本 substr去除随机数前两位 生成唯一id
    GenNonDuplicateID() {
        // 获取毫秒 时间戳
        let idStr = Date.now().toString(36);
        // 时间戳 + 随机数转36进制
        idStr += Math.random().toString(36).substr(2)
        return idStr
    }
}

