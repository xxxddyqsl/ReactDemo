import React from 'react'
/*
    react 修改状态时 不可以直接操作修改状态 需要深度拷贝 在不影响原状态的基础上修改通过深度拷贝新的对象 更新状态

    immutable 深度复制的库 - 安装介绍
    安装： npm install --save immutable

    介绍：每次修改一个 immutable 对象时都会创建一个新的不可变的对象，在新对象上操作并不会影响到原对象的数据。

    原理：immutable 实现的原理是 Persistent data structure (持久化的数据结构)，也就是使用旧数据创建新数据时，
    要保证旧数据的同时可用且不变，同时为了避免 deep copy (拷贝)把所有节点都复制一遍的性能损耗，immutable
    使用了 structural sharing(结构共享),即如果对象树中一个节点发送变化，只修改这个节点和受它影响的父节点，
    其他节点则进行共享


    浅拷贝 ：只复制某个object的引用值，不会改变heap内存的实例。浅拷贝之后各个值的引用地址指向同一个堆内存，所以只要改变一个实例另外一个对象也会跟着改变。

    深拷贝 ：复制并创建一个一摸一样的对象（既有栈内存中的引用值又有堆内存中的对象实例），而且不共享对象，对新的对象进行操作不会改变之前的对象
*/
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>01-immutable-安装介绍</h1>
        </div>
    )
}

// 引用复制 （浅拷贝）
var obj = {
    name: '测试'
};
var obj2 = obj;
obj2.name = '测试修改';
// 值 相同 只是引用浅拷贝 修改的属性引用地址都指向同一个堆内存 所以只要改变一个实例另外一个对象也会跟着改变
// console.log(obj,obj2);

/*
    ES6扩展运算符实现-深拷贝
    缺陷：1：只有一级属性为简单类型的值如-字符串等为深拷贝 （此处arr属性为数组-复杂类型的值 此时则为浅拷贝）
        2：只有一级属性为深拷贝，二级属性复杂的对象后就是浅拷贝如下
*/
var myobj = {
    name: '测试',
    age: {
        num: 18
    },
    arr: [1, 2, 3]
};

var myobj2 = { ...myobj };
myobj2.age.num = '测试修改';
// 只有一级属性为简单类型的值如-字符串等（此处为数组-复杂类型的值 则为浅拷贝） 深拷贝
myobj2.arr.splice(1, 1)
// console.log(myobj,myobj2);

/*
    JSON.parse JSON.stringify - 深度拷贝 只对number/string/boolean/array/object/扁平化对象等能够被JSON数据直接表示的数据类型适用
    缺陷：1.如果值是 undefined 如下 age 会丢失
          2.对于function 等类型数据该深拷贝方法不适用,会丢失不能表示的数据 如下 add的值是函数 add 会丢失
*/
var jsonobj = {
    name: '测试',
    age: undefined,
    arr: [1, 2, 3],
    add: function (num) { return num++; }
};
var jsonobj2 = JSON.parse(JSON.stringify(jsonobj))
// console.log(jsonobj, jsonobj2);

/*
    通过递归方法实现-深拷贝 一层一层复制
    缺陷：性能不会，占用内存
*/
function deepCopyObj(obj) {
    if (typeof (obj) !== "object" || obj === null)
        return obj;

    if (obj instanceof (Array)) {
        var newArr = [];
        for (var i = 0; i < obj.length; i++) {
            if (typeof (obj[i]) === "object" && obj[i] !== null) {
                newArr[i] = window.Array.prototype.slice.call(obj[i]);
            } else {
                newArr[i] = obj[i]
            }
        }
    } else {
        var newArr = []
        for (i in obj) {
            if (typeof (obj[i]) === "object" && obj[i] !== null) {
                newArr[i] = obj[i]
            } else {
                newArr[i] = obj[i]
            }
        }
        return newArr;
    }
}