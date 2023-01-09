import React from 'react'
import { DownOutlined, SmileOutlined, } from '@ant-design/icons';
// antd-UI组件库  下拉菜单 ( Dropdown, Space)
import { Dropdown, Space } from 'antd';
// 最简单的下拉菜单列表。
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        // 是否 禁用
        disabled: true,
    },
    {
        key: '3',
        label: (
            <div target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item (disabled)
            </div>
        ),
        // disabled: true,
    },
    {
        key: '4',
        danger: true,
        label: 'a danger item',
    },
];
export default function Test() {
      // 下拉框 绑定点击事件
      const handleMenuClick = (e) => {
        console.log(e)
        if (e.key === '3') {
           
        }
      };
    return (
        <div className='app-assembly'>
            <h1>04-antd-UI组件库-Dropdown下拉框组件</h1>


            {/* antd-Dropdown 下拉菜单 组件  点击触发下拉框 默认为 hover 触发  下拉框 每一项传入onClick绑定点击事件*/}
            <Dropdown menu={{ items, onClick: handleMenuClick, }} trigger={['click']}>
                {/* 可写a标签 也可写div标签 */}
                <div style={{ color: 'red' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        Hover me
                        {/* DownOutlined 下拉菜单 icon 图标 */}
                        <DownOutlined />
                    </Space>
                </div>
            </Dropdown>
        </div>
    )
}
