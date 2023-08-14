import React, { useState, useRef, useEffect } from 'react'
import { Cascader } from 'antd'

const data = [{
  value: '上海',
  label: '上海',
  checked: true,
  root:true,
  children: [
    { value: '普陀', label: '普陀' },
    { value: '黄埔', label: '黄埔' },
    { value: '徐汇', label: '徐汇' }
  ]
}, {
  value: '江苏',
  label: '江苏',
  checked: true,
  root:true,
  children: [
    { value: '南京', label: '南京' },
    { value: '苏州', label: '苏州' },
    { value: '无锡', label: '无锡' }
  ]
}, {
  value: '浙江',
  label: '浙江',
  checked: true,
  root:true,
  children: [
    { value: '杭州', label: '杭州' },
    { value: '宁波', label: '宁波' },
    { value: '嘉兴', label: '嘉兴' }
  ]
}];
const { SHOW_CHILD } = Cascader;
export default function Test() {

  const [text, setText] = useState();
  const catalogue = useRef();
  const [checkedList, setCheckedList] = useState();
  const [options, setOptions] = useState(data)
  const onChange = (v, select) => {
    let newOptions = JSON.parse(JSON.stringify(options))
    v.map((label, i) => {
      const option = select[i];
      console.log(label, option)
      // if (i === label.length - 1) {
        newOptions.map((item, index) => {
          if (item.value == label[label.length - 1]) {
            // item.disableCheckbox = false;
            // 当前自己节点 选中
            item.checked = true;
            if (item.children) {
              for (let k in item.children) {
                // item.children[k].disableCheckbox = false;
                // 子节点 不选中
                item.children[k].checked = false;
              }
            }
          } else {
            let is = true;
            if (item.children) {
              for (let k in item.children) {
                if (item.children[k].value == label[label.length - 1]) {
                  // item.children[k].disableCheckbox = false;
                  // 当前自己节点 选中
                  item.children[k].checked = true;
                  is = false;
                } else {
                  // 兄弟节点 不选中
                  // item.children[k].disableCheckbox = true;
                  item.children[k].checked = false;
                }
              }
            }
            if (is) {
              // 父-兄弟节点 不选中
              item.checked = false;
            } else {
              // 父节点 选中
              item.checked = true;
            }
          }
        })
      // }

    })
    setOptions(newOptions)
    console.log('onChange===>', v, select, data, catalogue)
  }
  useEffect(() => {
    let newOptions = JSON.parse(JSON.stringify(options))
    let defaultVals = checkedList?JSON.parse(JSON.stringify(checkedList)):[['上海',''], ['浙江','',],['江苏','']];
    onRecursion(newOptions,defaultVals);
    console.log('useEffect===>',newOptions, defaultVals)
     setCheckedList(defaultVals)

     
  }, [options])
  const onRecursion = (data, arr,msg) => {
    console.log(data, arr,msg)
    data?.map((item) => {
      if(item.root){
        for(let i in arr){
          if(arr[i][0]==item.label){
            msg = arr[i];
          }
        }
      }
      if (item.checked) {
        if(msg[0] !== item.label){
          msg[1]=item.label;
        }else{
          msg[1]='';
        }
         
      }
      if (item.children) {
        onRecursion(item.children, arr,msg);
      }
    })
    return arr;
  }
  const handleAreaClick = (e, label, option) => {
    e.stopPropagation();
    console.log('clicked', label, option);
  };
  const displayRender = (label, selectedOptions) => { 
    // let newOptions = JSON.parse(JSON.stringify(options))
    // // v.map((label, i) => {
    // //   const option = select[i];
    // //   console.log(label, option)
    //   // if (i === label.length - 1) {
    //     newOptions.map((item, index) => {
    //       if (item.value == label[label.length - 1]) {
    //         // item.disableCheckbox = false;
    //         // 当前自己节点 选中
    //         item.checked = true;
    //         if (item.children) {
    //           for (let k in item.children) {
    //             // item.children[k].disableCheckbox = false;
    //             // 子节点 不选中
    //             item.children[k].checked = false;
    //           }
    //         }
    //       } else {
    //         let is = true;
    //         if (item.children) {
    //           for (let k in item.children) {
    //             if (item.children[k].value == label[label.length - 1]) {
    //               // item.children[k].disableCheckbox = false;
    //               // 当前自己节点 选中
    //               item.children[k].checked = true;
    //               is = false;
    //             } else {
    //               // 兄弟节点 不选中
    //               // item.children[k].disableCheckbox = true;
    //               item.children[k].checked = false;
    //             }
    //           }
    //         }
    //         if (is) {
    //           // 父-兄弟节点 不选中
    //           item.checked = false;
    //         } else {
    //           // 父节点 选中
    //           item.checked = true;
    //         }
    //       }
    //     })
      // }

    // })
    // setOptions(newOptions);
    // let newOptions = JSON.parse(JSON.stringify(options))
    // let defaultVals = [['上海',''], ['浙江','',],['江苏','']];
    // onRecursion(newOptions,defaultVals);
    console.log('displayRender===>',label,checkedList)
    //  setCheckedList(defaultVals)
    return [['上海',''], ['浙江','',],['江苏','']]
  }

  const isCeke = (item, arr) => {
    let is = false;
    for (let i in item) {

      if (item[i].label == arr.label) {
        item[i].disableCheckbox = false;
        is = false;
        let kitem = item[i]
        for (let k in kitem) {
          if (kitem[k].label != arr.label) {
            // kitem[k].disabled=true;
            kitem[k].disableCheckbox = true;
          } else {
            item[i].disableCheckbox = false;
          }
        }
      } else {
        is = true;
        // item[i].disabled=true;
        item[i].disableCheckbox = true;
      }

    }

    console.log(options)
  }
  return (
    <div className='app-assembly'>
      <h1>09-antd-UI组件库-级联选择js 组件 =  {text}</h1>
 
      <Cascader
        // defaultValue={checkedList}
        key={checkedList}
        style={{ width: '100%' }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
        // displayRender={displayRender}
        defaultValue={checkedList}
      />
    </div>
  )
}
