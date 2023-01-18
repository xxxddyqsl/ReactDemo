/*
    基础语法-数组



*/
// 写法1:
var list1:string[] =['1','2','3','4','5','6','7','8','9'];
// list1 定义了变量数组的类型 只能 push 字符串
list1.push('cc');
// list2 定义了变量数组的类型 只能 push 数字
var list2:number[] =[1,2,3];
list2.push(4)
// list3 定义了变量数组的多个类型 可 push 字符串或数字
var list3:(number|string)[] =[1,2,3,'4','bb'];
list3.push(5);list3.push('aa');
// list4 定义了变量数组为any类型 可 push 字符串或数字 或者 布尔值 对象等
var list4:any[] =[1,2,3,'4','bb',{'id':''},true];
list4.push(5);list4.push('aa');


// 写法2 - 泛型（Generics） 写法如 Array<number|string> :
var mylist1:Array<any> =[1,2,3,'4','bb',{'id':''},true];
mylist1.push(5);mylist1.push('aa');
// 
var mylist2:Array<string|number> =[1,2,3,'4','bb'];
mylist2.push(5);mylist2.push('aa');

export default function App() {
    return (
        <div className='app-assembly'>
            <h1>03-Ts基础语法-数组+泛型（Generics）写法</h1>
        </div>
    )
}