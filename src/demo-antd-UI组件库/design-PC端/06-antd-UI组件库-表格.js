import React from 'react'
import { Space, Table, Tag } from "antd"
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];
const columns = [
    {
        title: '姓名',
        // dataIndex：name 对应了 数据dataSource中的对应属性name 显示在当前列的内容
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];
export default function Test() {
    return (
        <div className='app-assembly'>
            <h1>06-antd-UI组件库-Table表格组件</h1>
            {/* dataSource 数据源  columns 头部列 */}
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
}
