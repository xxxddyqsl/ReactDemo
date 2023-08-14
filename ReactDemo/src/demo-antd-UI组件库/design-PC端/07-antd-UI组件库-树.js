import React,{useState} from 'react'
import { Tree }  from "antd"
const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf-111',
                        key: '0-0-0-0',
                        // disableCheckbox: true,
                    },
                    {
                        title: 'leaf-222',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: ( <span style={{  color: '#1890ff',  }}  >  sss-111  </span> ),
                        key: '0-0-1-0',
                    },
                    {
                        title: ( <span style={{  color: 'red',  }}  >  sss-222  </span> ),
                        key: '0-0-1-1',
                    },
                ],
            },
        ],
    },
];
export default function Test() {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const onSelect = (selectedKeysValue, info) => {
        console.log('selected', selectedKeys, info);
        setSelectedKeys(selectedKeysValue);
    };

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    return (
        <div className='app-assembly'>
            <h1>07-antd-UI组件库-Tree树 组件</h1>
            <Tree
                checkable
                // defaultExpandedKeys - 默认展开指定的树节点 传入key 数组的形式
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                // defaultSelectedKeys -  默认选中的树节点 传入key 数组的形式
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                // defaultCheckedKeys	默认选中复选框的树节点 传入key 数组的形式
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                selectedKeys={selectedKeys}
                // onSelect 点击树节点触发
                onSelect={onSelect}
                // onCheck	点击复选框触发
                onCheck={onCheck}
                // treeData	treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
                treeData={treeData}
            />
        </div>
    )
}
