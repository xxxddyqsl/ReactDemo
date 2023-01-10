import React from 'react'

/*
为什么 使用 Hooks钩子
1、高阶级组件为了复用，导致代码层级复杂
2、生命周期的复杂
3、写成function组件 无状态，因为需要状态，又改成class类组件 成本高
*/


// 在 函数组件中使用 使用 State Hooks钩子 状态记录值  必须导入useState（函数组件的状态） 或者 React.useState()
/* const [state, setCount] = useState(initialState); 返回一个 state，以及更新 state 的函数。
在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。
setCount 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

注意：
  与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
  useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象
*/

/*
声明一个叫 "count" 的 state 变量 声明修改"count" 的 state 变量的方式 setCount() (注：类似class类组件中的setState方法区别在于 类组件中的setState是固定方法名 函数组件中可自定义（setCount() ）修改state 变量的方法名称  )   
useState内的参数0 为函数组件state状态值 （count的默认值） 修改 count 时 必须调用 自定义的 setCount 名函数
*/
export default function Test() {
  // setCount 为返回的回调函数 修改状态count 的唯一方法 
  const [count, setCount] = React.useState('hooks钩子')
  return (
    <div className='app-assembly'>
      <h1>01-hooks-useState</h1>
      <div>{count}</div>
      <button onClick={() => setCount('通过hooks钩子函数useState设置函数组件状态')}>函数组件修改状态</button>
      <br />
      <br />
      <Todolist></Todolist>
    </div>
  )
}
// 改造-todolist案例循环渲染
function Todolist() {
  const [text, setText] = React.useState('');
  const [list, setList] = React.useState([]);

  const handleChange = (even) => {
    setText(even.target.value)
  }
  const onAdd = () => {
    // console.log(text)
    //方式1：es6 数组合并 添加到 list 数组
    setList([...list, text]);
    // 方式2：深度拷贝 展开list数组 赋值给newList 与 类函数 一样 不要直接操作 状态
    // let newList=[...list];
    // newList.push(text);
    // setList(newList);
    // 添加完成 清空 input 框
    setText('')
  }
  // 删除
  const handDel = (Kindex) => {
    // console.log(Kindex)
    // 方式1： 通过filter    filter函数 用于对数组进行过滤 并且 不会对空数组进行检测、不会改变原始数组 因此 可不用 如下方例子 深度拷贝 数据
    setList(list.filter((item, index) => { return index !== Kindex }));

    // 方式2：深度拷贝 展开list数组 赋值给newList 与 类函数 一样 不要直接操作 状态 注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
    // let newList=[...list];
    // newList.splice(Kindex,1);
    // setList(newList);
  }
  return (
    <div>
      <h3>改造-todolist案例循环渲染</h3>
      <input value={text} onChange={handleChange} />
      <button onClick={() => {
        onAdd()
      }}>点击增加</button>
      {
        list.map((item, index) => {
          return (
            <div key={index}>
              {item}
              <button onClick={() => handDel(index)}>删除</button>
            </div>
          )
        })
      }
      { list.length <= 0 && <div>暂无列表数据</div> }
    </div>
  )

}