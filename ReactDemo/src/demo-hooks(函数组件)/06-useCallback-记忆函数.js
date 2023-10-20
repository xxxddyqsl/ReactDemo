import React,{useState,useCallback, useMemo} from 'react'
/*
    useCallback-记忆函数-优化性能 （意义在于 与useCallback函数 注入的依赖没有关系的其他状态发生改变 重新渲染时 会使用缓存 而不是再一次重新加载创建函数 ）

    防止因为组件重新渲染，导致方法被重新创建，起到缓存的作用，只有第二个参数变化了，才重新声明一次

    // useCallback 第一个参数 要执行的回调函数 ，第二个参数 重新声明的依赖 数组形式
    const handleChange =useCallback(() => {
      console.log(name)
    },[name])
    useCallback 第二个参数  
    如果传入依赖 如果依赖发生改变时 会重新获取 值 并且将函数重新缓存 
    没有传入 依赖 是空数组 [] 那useCallback 函数永远是拿到一开始缓存的值 而缓存的值如果是空字符串 如：
    const [text,setText] = useState('')
    const [textB,setTextB] = useState('')

    const handleclick= useCallback(() => {
      console.log(text)
      setText( '测试text值')
    },[])
     const handleadd =useCallback(() => {
      console.log(text)
      setTextB('获取text 缓存的值:'+text)
     textB= '获取text 缓存的值:'+'' (空的text) 没有传入 依赖 是空数组 [] 那useCallback 函数永远是拿到一开始缓存的值 因为 text 永远是拿到一开始缓存的值 空字符串
    },[])
setTextB  


    只有 name 改变后，这个函数才会重新声明一次
    如果传入空数组，那么就是第一次创建就被缓存，如果name后期改变了，拿到的还是老的name ，永远不会被重新声明 拿到新的name
    如果不传第二个参数，每次都会重新声明一次，拿到的就是最新的name
*/

export default function Test() {
    // useState 记忆函数 可以记住状态
    const [count,setCount]=useState(0);
    return (
        <div className='app-assembly'>
            <h1>06-hooks-useCallback-记忆函数（缓存函数）- 优化性能</h1>
            <h1> useCallback-记忆函数-优化性能 （意义在于 与useCallback函数 注入的依赖没有关系的其他状态发生改变 重新渲染时 会使用缓存 而不是再一次重新加载创建函数 ）只有依赖发生改变，才重新加载创建函数</h1>
            <div>{count}</div>
            <button onClick={()=>{setCount(count+1)}}>add</button>
            <Todolist></Todolist>
        </div>
    )
}
// 改造-todolist案例循环渲染
function Todolist() {
    const [text, setText] = React.useState('');
    const [list, setList] = React.useState([]);

    /*
    当上方的 setCount(count+1) 执行后 count状态改变 触发父组件Test更新 ，父组件更新引发子组件Todolist()更新，子组件内部的普通方法（如 const a=()=>{} ）会被重新声明,
    都是此时 通过useCallback-记忆函数 ( 如：const onAdd = useCallback(() => {},[text]) ) 注入了依赖 状态 [text] 所以此时 onAdd 方法并不会被重新声明，
    只有在 依赖（[text]状态）发生改变后，这个函数（onAdd）才会重新声明一次 取最新的 text 状态

    */
    const onAdd = useCallback(() => {
      // console.log(text)
      //方式1：es6 数组合并 添加到 list 数组
      setList([...list, text]);
      // 方式2：深度拷贝 展开list数组 赋值给newList 与 类函数 一样 不要直接操作 状态 注意：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝
      // let newList=[...list];
      // newList.push(text);
      // setList(newList);
      // 添加完成 清空 input 框
      setText('')
    },[text])
    // 删除
    const handDel = useCallback((Kindex) => {
      // console.log(Kindex)
      // 方式1： 通过filter    filter函数 用于对数组进行过滤 并且 不会对空数组进行检测、不会改变原始数组 因此 可不用 如下方例子 深度拷贝 数据
      setList(list.filter((item, index) => { return index !== Kindex }));
  
      // 方式2：深度拷贝 展开list数组 赋值给newList 与 类函数 一样 不要直接操作 状态
      // let newList=[...list];
      // newList.splice(Kindex,1);
      // setList(newList);
    },[list])
    const handleChange = useCallback((even) => {
        setText(even.target.value)
      },[])
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