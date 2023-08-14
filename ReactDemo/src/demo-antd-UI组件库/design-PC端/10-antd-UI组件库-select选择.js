import React, { useMemo, useState } from 'react'
import { Select } from 'antd'
import CheckboxOptions from './11-antd-UI组件库-Checkbox'
const data = [{
    value: '上海',
    label: '上海',
    checked: false,
    children: [
      { value:  '普陀', label: '普陀' },
      { value:  '黄埔' , label: '黄埔' },
      { value: '徐汇', label: '徐汇' }
    ]
  }, {
    value: '江苏',
    label: '江苏',
    checked: true,
    children: [
      { value: '南京', label: '南京' },
      { value: '苏州', label: '苏州' },
      { value: '无锡', label: '无锡' }
    ]
  }, {
    value: '浙江',
    label: '浙江',
    checked: true,
    children: [
      { value: '杭州', label: '杭州' },
      { value: '宁波', label: '宁波' },
      { value:  '嘉兴', label: '嘉兴' }
    ]
  }];
export default function Test() {
    const [options,setOptions]=useState(data)
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const getCinemaList = (data) => {
        // 拷贝 状态 ，禁止直接操作状态
        let newOptions = JSON.parse(JSON.stringify(options))
        data?.map(item=>{
            for(let i in newOptions){
                if(newOptions[i].label==item){
                    newOptions[i].checked= !newOptions[i].checked
                }
            }
        });
        console.log(newOptions)
        return newOptions
    }
    return (
        <div className='app-assembly'>
            <Select
                mode
                style={{width:'200px'}}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                dropdownRender={(menu) => (
                    <div className='customer-select-wrapper'
                    //   onMouseDown={(e) => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    //   }}
                    >
                      <CheckboxOptions options={options} callback={(data)=>{
                        if(data)
                        setOptions(getCinemaList(data))
                        
                      }}></CheckboxOptions>
                    </div>)}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                 
            />
        </div>
    )
}


